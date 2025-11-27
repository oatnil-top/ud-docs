---
sidebar_position: 6
---

# Configuration Guide

This document describes all configuration methods available for the UnderControl Go backend and provides a complete reference of all configuration options.

## Configuration Methods

UnderControl supports four methods for configuration, allowing flexibility for different deployment scenarios:

### 1. Command-Line Flags (Highest Priority)

Pass configuration directly when starting the server:

```bash
./undercontrol-server --port 8080 --environment production
```

**Use cases:**

- Development and testing with temporary overrides
- Container orchestration (Docker, Kubernetes) with explicit configuration
- CI/CD pipelines where configuration needs to be explicit
- Quick testing without modifying files

### 2. Environment Variables

Set environment variables in your shell or use a `.env` file:

```bash
export PORT=8080
export ENVIRONMENT=production
./undercontrol-server
```

Or use a `.env` file in the project root:

```env
PORT=8080
ENVIRONMENT=production
```

**Use cases:**

- Production deployments
- Container environments (Docker, Kubernetes)
- Cloud platforms (AWS, GCP, Azure)
- Development team shared configuration

### 3. Configuration Files

For specific configuration values like license tokens, the application checks these files in order:

1. `./license.txt` (current directory)
2. `/etc/undercontrol/license.txt` (system-wide)

**Use cases:**

- System-wide configuration
- Sensitive data that shouldn't be in environment variables
- Production deployments with file-based secrets

### 4. Default Values (Lowest Priority)

Built-in defaults are used when no other configuration is provided.

**Use cases:**

- Quick development setup
- Testing with minimal configuration
- Fallback values for non-critical settings

---

## Configuration Priority

The application uses the following priority order (highest to lowest):

```
┌─────────────────────────────┐
│  1. Command-Line Flags      │  ← Highest Priority
├─────────────────────────────┤
│  2. Environment Variables   │
├─────────────────────────────┤
│  3. Configuration Files     │
├─────────────────────────────┤
│  4. Default Values          │  ← Lowest Priority
└─────────────────────────────┘
```

### Priority Example

Given the following configuration sources:

```bash
# .env file
PORT=4000
ENVIRONMENT=development

# Command-line
./undercontrol-server --port 9000
```

**Result:** Server runs on **port 9000** (CLI flag overrides environment variable)

---

## Configuration Options Reference

### Environment & Logging

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `ENVIRONMENT` | `--environment`, `-e` | `development` | Application environment (development, production) |
| `PORT` | `--port`, `-p` | `8080` | HTTP server port |
| `LOG_LEVEL` | `--log-level`, `-l` | `info` | Logging level (debug, info, warn, error) |

### Data Storage

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `UD_DATA_PATH` | `--data-path` | `./data` | Base directory for application data |

