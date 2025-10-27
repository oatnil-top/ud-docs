---
sidebar_position: 1
---

# Docker Compose: Local Storage + SQLite

Simple deployment using Docker Compose with local filesystem storage and SQLite database. Perfect for getting started, development, and small production deployments.

## Stack Overview

This deployment includes:

- **Storage**: Local filesystem (Docker volume)
- **Database**: SQLite
- **Backend**: Go-based API server
- **Frontend**: Next.js web application
- **Proxy**: Traefik reverse proxy

## Prerequisites

Before you begin, ensure you have:

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **License File**: Contact the UnderControl team for a license file

Verify your Docker installation:

```bash
docker --version
docker compose version
```

## Quick Start

### 1. Create Deployment Directory

```bash
mkdir undercontrol-deployment
cd undercontrol-deployment
```

### 2. Create Configuration File

Create a `.env` file with your configuration:

```bash
cat > .env <<EOF
# Backend Configuration
PORT=8080
UD_DATA_PATH=/data
GIN_MODE=release

# JWT Authentication (REQUIRED - Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Storage Configuration
S3_ENABLED="false"

# Optional: OpenAI Integration
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_API_KEY=your-openai-api-key
# OPENAI_MODEL=gpt-4o-mini
EOF
```

:::danger Security Warning
**You MUST change the `JWT_SECRET`** to a random, secure value:

```bash
openssl rand -base64 32
```
:::

### 3. Add License File

Place your `license.txt` file in the deployment directory:

```bash
cp /path/to/your/license.txt ./license.txt
```

### 4. Create docker-compose.yml

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  # UnderControl Backend (Go API Server)
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

```bash
docker compose up -d
```

Check container status:

```bash
docker compose ps
```

You should see three running containers:
- `undercontrol-backend`
- `ud-web`
- `ud-traefik`

### 6. Access the Application

- **Web Application**: http://localhost:20080/ud
- **API Endpoint**: http://localhost:20080/ud-api
- **Traefik Dashboard**: http://localhost:28080

## Configuration Reference

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | JWT token signing key (REQUIRED) | - |
| `PORT` | Backend server port | `8080` |
| `UD_DATA_PATH` | Database and file storage path | `/data` |
| `GIN_MODE` | Framework mode | `release` |
| `S3_ENABLED` | Enable S3 storage | `false` |

### Port Configuration

Default ports:
- `20080`: HTTP (web and API)
- `28080`: Traefik dashboard
- `20443`: HTTPS (requires SSL configuration)

To change ports, edit the `traefik` service in `docker-compose.yml`:

```yaml
ports:
  - 8080:80      # Your HTTP port
  - 8888:8080    # Your dashboard port
  - 8443:443     # Your HTTPS port
```

## Managing Your Deployment

### View Logs

All services:
```bash
docker compose logs -f
```

Specific service:
```bash
docker compose logs -f server
docker compose logs -f web
docker compose logs -f traefik
```

### Stop Services

```bash
docker compose stop
```

### Restart Services

```bash
docker compose restart
```

### Update Services

```bash
docker compose pull
docker compose up -d
```

### Backup Data

The SQLite database and files are in the `backend-data` volume:

```bash
# Create backup
mkdir -p backups
docker run --rm \
  -v undercontrol-deployment_backend-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/backup-$(date +%Y%m%d).tar.gz /data
```

Restore from backup:

```bash
docker run --rm \
  -v undercontrol-deployment_backend-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar xzf /backup/backup-YYYYMMDD.tar.gz -C /
```

## Troubleshooting

### Services Not Starting

Check container status and logs:

```bash
docker compose ps
docker compose logs
```

Common issues:
- Port conflicts (20080, 28080, 20443 in use)
- Missing `license.txt` file
- Invalid or missing `JWT_SECRET`

### Cannot Access Application

1. Verify containers are running: `docker compose ps`
2. Check Traefik dashboard: http://localhost:28080
3. Test network connectivity: `docker compose exec web ping server`
4. Check browser console for errors

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

## Production Considerations

For production use:

1. **HTTPS/SSL**: Configure Let's Encrypt certificates
2. **Backups**: Set up automated daily backups
3. **Monitoring**: Enable OpenTelemetry
4. **Resource Limits**: Adjust based on usage
5. **Security**: Use strong JWT_SECRET, restrict network access
6. **Updates**: Monitor for security patches

### HTTPS with Let's Encrypt

Add to Traefik service in `docker-compose.yml`:

```yaml
traefik:
  command:
    # ... existing commands ...
    - "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com"
    - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"
    - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
  volumes:
    - ./letsencrypt:/letsencrypt
    - /var/run/docker.sock:/var/run/docker.sock:ro
```

Add labels to your services:

```yaml
labels:
  - "traefik.http.routers.web.tls=true"
  - "traefik.http.routers.web.tls.certresolver=letsencrypt"
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
