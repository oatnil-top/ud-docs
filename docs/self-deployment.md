---
sidebar_position: 2
---

# Self-Deployment Guide

Choose your deployment method based on your infrastructure and requirements.

## Architecture

UnderControl consists of three main components:

- **Backend**: Go-based API server
- **Frontend**: Next.js web application
- **Proxy**: Traefik for routing and load balancing

![UnderControl Architecture](/img/Arch.png)

The architecture diagram shows how these components work together. The backend handles API requests and data storage, the frontend provides the user interface, and Traefik routes traffic between them.

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