### Database Configuration

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_TYPE` | `--database-type` | `sqlite` | Database type (sqlite, postgres) |
| `DATABASE_URL` | `--database-url` | `""` | Complete database connection URL |

### PostgreSQL Settings

Required when `DATABASE_TYPE=postgres`:

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `POSTGRES_HOST` | `--postgres-host` | `localhost` | PostgreSQL server host |
| `POSTGRES_PORT` | `--postgres-port` | `5432` | PostgreSQL server port |
| `POSTGRES_USER` | `--postgres-user` | `""` | PostgreSQL username |
| `POSTGRES_PASSWORD` | `--postgres-password` | `""` | PostgreSQL password |
| `POSTGRES_DATABASE` | `--postgres-database` | `undercontrol` | PostgreSQL database name |
| `POSTGRES_SSL_MODE` | `--postgres-ssl-mode` | `disable` | PostgreSQL SSL mode |

### PostgreSQL Connection Pool

Optional tuning parameters:

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `POSTGRES_MAX_OPEN_CONNS` | `--postgres-max-open-conns` | `25` | Maximum open connections |
| `POSTGRES_MAX_IDLE_CONNS` | `--postgres-max-idle-conns` | `5` | Maximum idle connections |
| `POSTGRES_CONN_MAX_LIFETIME` | `--postgres-conn-max-lifetime` | `300` | Connection max lifetime (seconds) |
| `POSTGRES_CONN_MAX_IDLE_TIME` | `--postgres-conn-max-idle-time` | `60` | Connection max idle time (seconds) |

### JWT Authentication

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `JWT_SECRET` | `--jwt-secret` | `your-secret-key` | Secret key for JWT signing |
| `JWT_EXPIRATION_MINUTES` | `--jwt-expiration-minutes` | `60` | JWT token expiration (minutes) |

:::danger Security Warning
**You MUST change `JWT_SECRET`** to a secure random value in production:
```bash
openssl rand -base64 32
```
:::

### File Upload

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `MAX_FILE_SIZE` | `--max-file-size` | `10485760` | Maximum upload size (bytes, default 10MB) |

### S3/R2 Storage

For Cloudflare R2, AWS S3, MinIO, or other S3-compatible services:

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `S3_ENABLED` | `--s3-enabled` | `false` | Enable S3-compatible storage |
| `S3_ENDPOINT` | `--s3-endpoint` | `""` | S3/R2 endpoint URL |
| `S3_REGION` | `--s3-region` | `auto` | S3/R2 region |
| `S3_BUCKET` | `--s3-bucket` | `""` | S3/R2 bucket name |
| `S3_ACCESS_KEY_ID` | `--s3-access-key-id` | `""` | S3/R2 access key ID |
| `S3_SECRET_ACCESS_KEY` | `--s3-secret-access-key` | `""` | S3/R2 secret access key |
| `S3_FORCE_PATH_STYLE` | `--s3-force-path-style` | `true` | Use path-style URLs |

**Example (Cloudflare R2):**
```bash
S3_ENABLED=true
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET_ACCESS_KEY=your-secret-access-key
S3_BUCKET=your-bucket-name
S3_ENDPOINT=https://account-id.r2.cloudflarestorage.com
S3_REGION=auto
S3_FORCE_PATH_STYLE=true
```

### LocalFS Storage

Automatic fallback when S3 is not enabled:

| Variable | Description | When Needed |
|----------|-------------|-------------|
| `LOCALFS_BASE_URL` | Base URL for presigned URLs | Behind reverse proxy or custom domain |

### Network & URLs

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `HOST_DOMAIN` | `--host-domain` | `""` | External host domain for URLs |
| `FRONTEND_URL` | `--frontend-url` | `http://localhost:12000` | Frontend application URL |
| `CORS_ALLOWED_ORIGINS` | `--cors-allowed-origins` | `http://localhost:3000,...` | Comma-separated CORS origins |

:::danger Security Warning
**Do NOT use `*` in production** - always specify explicit allowed origins.
:::

### OpenAI Integration

For AI features (expense extraction, todolist generation):

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | `--openai-api-key` | `""` | OpenAI API key |
| `OPENAI_MODEL` | `--openai-model` | `gpt-3.5-turbo` | OpenAI model name |
| `OPENAI_BASE_URL` | `--openai-base-url` | `https://api.openai.com/v1` | OpenAI API base URL |
| `OPENAI_MAX_TOKENS` | `--openai-max-tokens` | `1000` | Maximum tokens per request |
| `OPENAI_TEMPERATURE` | `--openai-temperature` | `0.7` | Model temperature (0.0-2.0) |
| `OPENAI_ORG_ID` | `--openai-org-id` | `""` | OpenAI organization ID |

### Azure Vision

Optional OCR service:

| Variable | CLI Flag | Description |
|----------|----------|-------------|
| `AZURE_VISION_KEY` | `--azure-vision-key` | Azure Vision API key |
| `AZURE_VISION_URL` | `--azure-vision-url` | Azure Vision API URL |

### Slack Notifications

For backup notifications:

| Variable | CLI Flag | Description |
|----------|----------|-------------|
| `SLACK_WEBHOOK_URL` | `--slack-webhook-url` | Slack webhook URL |

### OpenTelemetry (Observability)

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `OTEL_ENABLED` | `--otel-enabled` | `false` | Enable OpenTelemetry |
| `OTEL_SERVICE_NAME` | `--otel-service-name` | `ud-go-{env}` | Service name in telemetry |

#### Unified OTLP Endpoint (Recommended)

For services like OneUptime:

| Variable | CLI Flag | Description |
|----------|----------|-------------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `--otel-endpoint` | Unified OTLP endpoint URL |
| `OTEL_EXPORTER_OTLP_HEADERS` | `--otel-headers` | Headers (e.g., authentication tokens) |

**Example:**
```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://oneuptime.com/otlp
OTEL_EXPORTER_OTLP_HEADERS=x-oneuptime-token=your-token-here
```

#### Legacy Individual Endpoints

| Variable | CLI Flag | Description |
|----------|----------|-------------|
| `OTEL_TRACES_ENDPOINT` | `--otel-traces-endpoint` | Traces endpoint (legacy) |
| `OTEL_METRICS_ENDPOINT` | `--otel-metrics-endpoint` | Metrics endpoint (legacy) |
| `OTEL_LOGS_ENDPOINT` | `--otel-logs-endpoint` | Logs endpoint (legacy) |

