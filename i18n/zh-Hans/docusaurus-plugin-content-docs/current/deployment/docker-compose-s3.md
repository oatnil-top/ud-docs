---
sidebar_position: 3
---

# Docker Compose: S3/R2 Storage + PostgreSQL

Deploy UnderControl with cloud storage (S3/R2) and PostgreSQL for scalable, cloud-ready production deployments.

## Coming Soon

This deployment guide is currently being developed.

## Stack Overview

This deployment will include:

- **Storage**: S3-compatible cloud storage (AWS S3, Cloudflare R2, MinIO, etc.)
- **Database**: PostgreSQL
- **Backend**: Go-based API server
- **Frontend**: Next.js web application
- **Proxy**: Traefik reverse proxy

## Benefits

- Scalable file storage with S3-compatible services
- Offload file storage from application servers
- Support for Cloudflare R2 (zero egress fees)
- Better for distributed deployments
- Automatic file redundancy and backup

## Temporary Alternative

While this guide is being prepared, you can start with:

- [Docker Compose with Local Storage + SQLite](/docs/deployment/docker-compose-local) - Available now

Check back soon for the complete S3/R2 deployment guide.
