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
- **License File**: Contact the UnderControl team for a license file

Verify your Docker installation:

```bash
docker --version
docker compose version
```

## Installation Options

### Option 1: Automated Installation (Recommended)

Use the automated installation script to set up UnderControl in one command.

**Steps:**

1. Copy the installation script from the [Installation Script page](/docs/deployment/installation-script)
2. Save it to a file named `install.sh`
3. Make it executable and run:

```bash
chmod +x install.sh
./install.sh
```

The script will automatically:
- Check Docker and Docker Compose prerequisites
- Create deployment directory (`undercontrol-deployment`)
- Generate a secure JWT_SECRET automatically
- Create `.env` configuration file
- Create `docker-compose.yml` with both services
- Guide you through license file setup
- Start services automatically if license file is present

After running the script, if you didn't have a license file yet, simply copy it to the deployment directory and start the services:

```bash
cd undercontrol-deployment
cp /path/to/license.txt ./license.txt
docker compose up -d
```

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
├── .env                    # Environment configuration
├── docker-compose.yml      # Docker services definition
└── license.txt             # Your license file
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

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000

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
    image: lintao0o0/undercontrol-backend:sha-0e5d92f
    container_name: undercontrol-backend
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8080:8080"
    volumes:
      - backend-data:/data
      - ./license.txt:/etc/undercontrol/license.txt:ro
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
    image: lintao0o0/undercontrol-next-web:production-fccf736
    container_name: ud-web
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://localhost:8080
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

### 5. Start the Services

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

### 6. Access the Application

- **Web Application**: http://localhost:3000
- **API Endpoint**: http://localhost:8080

## Configuration Reference

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `JWT_SECRET` | JWT token signing key (REQUIRED) | - |
| `PORT` | Backend server port | `8080` |
| `UD_DATA_PATH` | Database and file storage path | `/data` |
| `GIN_MODE` | Framework mode | `release` |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |
| `S3_ENABLED` | Enable S3 storage | `false` |

### Port Configuration

Default ports:
- `3000`: Web application
- `8080`: Backend API

To change ports, edit the `ports` section in `docker-compose.yml`:

```yaml
services:
  server:
    ports:
      - "8080:8080"    # Change first 8080 to your preferred port

  web:
    ports:
      - "3000:3000"    # Change first 3000 to your preferred port
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8080  # Update if you change backend port
```

:::tip CORS Configuration
If you change the web application port, update `CORS_ALLOWED_ORIGINS` in your `.env` file:

```bash
CORS_ALLOWED_ORIGINS=http://localhost:3001
```
:::

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
- Port conflicts (3000 or 8080 already in use)
- Missing `license.txt` file
- Invalid or missing `JWT_SECRET`
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

## Production Considerations

For production use:

1. **Reverse Proxy**: Add nginx or Caddy for HTTPS/SSL termination
2. **CORS**: Update allowed origins to your production domain
3. **Backups**: Set up automated daily backups
4. **Monitoring**: Enable OpenTelemetry
5. **Resource Limits**: Adjust based on usage
6. **Security**: Use strong JWT_SECRET, restrict network access
7. **Updates**: Monitor for security patches

### Production Reverse Proxy Example

For production, add a reverse proxy like nginx:

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - server
      - web
```

Example nginx configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://web:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://server:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Update CORS for production:

```bash
CORS_ALLOWED_ORIGINS=https://your-domain.com
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
