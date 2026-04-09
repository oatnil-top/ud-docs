---
sidebar_position: 4
---

# Kubernetes with Helm

Deploy UnDercontrol on Kubernetes using Helm charts. Supports single-node homelab setups with SQLite all the way to production clusters with PostgreSQL.

## Stack Overview

- **Backend**: Go API server (Deployment + PVC)
- **Frontend**: Vite SPA served by nginx (Deployment)
- **Database**: SQLite (default) or PostgreSQL (external)
- **Storage**: PersistentVolumeClaim for data + file uploads
- **Exposure**: ClusterIP, NodePort, or Ingress

## Prerequisites

- Kubernetes cluster (1.19+)
- Helm 3 installed
- `kubectl` configured and connected to your cluster
- A StorageClass for persistent volumes (e.g., `local-path` for k3s)

```bash
# Verify
kubectl version --client
helm version
```

## Quick Start

### Option 1: From Helm Repository

```bash
helm repo add undercontrol https://oatnil-top.github.io/undercontrol-helm
helm repo update

helm install undercontrol undercontrol/undercontrol \
  --create-namespace --namespace undercontrol \
  --set backend.jwt.secret=my-secret-key \
  --set backend.licenseToken=my-license-token
```

### Option 2: From OCI Registry

```bash
helm install undercontrol oci://ghcr.io/oatnil-top/undercontrol \
  --create-namespace --namespace undercontrol \
  --set backend.jwt.secret=my-secret-key \
  --set backend.licenseToken=my-license-token
```

This deploys both backend and frontend with SQLite, ClusterIP services, and a 5Gi PVC.

## Configuration

All configuration is done through Helm values. You can pass individual `--set` flags or provide a `values.yaml` file:

```bash
helm install undercontrol undercontrol/undercontrol \
  --create-namespace --namespace undercontrol \
  -f my-values.yaml
```

### Image Configuration

```yaml
backend:
  image:
    repository: lintao0o0/undercontrol-backend
    tag: "0.1.0"       # defaults to Chart appVersion
    pullPolicy: IfNotPresent

frontend:
  image:
    repository: lintao0o0/undercontrol-vite-app
    tag: "0.1.0"
    pullPolicy: IfNotPresent

# If using a private registry
imagePullSecrets:
  - name: my-registry-secret
```

### Database

#### SQLite (Default)

No extra configuration needed. Data is stored on the backend PVC.

```yaml
backend:
  database:
    type: sqlite
```

#### PostgreSQL

Point to an existing PostgreSQL instance:

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

The password is stored in a Kubernetes Secret automatically. To use an existing Secret instead:

```yaml
backend:
  existingSecret: my-undercontrol-secrets
```

The Secret should contain these keys: `jwt-secret`, `postgres-password`, `license-token`, and optionally `s3-access-key-id`, `s3-secret-access-key`.

### Service Exposure

#### ClusterIP (Default)

Services are only accessible within the cluster. Use with Ingress or `kubectl port-forward`:

```bash
kubectl port-forward -n undercontrol svc/undercontrol-frontend 8080:80
kubectl port-forward -n undercontrol svc/undercontrol-backend 8081:8080
```

#### NodePort

Access services directly on node IPs:

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

Then access at `http://<node-ip>:30800` (frontend) and `http://<node-ip>:30880` (backend API).

#### Ingress

Route traffic through an Ingress controller with host-based routing:

```yaml
ingress:
  enabled: true
  className: nginx  # or traefik, etc.
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

### Persistent Storage

The backend PVC stores the SQLite database and uploaded files:

```yaml
backend:
  persistence:
    enabled: true
    size: 5Gi
    storageClass: local-path  # Use your cluster's StorageClass
    accessMode: ReadWriteOnce
```

Set `persistence.enabled: false` if you're using PostgreSQL and S3 (no local storage needed).

### S3 / R2 Object Storage

Offload file uploads to S3-compatible storage:

```yaml
backend:
  s3:
    enabled: true
    endpoint: https://your-s3-endpoint.com
    region: auto
    bucket: undercontrol-uploads
    accessKeyId: your-access-key
    secretAccessKey: your-secret-key
    forcePathStyle: true  # Required for MinIO / Cloudflare R2
