---
sidebar_position: 1
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

**快速安装：**

```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

脚本将自动：
- 检查 Docker 和 Docker Compose 前置条件
- 创建部署目录（`undercontrol-deployment`）
- 自动生成安全的 JWT_SECRET
- 创建包含早期访问许可证的 `.env` 配置文件
- 创建包含两个服务的 `docker-compose.yml`
- 拉取 Docker 镜像并启动服务

:::tip 替代安装方式
如果您希望在运行之前查看脚本：
```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh -o install.sh
chmod +x install.sh
./install.sh
```
:::

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
├── .env                    # 环境配置（包括许可证）
└── docker-compose.yml      # Docker 服务定义
```

### 2. 创建配置文件

创建一个 `.env` 文件，内容如下：

```bash
# License (Early Access - valid until 2025-12-19)
LICENSE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6IjE1ODdlZDRiLTkyMzEtNDYwZi1iOWNkLWZlZmUyNGRmOGYwMiIsImN1c3RvbWVyX25hbWUiOiJFYXJseUFjY2VzcyIsImV4cGlyZXNfYXQiOiIyMDI1LTEyLTE5IiwiaXNzdWVkX2F0IjoiMjAyNS0xMC0zMCIsImxpY2Vuc2VfaWQiOiJkZDZjZGE4YS05ODgyLTQyZjYtODc3Yy1lMWY4ODZhYTQ4MDciLCJtYXhfdXNlcnMiOjEwMCwicHJvZHVjdCI6IlVuZGVyQ29udHJvbCIsInRpZXIiOiJlbnRlcnByaXNlIn0.y3-UQaKDZ7QuXxpX0nynUZ1V96WfHHqqiJOeKkzrzBY

# JWT Authentication (REQUIRED - Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Admin User Configuration (Optional - Override defaults)
# ADMIN_USERNAME=admin@oatnil.com
# ADMIN_PASSWORD=admin123

# Storage Configuration
S3_ENABLED="false"

# Monitoring (Disabled by default)
OTEL_ENABLED="false"

# Optional: OpenAI Integration
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_API_KEY=your-openai-api-key
# OPENAI_MODEL=gpt-4o-mini

# CORS Configuration (default to http://localhost:8080)
# CORS_ALLOWED_ORIGINS=http://localhost:8080
```

:::danger Security Warning
**You MUST change the `JWT_SECRET`** to a random, secure value:

```bash
openssl rand -base64 32
```
:::

:::info Early Access License
The license included above is an **Early Access** license valid until **December 19, 2025**, supporting up to **100 users**. This allows you to get started immediately without any barriers. For production use beyond this period, you can obtain an extended license.
:::

### 3. Create docker-compose.yml

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  # UnderControl Backend (Go API Server)
  server:
    image: lintao0o0/undercontrol-backend:latest
    container_name: undercontrol-backend
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8080:8080"
    volumes:
      - backend-data:/data
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M

  # Next.js Web Application
  web:
    image: lintao0o0/undercontrol-next-web:production-latest
    container_name: ud-web
    ports:
      - "3000:3000"
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M

volumes:
  backend-data:
    driver: local
```

### 4. Start the Services

```bash
docker compose up -d
```

Check container status:

```bash
docker compose ps
```

You should see two running containers:
- `undercontrol-backend`
- `ud-web`

### 5. Access the Application

- **Web Application**: http://localhost:3000
- **API Endpoint**: http://localhost:8080

## Configuration Reference

For a complete list of all available environment variables, see the [Environment Variables Reference](./environment-variables.md).

### Essential Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `LICENSE` | License token (included in early access) | Provided |
| `JWT_SECRET` | JWT token signing key (REQUIRED) | - |
| `ADMIN_USERNAME` | Admin username (override default) | `admin@oatnil.com` |
| `ADMIN_PASSWORD` | Admin password (override default) | `admin123` |
| `UD_DATA_PATH` | Database and file storage path | `/data` |
| `GIN_MODE` | Framework mode | `release` |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |
| `S3_ENABLED` | Enable S3 storage | `false` |

### Default Admin Account

An admin account is automatically created on first startup with these credentials:

| Field | Value |
|-------|-------|
| Username | `admin@oatnil.com` |
| Password | `admin123` |

:::warning Security Notice
**Change the default password immediately** after your first login for security. You can override these defaults by setting `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your `.env` file before the first startup.
:::

## Troubleshooting

### Services Not Starting

Check container status and logs:

```bash
docker compose ps
docker compose logs
```

Common issues:
- Port conflicts (3000 or 8080 already in use)
- Invalid or missing `JWT_SECRET`
- Missing or invalid `LICENSE` environment variable
- CORS configuration mismatch

### Cannot Access Application

1. Verify containers are running: `docker compose ps`
2. Check if ports are accessible: `curl http://localhost:8080/health`
3. Verify CORS settings in `.env` match your frontend URL
4. Check browser console for CORS errors

### CORS Errors

If you see CORS errors in the browser console:

1. Verify `CORS_ALLOWED_ORIGINS` in `.env` matches your frontend URL
2. If using a different port, update the environment variable
3. Restart the backend after changing CORS settings: `docker compose restart server`

### Database Issues

Access the backend container to inspect the database:

```bash
docker compose exec server sh
ls -lh /data/
exit
```

### Complete Reset

:::danger Data Loss Warning
This will delete all your data!
:::

```bash
docker compose down
docker volume rm undercontrol-deployment_backend-data
docker compose up -d
```


## Next Steps

- Create your first admin account
- Configure optional integrations (OpenAI)
- Set up automated backups
- Explore the [Features documentation](/docs/intro)

## When to Upgrade

Consider upgrading to a different deployment if:

- You need better database performance → [Local Storage + PostgreSQL](/docs/deployment/docker-compose-postgres)
- You need cloud file storage → [S3/R2 + PostgreSQL](/docs/deployment/docker-compose-s3)
- You need high availability → [Kubernetes with Helm](/docs/deployment/kubernetes-helm)
