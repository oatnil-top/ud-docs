---
sidebar_position: 1
# IMPORTANT: Keep docker-compose.yml content in sync with scripts/install.sh
# Any changes to the docker-compose configuration must be reflected in both files
---

# Docker Compose: Free Personal

Simple deployment using Docker Compose with local filesystem storage and SQLite database. Perfect for getting started, development, and small production deployments.

## Stack Overview

This deployment includes:

- **Storage**: Local filesystem (Docker volume)
- **Database**: SQLite
- **Backend**: Go-based API server (with CORS enabled)
- **Frontend**: Vite-based web application

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

#### Linux / macOS / WSL

**Quick Install:**

```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

:::tip Alternative Installation
If you prefer to review the script before running it:
```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh -o install.sh
chmod +x install.sh
./install.sh
```
:::

#### Windows (PowerShell)

Download and run the installation script:

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1" -OutFile "install.ps1"
.\install.ps1
```

:::info PowerShell Execution Policy
If you encounter an execution policy error, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
:::

**What the Script Does:**

The installation script will automatically:
- Check Docker and Docker Compose prerequisites
- Create deployment directory (`undercontrol-deployment`)
- Generate a secure JWT_SECRET automatically
- Create `.env` configuration file
- Create `docker-compose.yml` with both services
- Pull Docker images and start services

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
└── docker-compose.yml      # Docker services definition
```

### 2. Create docker-compose.yml

Create a `docker-compose.yml` file:

```yaml
services:
  backend:
    image: lintao0o0/undercontrol-backend:latest
    ports:
      - "8080:8080"
    entrypoint:
      - /usr/local/bin/undercontrol-backend
      - --port=8080
      - --environment=production
      - --data-path=/app/data
      - --database-type=sqlite
      - --jwt-secret=your-super-secret-jwt-key-change-this
      - --s3-enabled=false
      - --otel-enabled=false
      - --cors-allowed-origins=*
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
    image: lintao0o0/ud-vite-app:latest
    ports:
      - "23773:80"
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

:::danger Security Warning
**You MUST change the `--jwt-secret`** to a random, secure value:

**Linux/macOS/WSL:**
```bash
openssl rand -base64 32
```

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```
:::

:::info Free Personal Tier
UnderControl starts with a **free Personal tier** - no license required! Perfect for individual use with 1 user and all core features included (SQLite database, local storage).

Want team features, cloud storage, or PostgreSQL? Upgrade to [Pro or Max](/docs/subscription-tiers) and add your license key using `--license-token=your-key`.
:::

:::tip All Configuration Options
See the [Configuration Guide](./backend-config.md) for all available CLI flags and options.
:::

### 3. Start the Services

```bash
docker compose up -d
```

Check container status:

```bash
docker compose ps
```

You should see two running containers:
- `undercontrol-backend`
- `undercontrol-frontend`

### 4. Access the Application

- **Web Application**: http://localhost:23773
- **API Endpoint**: http://localhost:8080

## Configuration Reference

For a complete list of all available options, see the [Configuration Guide](./backend-config.md).

### CLI Flags Used in This Deployment

| Flag | Description | Value |
|------|-------------|-------|
| `--port` | HTTP server port | `8080` |
| `--environment` | Application environment | `production` |
| `--data-path` | Database and file storage path | `/app/data` |
| `--database-type` | Database type | `sqlite` |
| `--jwt-secret` | JWT token signing key | **Change this!** |
| `--s3-enabled` | Enable S3 storage | `false` |
| `--otel-enabled` | Enable OpenTelemetry | `false` |
| `--cors-allowed-origins` | Allowed CORS origins | `http://localhost:3000` |

### Optional CLI Flags

| Flag | Description | Default |
|------|-------------|---------|
| `--license-token` | License key for Pro/Max tiers | - |
| `--openai-api-key` | OpenAI API key for AI features | - |
| `--openai-model` | OpenAI model name | `gpt-3.5-turbo` |

## Troubleshooting

### Services Not Starting

Check container status and logs:

```bash
docker compose ps
docker compose logs
```

Common issues:
- Port conflicts (23773 or 8080 already in use)
- Invalid or missing `--jwt-secret`
- CORS configuration mismatch

### Cannot Access Application

1. Verify containers are running: `docker compose ps`
2. Check if ports are accessible: `curl http://localhost:8080/health`
3. Verify `--cors-allowed-origins` matches your frontend URL
4. Check browser console for CORS errors

### CORS Errors

If you see CORS errors in the browser console:

1. Verify `--cors-allowed-origins` in docker-compose.yml matches your frontend URL
2. If using a different port, update the entrypoint flag
3. Restart the backend after changing CORS settings: `docker compose restart backend`

### Database Issues

Access the backend container to inspect the database:

```bash
docker compose exec backend sh
ls -lh /app/data/
exit
```

### Data Backup

To backup your data from the Docker volume to your local machine:

```bash
# Create a backup of the data directory
docker cp undercontrol-backend:/app/data ./backup-data

# Or backup to a specific path
docker cp undercontrol-backend:/app/data /path/to/backup/location
```

To restore data back to the container:

```bash
# Restore from backup
docker cp ./backup-data/. undercontrol-backend:/app/data/
```

:::tip Automated Backups
Consider setting up a cron job or scheduled task to automatically backup your data regularly:

```bash
# Example: Backup daily at 2 AM
0 2 * * * docker cp undercontrol-backend:/app/data ~/backups/undercontrol-$(date +\%Y\%m\%d)
```
:::

### Complete Reset

:::danger Data Loss Warning
This will delete all your data!
:::

```bash
docker compose down
docker volume rm undercontrol-data
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
