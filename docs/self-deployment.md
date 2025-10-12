---
sidebar_position: 2
---

# Self-Deployment Guide

This guide will help you deploy UnderControl on your own infrastructure using Docker Compose. The entire stack includes a Go backend, Next.js web application, and Traefik reverse proxy.

## Overview

UnderControl is a modern web application for managing accounts, budgets, and expenses. The self-hosted deployment uses:

- **Backend**: Go-based API server (UnderControl Backend)
- **Frontend**: Next.js web application with React
- **Proxy**: Traefik for routing and load balancing
- **Database**: SQLite (included, no external database required)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **License File**: Contact the UnderControl team for a license file

To verify your Docker installation:

```bash
docker --version
docker compose version
```

## Quick Start

### 1. Download the Deployment Package

Create a directory for your UnderControl deployment:

```bash
mkdir undercontrol-deployment
cd undercontrol-deployment
```

### 2. Create Configuration Files

Create a `.env` file with your configuration:

```bash
cat > .env <<EOF
# Backend Configuration
PORT=8080
UD_DATA_PATH=/data
GIN_MODE=release

# JWT Authentication (REQUIRED - Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# S3/R2 Storage Configuration (Optional)
S3_ENABLED="false"

# OpenAI Configuration (Optional)
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_API_KEY=your-openai-api-key
# OPENAI_MODEL=gpt-4o-mini
EOF
```

:::danger Important Security Note
**You MUST change the `JWT_SECRET`** to a random, secure value. Generate a strong secret:

```bash
openssl rand -base64 32
```
:::

### 3. Add Your License File

Place your `license.txt` file in the deployment directory:

```bash
# Copy your license file here
cp /path/to/your/license.txt ./license.txt
```

### 4. Create docker-compose.yml

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  # UnderControl Server (Go Backend API)
  server:
    image: lintao0o0/undercontrol-backend:sha-6df2635
    container_name: undercontrol-backend
    restart: unless-stopped
    env_file:
      - .env
    volumes:
      - backend-data:/data
      - ./license.txt:/etc/undercontrol/license.txt:ro
    networks:
      - ud-network
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
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.api.rule=PathPrefix(`/ud-api`)"
      - "traefik.http.routers.api.entrypoints=web"
      - "traefik.http.routers.api.middlewares=ud-server-stripprefix"
      - "traefik.http.services.api.loadbalancer.server.port=8080"
      - "traefik.http.middlewares.ud-server-stripprefix.stripprefix.prefixes=/ud-api"

  # Next.js Web Application
  web:
    image: ghcr.io/oatnil-top/ud-all-in-one-next-web:main-7f78bb0
    container_name: ud-web
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=/ud-api
    networks:
      - ud-network
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
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.web.rule=PathPrefix(`/ud`)"
      - "traefik.http.routers.web.entrypoints=web"
      - "traefik.http.routers.web.priority=1"
      - "traefik.http.services.web.loadbalancer.server.port=3000"

  # Traefik Reverse Proxy
  traefik:
    image: traefik:v3.0
    container_name: ud-traefik
    command:
      - "--api.dashboard=true"
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--providers.docker.network=ud-network"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.traefik.address=:8080"
      - "--entrypoints.web-secure.address=:443"
      - "--log.level=INFO"
      - "--accesslog=true"
    ports:
      - 20080:80
      - 28080:8080
      - 20443:443
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - ud-network
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.dashboard.rule=Host(`traefik.localhost`)"
      - "traefik.http.routers.dashboard.entrypoints=web"
      - "traefik.http.routers.dashboard.service=api@internal"

volumes:
  backend-data:
    driver: local

networks:
  ud-network:
    driver: bridge
```

### 5. Start the Services

Start all services with Docker Compose:

```bash
docker compose up -d
```

Check that all containers are running:

```bash
docker compose ps
```

You should see three containers running:
- `undercontrol-backend`
- `ud-web`
- `ud-traefik`

### 6. Access the Application

Once all services are running, access the application:

- **Web Application**: http://localhost:20080/ud
- **API Endpoint**: http://localhost:20080/ud-api
- **Traefik Dashboard**: http://localhost:28080

## Configuration Options

### Environment Variables

#### Required Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | Secret key for JWT token signing (REQUIRED) | `your-super-secret-key` |
| `PORT` | Backend server port | `8080` |
| `UD_DATA_PATH` | Path for SQLite database | `/data` |
| `GIN_MODE` | Gin framework mode | `release` |

#### Optional: S3/R2 Storage

Enable cloud storage for file uploads:

```bash
# S3/R2 Storage Configuration
S3_ENABLED="true"
S3_ENDPOINT="https://your-endpoint.r2.cloudflarestorage.com"
S3_REGION="auto"
S3_BUCKET="your-bucket-name"
S3_FORCE_PATH_STYLE="true"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"
```

:::tip Using Cloudflare R2
Cloudflare R2 is a cost-effective S3-compatible storage option with zero egress fees. Perfect for hosting user-uploaded files.
:::

#### Optional: OpenAI Integration

Enable AI features with OpenAI:

```bash
# OpenAI Configuration
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-4o-mini
```

You can also use GitHub Models (free tier available):

```bash
OPENAI_BASE_URL=https://models.github.ai/inference
OPENAI_API_KEY=your-github-token
OPENAI_MODEL=openai/gpt-4o-mini
```

#### Optional: OpenTelemetry Monitoring

Enable observability with OpenTelemetry:

```bash
# OpenTelemetry Configuration
OTEL_EXPORTER_OTLP_ENDPOINT="https://your-otel-endpoint.com/otlp"
OTEL_SERVICE_NAME="undercontrol-backend"
OTEL_EXPORTER_OTLP_HEADERS="x-oneuptime-token=your-token"
```

### Port Configuration

The default ports are:

- `20080`: HTTP traffic (web application and API)
- `28080`: Traefik dashboard
- `20443`: HTTPS traffic (configure SSL certificates for production)

To change ports, edit the `ports` section in the `traefik` service:

```yaml
ports:
  - 8080:80      # Change 8080 to your preferred HTTP port
  - 8888:8080    # Change 8888 to your preferred dashboard port
  - 8443:443     # Change 8443 to your preferred HTTPS port
