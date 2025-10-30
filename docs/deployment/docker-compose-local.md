---
sidebar_position: 1
---

# Docker Compose: Local Storage + SQLite

Simple deployment using Docker Compose with local filesystem storage and SQLite database. Perfect for getting started, development, and small production deployments.

## Stack Overview

This deployment includes:

- **Storage**: Local filesystem (Docker volume)
- **Database**: SQLite
- **Backend**: Go-based API server (with CORS enabled)
- **Frontend**: Next.js web application

## Prerequisites

Before you begin, ensure you have:

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher

Verify your Docker installation:

```bash
docker --version
docker compose version
```

## Installation Options

### Option 1: Automated Installation (Recommended)

Set up UnderControl with a single command. The installation script will automatically handle all configuration and setup.

**Quick Install:**

```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

The script will automatically:
- Check Docker and Docker Compose prerequisites
- Create deployment directory (`undercontrol-deployment`)
- Generate a secure JWT_SECRET automatically
- Create `.env` configuration file with early access license
- Create `docker-compose.yml` with both services
- Pull Docker images and start services

:::tip Alternative Installation
If you prefer to review the script before running it:
```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh -o install.sh
chmod +x install.sh
./install.sh
```
:::

### Option 2: Manual Installation

If you prefer to set up everything manually or need custom configuration, follow the steps below.

## Quick Start

### 1. Create Deployment Directory

```bash
mkdir undercontrol-deployment
cd undercontrol-deployment
```

After completing all setup steps, your directory structure should look like this:

```
undercontrol-deployment/
├── .env                    # Environment configuration (includes license)
└── docker-compose.yml      # Docker services definition
```

### 2. Create Configuration File

Create a `.env` file with the following content:

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
