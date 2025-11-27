---
sidebar_position: 6
---

# Environment Variables Reference

Complete reference for all available environment variables in UnderControl backend configuration.

## Core Configuration

### Environment Settings

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ENVIRONMENT` | Deployment environment (`development`, `production`) | `development` | No |
| `PORT` | Backend server port | `4000` | No |
| `LOG_LEVEL` | Logging level (`debug`, `info`, `warn`, `error`) | `info` | No |

### Data Directory

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `UD_DATA_PATH` | Base path for all data files (database, uploads, blob storage) | `./data` | No |

## Database Configuration

### Database Type

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_TYPE` | Database type: `sqlite` or `postgres` | `sqlite` | No |
| `DATABASE_URL` | Full database connection string (overrides individual settings) | - | No |

### PostgreSQL Configuration

Required when `DATABASE_TYPE=postgres`:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `POSTGRES_HOST` | PostgreSQL server hostname | `localhost` | Yes* |
| `POSTGRES_PORT` | PostgreSQL server port | `5432` | No |
| `POSTGRES_USER` | PostgreSQL username | `postgres` | Yes* |
| `POSTGRES_PASSWORD` | PostgreSQL password | - | Yes* |
| `POSTGRES_DATABASE` | PostgreSQL database name | `undercontrol` | Yes* |
| `POSTGRES_SSL_MODE` | SSL mode (`disable`, `require`, `verify-ca`, `verify-full`) | `disable` | No |

\* Required when using PostgreSQL

### PostgreSQL Connection Pool

Optional tuning parameters:

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_MAX_OPEN_CONNS` | Maximum number of open connections | `25` |
| `POSTGRES_MAX_IDLE_CONNS` | Maximum number of idle connections | `5` |
| `POSTGRES_CONN_MAX_LIFETIME` | Maximum connection lifetime (seconds) | `300` |
| `POSTGRES_CONN_MAX_IDLE_TIME` | Maximum idle time (seconds) | `60` |

## Authentication

### JWT Configuration

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | Secret key for JWT token signing | - | **Yes** |
| `JWT_EXPIRATION_MINUTES` | JWT token expiration time in minutes | `60` | No |

:::danger Security Warning
**You MUST change `JWT_SECRET`** to a secure random value in production:
```bash
openssl rand -base64 32
```
:::

## File Storage

### Upload Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `MAX_FILE_SIZE` | Maximum file size in bytes | `10485760` (10MB) |

### Blob Storage

UnderControl automatically selects storage provider:
- If S3 is enabled and configured → Uses S3-compatible storage
- Otherwise → Uses LocalFS (no configuration needed)

#### S3-Compatible Storage

For Cloudflare R2, AWS S3, MinIO, or other S3-compatible services:

| Variable | Description | Required |
|----------|-------------|----------|
| `S3_ENABLED` | Enable S3 storage (`true`/`false`) | Yes |
| `S3_ACCESS_KEY_ID` | S3 access key ID | Yes* |
| `S3_SECRET_ACCESS_KEY` | S3 secret access key | Yes* |
| `S3_BUCKET` | S3 bucket name | Yes* |
| `S3_ENDPOINT` | S3 endpoint URL | Yes* |
| `S3_REGION` | S3 region (use `auto` for Cloudflare R2) | No |
| `S3_FORCE_PATH_STYLE` | Use path-style URLs (required for R2/MinIO) | No |

\* Required when `S3_ENABLED=true`

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

#### LocalFS Storage

Automatic fallback when S3 is not enabled. Optional configuration:

| Variable | Description | When Needed |
|----------|-------------|-------------|
| `LOCALFS_BASE_URL` | Base URL for presigned URLs | Behind reverse proxy or custom domain |

**Example:**
```bash
LOCALFS_BASE_URL=https://api.example.com
```

## External Services (Optional)

### OpenAI Integration

For AI features (expense extraction, todolist generation):

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key | - |
| `OPENAI_MODEL` | Model to use | `gpt-4o-mini` |
| `OPENAI_BASE_URL` | API base URL | `https://api.openai.com/v1` |
| `OPENAI_MAX_TOKENS` | Maximum tokens per request | `1000` |
| `OPENAI_TEMPERATURE` | Temperature (0-1) | `0.7` |
| `OPENAI_ORG_ID` | Organization ID | - |

### Azure Vision

Optional OCR service:

| Variable | Description |
|----------|-------------|
| `AZURE_VISION_KEY` | Azure Vision API key |
| `AZURE_VISION_URL` | Azure Vision endpoint URL |

### Slack Notifications

For backup notifications:

| Variable | Description |
|----------|-------------|
| `SLACK_WEBHOOK_URL` | Slack webhook URL |

## Monitoring & Observability

### OpenTelemetry Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `OTEL_ENABLED` | Enable OpenTelemetry | `true` |
| `OTEL_SERVICE_NAME` | Service name for telemetry | Auto-generated from `ENVIRONMENT` |

#### Unified OTLP Endpoint (Recommended)

For services like OneUptime:

| Variable | Description |
|----------|-------------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Unified OTLP endpoint URL |
| `OTEL_EXPORTER_OTLP_HEADERS` | Headers (e.g., authentication tokens) |

**Example:**
```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://oneuptime.com/otlp
OTEL_EXPORTER_OTLP_HEADERS=x-oneuptime-token=your-token-here
```

#### Legacy Individual Endpoints

| Variable | Description |
|----------|-------------|
| `OTEL_TRACES_ENDPOINT` | Traces endpoint URL |
| `OTEL_METRICS_ENDPOINT` | Metrics endpoint URL |
| `OTEL_LOGS_ENDPOINT` | Logs endpoint URL |

## Cron Jobs

### Visitor Data Cleanup

| Variable | Description | Default |
|----------|-------------|---------|
| `CRON_ENABLED` | Enable cron jobs | `true` |
| `VISITOR_CLEANUP_ENABLED` | Enable visitor data cleanup | `true` |
| `VISITOR_RETENTION_DAYS` | Days to retain visitor data | `3` |
| `VISITOR_CLEANUP_SCHEDULE` | Cron schedule | `0 0 * * *` (daily at midnight) |

### Backup Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `BACKUP_ENABLED` | Enable automated backups | `false` |
| `BACKUP_SCHEDULE` | Cron schedule | `0 0 * * *` (daily at midnight) |
| `BACKUP_DATA_PATH` | Path to data directory to backup | Value of `UD_DATA_PATH` |
| `BACKUP_DIR` | Directory to store backups | `./backups` |
| `BACKUP_RETENTION_DAYS` | Days to keep backups | `30` |

## CORS Configuration

| Variable | Description |
|----------|-------------|
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of allowed origins |

**Examples:**

Development:
```bash
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:12000
```

Production:
```bash
CORS_ALLOWED_ORIGINS=https://app.example.com
```

:::danger Security Warning
**Do NOT use `*` in production** - always specify explicit allowed origins.
:::

## Admin User

### Default Admin Account

Created automatically on first startup:

| Variable | Description | Default |
|----------|-------------|---------|
| `ADMIN_USERNAME` | Default admin username | `admin@oatnil.com` |
| `ADMIN_PASSWORD` | Default admin password | `admin123` |

:::danger Security Warning
**Change these credentials immediately in production!**
:::

## Environment File Examples

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

## Related Documentation

- [Docker Compose: Local Storage + SQLite](./docker-compose-local.md)
- [Docker Compose: Local Storage + PostgreSQL](./docker-compose-postgres.md)
- [Docker Compose: S3/R2 + PostgreSQL](./docker-compose-s3.md)
- [Kubernetes with Helm](./kubernetes-helm.md)