```

### Resources

Default resource limits:

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

### Full Values Reference

| Parameter | Description | Default |
|-----------|-------------|---------|
| `backend.enabled` | Deploy backend component | `true` |
| `backend.replicaCount` | Backend replicas | `1` |
| `backend.image.repository` | Backend image | `lintao0o0/undercontrol-backend` |
| `backend.image.tag` | Backend image tag | Chart `appVersion` |
| `backend.service.type` | Backend service type | `ClusterIP` |
| `backend.service.port` | Backend service port | `8080` |
| `backend.service.nodePort` | Backend NodePort (when type=NodePort) | - |
| `backend.environment` | `production` or `development` | `production` |
| `backend.jwt.secret` | JWT signing secret | `""` |
| `backend.jwt.expirationMinutes` | JWT token TTL | `60` |
| `backend.database.type` | `sqlite` or `postgres` | `sqlite` |
| `backend.database.postgres.*` | PostgreSQL connection settings | - |
| `backend.s3.enabled` | Enable S3 storage | `false` |
| `backend.s3.*` | S3 connection settings | - |
| `backend.dataPath` | Data directory in container | `/data` |
| `backend.persistence.enabled` | Create PVC for data | `true` |
| `backend.persistence.size` | PVC size | `5Gi` |
| `backend.persistence.storageClass` | StorageClass name | `""` (default) |
| `backend.corsAllowedOrigins` | CORS origins | `""` |
| `backend.licenseToken` | License token | `""` |
| `backend.existingSecret` | Use external Secret | `""` |
| `backend.extraEnv` | Additional env vars | `[]` |
| `frontend.enabled` | Deploy frontend component | `true` |
| `frontend.replicaCount` | Frontend replicas | `1` |
| `frontend.image.repository` | Frontend image | `lintao0o0/undercontrol-vite-app` |
| `frontend.image.tag` | Frontend image tag | Chart `appVersion` |
| `frontend.service.type` | Frontend service type | `ClusterIP` |
| `frontend.service.port` | Frontend service port | `80` |
| `frontend.service.nodePort` | Frontend NodePort | - |
| `frontend.extraEnv` | Additional env vars | `[]` |
| `ingress.enabled` | Enable Ingress | `false` |
| `ingress.className` | Ingress class | `""` |
| `ingress.hosts` | Ingress host rules | `[]` |
| `ingress.tls` | Ingress TLS config | `[]` |

## Example Deployments

### Minimal (SQLite + NodePort)

Best for trying out UnDercontrol on a single node or homelab:

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

### Production (PostgreSQL + Ingress + S3)

```yaml
# values-production.yaml
backend:
  replicaCount: 2
  existingSecret: undercontrol-secrets  # Pre-create with jwt-secret, postgres-password, etc.
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
    enabled: false  # Not needed with PostgreSQL + S3
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
# Create the secret first
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

## Upgrading

```bash
helm repo update
helm upgrade undercontrol undercontrol/undercontrol \
  --namespace undercontrol \
  -f my-values.yaml
```

To update just the image version:

```bash
helm upgrade undercontrol undercontrol/undercontrol \
  --namespace undercontrol \
  --reuse-values \
  --set backend.image.tag=0.59.0 \
  --set frontend.image.tag=0.59.0
```

## Uninstalling

```bash
helm uninstall undercontrol --namespace undercontrol
```

Note: PersistentVolumeClaims are **not** deleted automatically. To remove data:

```bash
kubectl delete pvc -n undercontrol -l app.kubernetes.io/instance=undercontrol
kubectl delete namespace undercontrol
```

## Troubleshooting

### Check pod status

```bash
kubectl get pods -n undercontrol
kubectl describe pod -n undercontrol <pod-name>
kubectl logs -n undercontrol <pod-name>
```

### Backend won't start

- Verify the license token is set (`LICENSE_TOKEN` env var)
- Check database connectivity if using PostgreSQL
- Review logs: `kubectl logs -n undercontrol -l app.kubernetes.io/component=backend`

### Frontend can't reach backend

- Ensure both services are running: `kubectl get svc -n undercontrol`
- If using Ingress, verify the `/api` path routes to the backend service
- If using NodePort, ensure CORS is configured: `backend.corsAllowedOrigins`

## Source Code

- Helm chart: [github.com/oatnil-top/undercontrol-helm](https://github.com/oatnil-top/undercontrol-helm)
- Report issues: [github.com/oatnil-top/undercontrol-helm/issues](https://github.com/oatnil-top/undercontrol-helm/issues)
