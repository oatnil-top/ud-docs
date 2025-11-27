---
sidebar_position: 2
---

# Self-Deployment Guide

:::info Quick Start
UnderControl starts with a **free Personal tier** - no license required! Perfect for individual use with 1 user and all core features included (SQLite database, local storage).

Want team features, cloud storage, or PostgreSQL? Upgrade to [Pro or Max](/docs/subscription-tiers) and add your license key using `--license-token=your-key`.
:::
**Quick Start**: Want to get started immediately? Jump to [Docker Compose with Local Storage + SQLite](/docs/deployment/docker-compose-local) - the simplest self-deployment option.

---

Choose your deployment method based on your infrastructure and requirements.

![UnderControl Architecture](/img/Arch.png)

The architecture diagram shows how users interact with the system through their browser, which connects to the frontend. The frontend and backend communicate via CORS or reverse proxy. The backend orchestrates connections to the database and optional external services (AI, S3 storage, and OTEL monitoring).

## Architecture

UnderControl consists of two main components and several optional external services:

### Core Components

- **Backend (ud-backend)**: Go-based API server with CORS support
  - Handles all API requests and business logic
  - Connects to database and external services
  - Supports both PostgreSQL and SQLite databases

- **Frontend (ud-frontend)**: Next.js web application
  - User interface for web and mobile browsers
  - Communicates with backend via CORS or reverse proxy
  - Server-side rendering for optimal performance

### External Services (Optional)

- **AI Provider**: OpenAI-compatible API for AI-powered features
  - Configurable base URL and API key
  - Supports models like GPT-4o-mini
  - Can use OpenAI or compatible alternatives

- **S3 Provider**: S3-compatible object storage for file attachments
  - Works with AWS S3, Cloudflare R2, MinIO, etc.
  - Stores uploaded files and resources
  - Can fallback to local filesystem storage

- **OTEL Backend (Optional)**: OpenTelemetry for observability
  - Monitoring and tracing
  - Works with OneUptime and other OTEL-compatible platforms
  - Disabled by default

- **Database**: Data persistence layer
  - **PostgreSQL**: Recommended for production (concurrent access, better performance)
  - **SQLite**: Suitable for development/testing (simpler setup, single-file database)


## Deployment Options

### Docker Compose Deployments

Simple, straightforward deployments using Docker Compose:

- **[Local Storage + SQLite](/docs/deployment/docker-compose-local)** - Recommended for getting started
  - Local filesystem storage
  - SQLite database
  - Minimal configuration required

- **[Local Storage + PostgreSQL](/docs/deployment/docker-compose-postgres)** - Better for production
  - Local filesystem storage
  - PostgreSQL database
  - Improved performance and reliability

- **[S3/R2 Storage + PostgreSQL](/docs/deployment/docker-compose-s3)** - Cloud-ready
  - S3-compatible cloud storage
  - PostgreSQL database
  - Scalable file storage

### Kubernetes Deployments

Enterprise-grade deployments for production environments:

- **[Kubernetes with Helm](/docs/deployment/kubernetes-helm)** - Production-ready
  - Helm chart deployment
  - Scalable and highly available
  - Advanced configuration options

## Which Deployment Should I Choose?

### For Development or Testing
→ **[Docker Compose with Local Storage + SQLite](/docs/deployment/docker-compose-local)**

Simple setup, minimal dependencies, perfect for trying out UnderControl.

### For Small Production Deployments
→ **[Docker Compose with Local Storage + PostgreSQL](/docs/deployment/docker-compose-postgres)**

More reliable than SQLite for concurrent access, still easy to manage.

### For Production with Cloud Storage
→ **[Docker Compose with S3/R2 + PostgreSQL](/docs/deployment/docker-compose-s3)**

Offload file storage to cloud, keep database local or use managed PostgreSQL.

### For Enterprise or High Availability
→ **[Kubernetes with Helm](/docs/deployment/kubernetes-helm)**

Full orchestration, auto-scaling, rolling updates, and production-grade reliability.

## Common Requirements

All deployment methods require:

- **License File**: Contact the UnderControl team for a license file
- **JWT Secret**: A secure random string for authentication
- **Container Runtime**: Docker or compatible container runtime

## Next Steps

1. Choose a deployment method above
2. Follow the detailed guide for your chosen method
3. Configure your environment variables
4. Deploy and access your UnderControl instance

## Getting Help

If you encounter issues during deployment:

1. Check the troubleshooting section in your deployment guide
2. Review the logs for error messages
3. Visit the [documentation](/) for additional help
4. Contact support with your configuration (remove sensitive data)
