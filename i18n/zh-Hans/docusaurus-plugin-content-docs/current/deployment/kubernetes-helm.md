---
sidebar_position: 4
---

# Kubernetes Helm 部署

使用 Helm Chart 在 Kubernetes 上部署 UnDercontrol。支持从单节点 SQLite 到生产级 PostgreSQL 集群的各种场景。

**Helm Chart 仓库**：[github.com/oatnil-top/undercontrol-helm](https://github.com/oatnil-top/undercontrol-helm)

## 技术栈

- **后端**：Go API 服务（Deployment + PVC）
- **前端**：Vite SPA + nginx（Deployment）
- **数据库**：SQLite（默认）或 PostgreSQL（外部）
- **存储**：PersistentVolumeClaim 持久化数据和上传文件
- **暴露方式**：ClusterIP、NodePort 或 Ingress

## 前置条件

- Kubernetes 集群（1.19+）
- Helm 3
- `kubectl` 已连接集群
- StorageClass（如 k3s 的 `local-path`）

```bash
kubectl version --client
helm version
```

## 快速开始

### 方式一：Helm 仓库

```bash
helm repo add undercontrol https://oatnil-top.github.io/undercontrol-helm
helm repo update

helm install undercontrol undercontrol/undercontrol \
  --create-namespace --namespace undercontrol \
  --set backend.jwt.secret=my-secret-key \
  --set backend.licenseToken=my-license-token
```

### 方式二：OCI Registry

```bash
helm install undercontrol oci://ghcr.io/oatnil-top/undercontrol \
  --create-namespace --namespace undercontrol \
  --set backend.jwt.secret=my-secret-key \
  --set backend.licenseToken=my-license-token
```

默认部署 backend + frontend，使用 SQLite、ClusterIP 服务和 5Gi PVC。

## 配置

通过 Helm values 进行配置，可以使用 `--set` 参数或 `values.yaml` 文件：

```bash
helm install undercontrol undercontrol/undercontrol \
  --create-namespace --namespace undercontrol \
  -f my-values.yaml
```

### 镜像配置

```yaml
backend:
  image:
    repository: lintao0o0/undercontrol-backend
    tag: "0.65.2"       # 默认使用 Chart appVersion
    pullPolicy: IfNotPresent

frontend:
  image:
    repository: lintao0o0/undercontrol-vite-app
    tag: "0.65.2"
    pullPolicy: IfNotPresent

# 私有镜像仓库
imagePullSecrets:
  - name: my-registry-secret
```

### 数据库

#### SQLite（默认）

无需额外配置，数据存储在 backend PVC 中。

```yaml
backend:
  database:
    type: sqlite
```

#### PostgreSQL

指向已有的 PostgreSQL 实例：

```yaml
backend:
  database:
    type: postgres
    postgres:
      host: my-postgres-host
      port: 5432
      user: postgres
      password: my-password
      database: undercontrol
      sslMode: disable
```

密码自动存储在 Kubernetes Secret 中。也可以使用已有的 Secret：

```yaml
backend:
  existingSecret: my-undercontrol-secrets
```

Secret 需要包含以下 key：`jwt-secret`、`postgres-password`、`license-token`，可选 `s3-access-key-id`、`s3-secret-access-key`。

### 服务暴露

#### ClusterIP（默认）

服务仅在集群内可访问，配合 Ingress 或 `kubectl port-forward` 使用：

```bash
kubectl port-forward -n undercontrol svc/undercontrol-frontend 8080:80
kubectl port-forward -n undercontrol svc/undercontrol-backend 8081:8080
```

#### NodePort

通过节点 IP 直接访问：

```yaml
backend:
  service:
    type: NodePort
    nodePort: 30880

frontend:
  service:
    type: NodePort
    nodePort: 30800
```

访问 `http://<节点IP>:30800`（前端）和 `http://<节点IP>:30880`（后端 API）。

#### Ingress

通过 Ingress Controller 进行基于域名的路由：

```yaml
ingress:
  enabled: true
  className: nginx  # 或 traefik 等
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
  hosts:
    - host: ud.example.com
      paths:
        - path: /api
          pathType: Prefix
          service: backend
        - path: /
          pathType: Prefix
          service: frontend
  tls:
    - secretName: ud-tls
      hosts:
        - ud.example.com
```

### 持久化存储

Backend PVC 存储 SQLite 数据库和上传文件：

```yaml
backend:
  persistence:
    enabled: true
    size: 5Gi
    storageClass: local-path  # 使用集群的 StorageClass
    accessMode: ReadWriteOnce
```

如果使用 PostgreSQL + S3，可以关闭持久化：`persistence.enabled: false`。

### S3 / R2 对象存储

将文件上传卸载到 S3 兼容存储：

```yaml
backend:
  s3:
    enabled: true
    endpoint: https://your-s3-endpoint.com
    region: auto
    bucket: undercontrol-uploads
    accessKeyId: your-access-key
    secretAccessKey: your-secret-key
    forcePathStyle: true  # MinIO / Cloudflare R2 需要
```

### 资源限制

```yaml
backend:
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 500m
      memory: 512Mi

frontend:
  resources:
    requests:
      cpu: 50m
      memory: 64Mi
    limits:
      cpu: 200m
      memory: 256Mi
```

### 完整参数参考

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `backend.enabled` | 部署后端 | `true` |
| `backend.replicaCount` | 后端副本数 | `1` |
| `backend.image.repository` | 后端镜像 | `lintao0o0/undercontrol-backend` |
| `backend.image.tag` | 后端镜像标签 | Chart `appVersion` |
| `backend.service.type` | 后端服务类型 | `ClusterIP` |
| `backend.service.port` | 后端服务端口 | `8080` |
| `backend.service.nodePort` | 后端 NodePort | - |
| `backend.environment` | `production` 或 `development` | `production` |
| `backend.jwt.secret` | JWT 签名密钥 | `""` |
| `backend.jwt.expirationMinutes` | JWT 过期时间（分钟） | `60` |
| `backend.database.type` | `sqlite` 或 `postgres` | `sqlite` |
| `backend.database.postgres.*` | PostgreSQL 连接配置 | - |
| `backend.s3.enabled` | 启用 S3 存储 | `false` |
| `backend.s3.*` | S3 连接配置 | - |
| `backend.dataPath` | 容器内数据目录 | `/data` |
| `backend.persistence.enabled` | 创建 PVC | `true` |
| `backend.persistence.size` | PVC 大小 | `5Gi` |
| `backend.persistence.storageClass` | StorageClass | `""` |
| `backend.corsAllowedOrigins` | CORS 来源 | `""` |
| `backend.licenseToken` | 许可证令牌 | `""` |
| `backend.existingSecret` | 使用外部 Secret | `""` |
| `backend.extraEnv` | 额外环境变量 | `[]` |
| `frontend.enabled` | 部署前端 | `true` |
| `frontend.replicaCount` | 前端副本数 | `1` |
| `frontend.image.repository` | 前端镜像 | `lintao0o0/undercontrol-vite-app` |
| `frontend.image.tag` | 前端镜像标签 | Chart `appVersion` |
| `frontend.service.type` | 前端服务类型 | `ClusterIP` |
| `frontend.service.port` | 前端服务端口 | `80` |
| `frontend.service.nodePort` | 前端 NodePort | - |
| `frontend.extraEnv` | 额外环境变量 | `[]` |
| `ingress.enabled` | 启用 Ingress | `false` |
| `ingress.className` | Ingress 类名 | `""` |
| `ingress.hosts` | Ingress 主机规则 | `[]` |
| `ingress.tls` | Ingress TLS 配置 | `[]` |

## 部署示例

### 最小化部署（SQLite + NodePort）

适合在单节点或家庭实验室中试用：

```yaml
# values-minimal.yaml
backend:
  jwt:
    secret: change-me-in-production
  licenseToken: your-license-token
  service:
    type: NodePort
    nodePort: 30880
  persistence:
    storageClass: local-path

frontend:
  service:
    type: NodePort
    nodePort: 30800
```

```bash
helm install undercontrol undercontrol/undercontrol \
  --create-namespace --namespace undercontrol \
  -f values-minimal.yaml
```

### 生产部署（PostgreSQL + Ingress + S3）

```yaml
# values-production.yaml
backend:
  replicaCount: 2
  existingSecret: undercontrol-secrets
  database:
    type: postgres
    postgres:
      host: postgres.database.svc.cluster.local
      port: 5432
      user: undercontrol
      database: undercontrol
      sslMode: require
  s3:
    enabled: true
    endpoint: https://s3.amazonaws.com
    region: us-east-1
    bucket: undercontrol-uploads
  persistence:
    enabled: false
  resources:
    requests:
      cpu: 250m
      memory: 256Mi
    limits:
      cpu: "1"
      memory: 1Gi

frontend:
  replicaCount: 2

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
  hosts:
    - host: app.example.com
      paths:
        - path: /api
          pathType: Prefix
          service: backend
        - path: /
          pathType: Prefix
          service: frontend
  tls:
    - secretName: undercontrol-tls
      hosts:
        - app.example.com
```

```bash
# 先创建 Secret
kubectl create namespace undercontrol
kubectl create secret generic undercontrol-secrets \
  --namespace undercontrol \
  --from-literal=jwt-secret=your-jwt-secret \
  --from-literal=postgres-password=your-db-password \
  --from-literal=license-token=your-license \
  --from-literal=s3-access-key-id=your-key \
  --from-literal=s3-secret-access-key=your-secret

helm install undercontrol undercontrol/undercontrol \
  --namespace undercontrol \
  -f values-production.yaml
```

## 升级

```bash
helm repo update
helm upgrade undercontrol undercontrol/undercontrol \
  --namespace undercontrol \
  -f my-values.yaml
```

仅更新镜像版本：

```bash
helm upgrade undercontrol undercontrol/undercontrol \
  --namespace undercontrol \
  --reuse-values \
  --set backend.image.tag=0.59.0 \
  --set frontend.image.tag=0.59.0
```

## 卸载

```bash
helm uninstall undercontrol --namespace undercontrol
```

注意：PersistentVolumeClaim **不会**自动删除。如需删除数据：

```bash
kubectl delete pvc -n undercontrol -l app.kubernetes.io/instance=undercontrol
kubectl delete namespace undercontrol
```

## 故障排查

### 检查 Pod 状态

```bash
kubectl get pods -n undercontrol
kubectl describe pod -n undercontrol <pod-name>
kubectl logs -n undercontrol <pod-name>
```

### 后端无法启动

- 检查 license token 是否已设置
- 如使用 PostgreSQL，检查数据库连接
- 查看日志：`kubectl logs -n undercontrol -l app.kubernetes.io/component=backend`

### 前端无法连接后端

- 确认两个服务都在运行：`kubectl get svc -n undercontrol`
- 如使用 Ingress，检查 `/api` 路径是否指向后端
- 如使用 NodePort，确认 CORS 配置：`backend.corsAllowedOrigins`

## 源代码

- Helm Chart 仓库：[github.com/oatnil-top/undercontrol-helm](https://github.com/oatnil-top/undercontrol-helm)
- 问题反馈：[github.com/oatnil-top/undercontrol-helm/issues](https://github.com/oatnil-top/undercontrol-helm/issues)
