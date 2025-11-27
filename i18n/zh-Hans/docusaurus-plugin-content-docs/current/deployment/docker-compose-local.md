---
sidebar_position: 1
# IMPORTANT: Keep docker-compose.yml content in sync with scripts/install.sh
# Any changes to the docker-compose configuration must be reflected in both files
---

# Docker Compose：本地存储 + SQLite

使用 Docker Compose、本地文件系统存储和 SQLite 数据库进行简单部署。非常适合入门、开发和小型生产部署。

## 技术栈概述

此部署包括：

- **存储**：本地文件系统（Docker 卷）
- **数据库**：SQLite
- **后端**：基于 Go 的 API 服务器（已启用 CORS）
- **前端**：Next.js Web 应用程序

## 前置条件

开始之前，请确保您拥有：

- **Docker**：版本 20.10 或更高
- **Docker Compose**：版本 2.0 或更高

验证您的 Docker 安装：

```bash
docker --version
docker compose version
```

## 安装选项

### 选项 1：自动化安装（推荐）

使用单个命令设置 UnderControl。安装脚本将自动处理所有配置和设置。

#### Linux / macOS / WSL

**快速安装：**

```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

:::tip 替代安装方式
如果您希望在运行之前查看脚本：
```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh -o install.sh
chmod +x install.sh
./install.sh
```
:::

#### Windows (PowerShell)

下载并运行安装脚本：

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1" -OutFile "install.ps1"
.\install.ps1
```

:::info PowerShell 执行策略
如果遇到执行策略错误，请以管理员身份运行 PowerShell 并执行：
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
:::

**安装脚本的功能：**

安装脚本将自动：
- 检查 Docker 和 Docker Compose 前置条件
- 创建部署目录（`undercontrol-deployment`）
- 自动生成安全的 JWT_SECRET
- 创建 `.env` 配置文件
- 创建包含两个服务的 `docker-compose.yml`
- 拉取 Docker 镜像并启动服务

### 选项 2：手动安装

如果您希望手动设置所有内容或需要自定义配置，请按照以下步骤操作。

## 快速开始

### 1. 创建部署目录

```bash
mkdir undercontrol-deployment
cd undercontrol-deployment
```

完成所有设置步骤后，您的目录结构应如下所示：

```
undercontrol-deployment/
├── .env                    # 环境配置
└── docker-compose.yml      # Docker 服务定义
```

### 2. 创建配置文件

创建一个 `.env` 文件，内容如下：

```bash
# JWT 身份验证（必需 - 请修改！）
JWT_SECRET=your-super-secret-jwt-key-change-this

# 管理员用户配置（可选 - 覆盖默认值）
# ADMIN_USERNAME=admin@oatnil.com
# ADMIN_PASSWORD=admin123

# 许可证（可选 - 仅用于 Pro/Max 版本）
# LICENSE=your-license-key-here

# 存储配置
S3_ENABLED="false"

# 监控（默认禁用）
OTEL_ENABLED="false"

# 可选：OpenAI 集成
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_API_KEY=your-openai-api-key
# OPENAI_MODEL=gpt-4o-mini

# CORS 配置（默认为 http://localhost:8080）
# CORS_ALLOWED_ORIGINS=http://localhost:8080
```

:::danger 安全警告
**您必须将 `JWT_SECRET` 更改为**一个随机、安全的值：

**Linux/macOS/WSL：**
```bash
openssl rand -base64 32
```

**Windows PowerShell：**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```
:::

:::info 免费个人版
UnderControl 提供**免费个人版** - 无需许可证！非常适合个人使用，支持 1 个用户和所有核心功能（SQLite 数据库、本地存储）。

需要团队功能、云存储或 PostgreSQL？升级到 [Pro 或 Max 版本](/docs/subscription-tiers)，并在 `.env` 文件中添加您的许可证密钥。
:::

### 3. 创建 docker-compose.yml

创建一个 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  backend:
    image: lintao0o0/undercontrol-backend:latest
    container_name: undercontrol-backend
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
    env_file:
      - .env
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    volumes:
      - undercontrol-data:/app/data

  frontend:
    image: lintao0o0/undercontrol-next-web:latest
    container_name: undercontrol-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8080
    env_file:
      - .env
    depends_on:
      - backend
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  undercontrol-data:
    driver: local
```

