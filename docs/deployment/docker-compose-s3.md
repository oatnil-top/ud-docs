---
sidebar_position: 3
---

# Docker Compose: S3 / R2 Storage

Run the all-in-one image with PostgreSQL and offload file attachments to S3-compatible object storage — AWS S3, Cloudflare R2 (zero egress fees), or self-hosted MinIO. Recommended when you don't want uploaded files living on the application server's disk.

## Stack overview

- **Image**: `lintao0o0/undercontrol:latest` — the all-in-one container (frontend + Go backend)
- **Database**: PostgreSQL
- **Storage**: S3-compatible object storage (S3 / R2 / MinIO)

## Prerequisites

- Docker 20.10+ and Docker Compose 2.0+
- An S3 bucket and credentials (endpoint, bucket name, access key ID, secret access key)
- A license token — see [Self-Hosting](/self-hosting) for a free 3-month trial license, or [contact us](/contact).

This builds on the [PostgreSQL setup](/docs/deployment/docker-compose-postgres) — it adds S3 storage on top.

## docker-compose.yml

```yaml
services:
  postgres:
    image: postgres:18.1-alpine3.23
    environment:
      POSTGRES_DB: undercontrol
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  undercontrol:
    image: lintao0o0/undercontrol:latest
    ports:
      - "3000:8080"
    environment:
      - GIN_MODE=release
      - HOST_DOMAIN=http://localhost:3000
      - JWT_SECRET=change-me-to-a-long-random-string
      - DATABASE_TYPE=postgres
      - POSTGRES_HOST=postgres
      - POSTGRES_PORT=5432
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DATABASE=undercontrol
      - ADMIN_EMAIL=admin@example.com
      - ADMIN_PASSWORD=changeme
      - LICENSE_TOKEN=your-license-token
      - LICENSE_HOST_SECRET=your-license-secret
      # --- S3 / R2 object storage ---
      - S3_ENABLED=true
      - S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
      - S3_BUCKET=your-bucket
      - S3_ACCESS_KEY_ID=your-access-key-id
      - S3_SECRET_ACCESS_KEY=your-secret-access-key
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped

volumes:
  pg_data:
```

## Provider endpoints

- **Cloudflare R2**: `https://<account-id>.r2.cloudflarestorage.com`
- **AWS S3**: `https://s3.<region>.amazonaws.com`
- **MinIO**: your MinIO server URL, e.g. `https://minio.example.com`

## Configuration notes

- **`S3_ENABLED=true`** switches file storage from the local disk to S3. When enabled, `S3_ENDPOINT`, `S3_BUCKET`, `S3_ACCESS_KEY_ID`, and `S3_SECRET_ACCESS_KEY` are required.
- **`HOST_DOMAIN`** (required) — the public URL you reach the app at, used to build download/upload links. Must match how you actually access the app.
- **`LICENSE_TOKEN` / `LICENSE_HOST_SECRET`** — grab a free 3-month trial from the [Self-Hosting](/self-hosting) page.

See the [Backend Configuration](./backend-config) reference for all storage options.

## Start

```bash
docker compose up -d
```

Then open `http://localhost:3000`. New uploads are stored in your bucket; the database schema migrates automatically on first boot.

## Next steps

- Scale on a cluster: [Kubernetes + Helm](/docs/deployment/kubernetes-helm)