```

## Managing Your Deployment

### View Logs

View logs for all services:

```bash
docker compose logs -f
```

View logs for a specific service:

```bash
docker compose logs -f server    # Backend logs
docker compose logs -f web       # Frontend logs
docker compose logs -f traefik   # Traefik logs
```

### Stop Services

Stop all services (containers remain):

```bash
docker compose stop
```

### Restart Services

Restart all services:

```bash
docker compose restart
```

### Update to Latest Version

Pull the latest images and restart:

```bash
docker compose pull
docker compose up -d
```

### Backup Your Data

The SQLite database and uploaded files are stored in the `backend-data` volume. To backup:

```bash
# Create a backup directory
mkdir -p backups

# Backup the data volume
docker run --rm -v undercontrol-deployment_backend-data:/data \
  -v $(pwd)/backups:/backup alpine \
  tar czf /backup/undercontrol-backup-$(date +%Y%m%d).tar.gz /data
```

To restore from backup:

```bash
docker run --rm -v undercontrol-deployment_backend-data:/data \
  -v $(pwd)/backups:/backup alpine \
  tar xzf /backup/undercontrol-backup-YYYYMMDD.tar.gz -C /
```

## Troubleshooting

### Services Not Starting

Check container status:

```bash
docker compose ps
docker compose logs
```

Common issues:
- **Port conflicts**: Another service might be using ports 20080, 28080, or 20443
- **License file missing**: Ensure `license.txt` exists in the deployment directory
- **Invalid JWT_SECRET**: Make sure JWT_SECRET is set in `.env`

### Cannot Access Web Application

1. Verify all containers are running: `docker compose ps`
2. Check Traefik dashboard: http://localhost:28080
3. Verify network connectivity: `docker compose exec web ping server`
4. Check browser console for errors

### API Requests Failing

1. Check backend logs: `docker compose logs server`
2. Verify API endpoint: http://localhost:20080/ud-api/health
3. Check JWT token configuration in `.env`

### Database Issues

The SQLite database is stored in the Docker volume. To inspect:

```bash
# Access the backend container
docker compose exec server sh

# Check database location
ls -lh /data/

# Exit container
exit
```

### Resetting Everything

To completely reset your deployment (WARNING: This deletes all data):

```bash
# Stop and remove containers
docker compose down

# Remove volumes (deletes all data!)
docker volume rm undercontrol-deployment_backend-data

# Start fresh
docker compose up -d
```

## Production Considerations

For production deployments, consider:

1. **HTTPS/SSL**: Configure SSL certificates with Let's Encrypt and Traefik
2. **Reverse Proxy**: Place Traefik behind your main nginx/Apache proxy
3. **Backups**: Set up automated daily backups of the `backend-data` volume
4. **Monitoring**: Enable OpenTelemetry for observability
5. **Resource Limits**: Adjust CPU/memory limits based on your usage
6. **Security**: Use strong JWT_SECRET and restrict network access
7. **Updates**: Subscribe to release notifications for security patches

### HTTPS Configuration Example

To enable HTTPS with Let's Encrypt, update your Traefik configuration:

```yaml
traefik:
  command:
    - "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com"
    - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
  volumes:
    - ./letsencrypt:/letsencrypt
```

Then add labels to your services:

```yaml
labels:
  - "traefik.http.routers.web.tls=true"
  - "traefik.http.routers.web.tls.certresolver=letsencrypt"
```

## Getting Help

If you encounter issues:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review logs: `docker compose logs`
3. Visit the [UnderControl documentation](/)
4. Contact support with your logs and configuration (remove sensitive data)

## Next Steps

Now that you have UnderControl running:

- Create your first admin account
- Explore the [Features](/docs/features/accounts) documentation
- Set up integrations (S3/R2, OpenAI)
- Configure backups
- Customize your deployment

Happy budgeting!