### 4. 启动服务

```bash
docker compose up -d
```

检查容器状态：

```bash
docker compose ps
```

您应该看到两个正在运行的容器：
- `undercontrol-backend`
- `undercontrol-frontend`

### 5. 访问应用程序

- **Web 应用程序**：http://localhost:3000
- **API 端点**：http://localhost:8080

## 配置参考

有关所有可用环境变量的完整列表，请参阅[后端配置参考](./backend-config.md)。

### 基本环境变量

| 变量 | 描述 | 默认值 |
|----------|-------------|---------|
| `JWT_SECRET` | JWT 令牌签名密钥（必需） | - |
| `LICENSE` | Pro/Max 版本许可证密钥（可选） | 无（个人版） |
| `ADMIN_USERNAME` | 管理员用户名（覆盖默认值） | `admin@oatnil.com` |
| `ADMIN_PASSWORD` | 管理员密码（覆盖默认值） | `admin123` |
| `UD_DATA_PATH` | 数据库和文件存储路径 | `/data` |
| `GIN_MODE` | 框架模式 | `release` |
| `CORS_ALLOWED_ORIGINS` | 允许的 CORS 来源 | `http://localhost:3000` |
| `S3_ENABLED` | 启用 S3 存储 | `false` |

### 默认管理员账户

首次启动时会自动创建一个管理员账户，凭据如下：

| 字段 | 值 |
|-------|-------|
| 用户名 | `admin@oatnil.com` |
| 密码 | `admin123` |

:::warning 安全提示
出于安全考虑，**首次登录后请立即更改默认密码**。您可以在首次启动之前通过在 `.env` 文件中设置 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 来覆盖这些默认值。
:::

## 故障排除

### 服务无法启动

检查容器状态和日志：

```bash
docker compose ps
docker compose logs
```

常见问题：
- 端口冲突（3000 或 8080 已被占用）
- `JWT_SECRET` 无效或缺失
- CORS 配置不匹配

### 无法访问应用程序

1. 验证容器是否正在运行：`docker compose ps`
2. 检查端口是否可访问：`curl http://localhost:8080/health`
3. 验证 `.env` 中的 CORS 设置是否与前端 URL 匹配
4. 检查浏览器控制台是否有 CORS 错误

### CORS 错误

如果您在浏览器控制台中看到 CORS 错误：

1. 验证 `.env` 中的 `CORS_ALLOWED_ORIGINS` 是否与前端 URL 匹配
2. 如果使用不同的端口，请更新环境变量
3. 更改 CORS 设置后重启后端：`docker compose restart backend`

### 数据库问题

访问后端容器以检查数据库：

```bash
docker compose exec backend sh
ls -lh /app/data/
exit
```

### 数据备份

将数据从 Docker 卷备份到本地机器：

```bash
# 创建数据目录的备份
docker cp undercontrol-backend:/app/data ./backup-data

# 或备份到指定路径
docker cp undercontrol-backend:/app/data /path/to/backup/location
```

从备份恢复数据到容器：

```bash
# 从备份恢复
docker cp ./backup-data/. undercontrol-backend:/app/data/
```

:::tip 自动备份
考虑设置 cron 作业或计划任务来自动定期备份数据：

```bash
# 示例：每天凌晨 2 点备份
0 2 * * * docker cp undercontrol-backend:/app/data ~/backups/undercontrol-$(date +\%Y\%m\%d)
```
:::

### 完全重置

:::danger 数据丢失警告
这将删除您的所有数据！
:::

```bash
docker compose down
docker volume rm undercontrol-data
docker compose up -d
```


## 下一步

- 创建您的第一个管理员账户
- 配置可选集成（OpenAI）
- 设置自动备份
- 探索[功能文档](/docs/intro)

## 何时升级

如果出现以下情况，请考虑升级到不同的部署方式：

- 需要更好的数据库性能 → [本地存储 + PostgreSQL](/docs/deployment/docker-compose-postgres)
- 需要云文件存储 → [S3/R2 + PostgreSQL](/docs/deployment/docker-compose-s3)
- 需要高可用性 → [Kubernetes with Helm](/docs/deployment/kubernetes-helm)