### Cron Jobs

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `CRON_ENABLED` | `--cron-enabled` | `true` | Enable cron scheduler |
| `VISITOR_CLEANUP_ENABLED` | `--visitor-cleanup-enabled` | `true` | Enable visitor cleanup job |
| `VISITOR_RETENTION_DAYS` | `--visitor-retention-days` | `3` | Visitor data retention (days) |
| `VISITOR_CLEANUP_SCHEDULE` | `--visitor-cleanup-schedule` | `0 0 * * *` | Cron schedule (daily midnight) |

### Backup Configuration

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `BACKUP_ENABLED` | `--backup-enabled` | `true` | Enable automatic backups |
| `BACKUP_SCHEDULE` | `--backup-schedule` | `0 0 * * *` | Backup cron schedule |
| `BACKUP_DATA_PATH` | `--backup-data-path` | `{DataPath}` | Source data path for backup |
| `BACKUP_DIR` | `--backup-dir` | `./backups` | Backup destination directory |
| `BACKUP_RETENTION_DAYS` | `--backup-retention-days` | `30` | Backup retention (days) |

### User Management

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `ADMIN_USERNAME` | `--admin-username` | `admin@oatnil.com` | Default admin username |
| `ADMIN_PASSWORD` | `--admin-password` | `admin123` | Default admin password |
| `PERSONAL_TIER_PASSWORD` | `--personal-tier-password` | `personal123` | Personal tier password |

:::danger Security Warning
**Change these credentials immediately in production!**
:::

### Licensing

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `LICENSE_TOKEN` or `UNDERCONTROL_LICENSE` | `--license-token` | File: `./license.txt` | License token for Pro/Max tiers |

### OCR Service

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `OCR_ENDPOINT` | `--ocr-endpoint` | `http://127.0.0.1:8000/ocr` | OCR service endpoint URL |
| `OCR_AUTHORIZATION` | `--ocr-authorization` | `123456` | OCR authorization token |
| `OCR_TIMEOUT` | `--ocr-timeout` | `30` | OCR request timeout (seconds) |

### Event Bus

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `EVENT_BUS_WORKERS` | `--event-bus-workers` | `4` | Event bus worker goroutines |
| `EVENT_BUS_QUEUE_SIZE` | `--event-bus-queue-size` | `1000` | Event queue buffer size |

---

## Configuration Examples

### Minimal Configuration (SQLite + LocalFS)

```bash
# Basic Settings
PORT=8080
UD_DATA_PATH=/data

# JWT Authentication (CHANGE THIS!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Storage
S3_ENABLED=false
```

### Production Configuration (PostgreSQL + S3)

```bash
# Environment
ENVIRONMENT=production
PORT=8080
LOG_LEVEL=info

# Data Path
UD_DATA_PATH=/data

# Database
DATABASE_TYPE=postgres
POSTGRES_HOST=db.example.com
POSTGRES_PORT=5432
POSTGRES_USER=undercontrol
POSTGRES_PASSWORD=secure-db-password
POSTGRES_DATABASE=undercontrol
POSTGRES_SSL_MODE=require

# JWT Authentication
JWT_SECRET=your-generated-secure-random-jwt-secret

# CORS
CORS_ALLOWED_ORIGINS=https://app.example.com

# S3 Storage (Cloudflare R2)
S3_ENABLED=true
S3_ACCESS_KEY_ID=your-r2-access-key-id
S3_SECRET_ACCESS_KEY=your-r2-secret-key
S3_BUCKET=undercontrol-production
S3_ENDPOINT=https://account-id.r2.cloudflarestorage.com
S3_REGION=auto
S3_FORCE_PATH_STYLE=true

# OpenAI (Optional)
OPENAI_API_KEY=sk-your-openai-api-key
OPENAI_MODEL=gpt-4o-mini

# Monitoring
OTEL_ENABLED=true
OTEL_EXPORTER_OTLP_ENDPOINT=https://oneuptime.com/otlp
OTEL_EXPORTER_OTLP_HEADERS=x-oneuptime-token=your-token

# Backups
BACKUP_ENABLED=true
BACKUP_SCHEDULE="0 2 * * *"  # 2 AM daily
BACKUP_RETENTION_DAYS=30

# Admin
ADMIN_USERNAME=admin@yourcompany.com
ADMIN_PASSWORD=change-me-on-first-login
```

### Container Deployment with CLI Flags

Docker run command with explicit configuration:

```bash
docker run -d \
  --name undercontrol-backend \
  -p 8080:8080 \
  undercontrol-backend:latest \
  --port 8080 \
  --environment production \
  --database-type postgres \
  --postgres-host db \
  --postgres-user undercontrol \
  --postgres-password "${DB_PASSWORD}" \
  --jwt-secret "${JWT_SECRET}" \
  --s3-enabled \
  --s3-endpoint "${S3_ENDPOINT}" \
  --s3-bucket "${S3_BUCKET}"
```

### Kubernetes ConfigMap + Secrets

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: undercontrol-config
data:
  ENVIRONMENT: "production"
  PORT: "8080"
  DATABASE_TYPE: "postgres"
  POSTGRES_HOST: "postgres-service"
  POSTGRES_DATABASE: "undercontrol"
  S3_ENABLED: "true"
  S3_ENDPOINT: "https://s3.amazonaws.com"
  S3_REGION: "us-east-1"
  S3_BUCKET: "undercontrol-prod"
---
apiVersion: v1
kind: Secret
metadata:
  name: undercontrol-secrets
type: Opaque
stringData:
  POSTGRES_PASSWORD: "your-db-password"
  JWT_SECRET: "your-jwt-secret"
  S3_ACCESS_KEY_ID: "your-access-key"
  S3_SECRET_ACCESS_KEY: "your-secret-key"
  LICENSE_TOKEN: "your-license-token"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: undercontrol-backend
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: backend
          image: undercontrol-backend:latest
          envFrom:
            - configMapRef:
                name: undercontrol-config
            - secretRef:
                name: undercontrol-secrets
          args:
            - "--log-level=info"
            - "--postgres-max-open-conns=50"
```

### Multi-Environment Setup

```bash
# Development
./undercontrol-server -e development -p 3000 --log-level debug

# Staging
./undercontrol-server -e staging -p 8080 \
  --postgres-host staging-db.internal \
  --s3-bucket undercontrol-staging

# Production
./undercontrol-server -e production -p 8080 \
  --postgres-host prod-db.internal \
  --s3-bucket undercontrol-production \
  --otel-enabled \
  --otel-endpoint https://otel.example.com
```

---

## Best Practices

### 1. Secrets Management

**DO:**

- Use environment variables or CLI flags for secrets in production
- Use secret management tools (AWS Secrets Manager, HashiCorp Vault, Kubernetes Secrets)
- Rotate secrets regularly
- Use file-based configuration for license tokens

**DON'T:**

- Commit secrets to `.env` files in version control
- Use default passwords in production
- Share secrets in plain text

### 2. Environment-Specific Configuration

**Development:**

```bash
# Use defaults + minimal overrides
./undercontrol-server -p 3000 --log-level debug
```

**Staging:**

```bash
# Environment variables for consistency
# CLI flags for testing variations
export ENVIRONMENT=staging
./undercontrol-server --postgres-host staging-db
```

**Production:**

```bash
# Full environment variable configuration
# No CLI overrides (predictable configuration)
./undercontrol-server
```

### 3. Configuration Validation

Always verify your configuration after starting:

```bash
# Check startup logs for configuration summary
./undercontrol-server 2>&1 | grep "Server starting"

# Example output:
# Server starting on port 8080 | Tier=Pro | Database=POSTGRES | Storage=S3 | AI=OpenAI
```

### 4. Help Command

Always use `--help` to see current configuration options:

```bash
./undercontrol-server --help
```

---

## Troubleshooting

### Configuration Not Applied

**Problem:** Configuration seems to be ignored.

**Solution:**

1. Check configuration priority - CLI flags override everything
2. Verify environment variable names (case-sensitive)
3. Check for typos in flag names
4. Ensure `.env` file is in the correct directory

### Database Connection Issues

**Problem:** Cannot connect to database.

**Solution:**

```bash
# Debug database configuration
./undercontrol-server \
  --log-level debug \
  --database-type postgres \
  --postgres-host localhost \
  --postgres-port 5432

# Check startup logs for connection details
```

### License Not Recognized

**Problem:** License token not being read.

**Solution:**

Priority order for license:

1. CLI flag: `--license-token "your-token"`
2. Env var: `LICENSE_TOKEN=your-token`
3. Legacy env: `UNDERCONTROL_LICENSE=your-token`
4. File: `./license.txt`
5. File: `/etc/undercontrol/license.txt`

---

## Related Documentation

- [Docker Compose: Local Storage + SQLite](./docker-compose-local.md)
- [Docker Compose: Local Storage + PostgreSQL](./docker-compose-postgres.md)
- [Docker Compose: S3/R2 + PostgreSQL](./docker-compose-s3.md)
- [Kubernetes with Helm](./kubernetes-helm.md)
