#!/bin/sh
set -e

# UnderControl Docker Compose Installation Script
# Usage: curl -fsSL https://your-domain.com/scripts/install-docker-compose-local.sh | sh

echo "=================================="
echo "UnderControl Installation Script"
echo "=================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v docker >/dev/null 2>&1; then
    echo "Error: Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker compose >/dev/null 2>&1; then
    echo "Error: Docker Compose is not installed."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker found: $(docker --version)"
echo "✓ Docker Compose found: $(docker compose version)"
echo ""

# Create deployment directory
DEPLOY_DIR="${DEPLOY_DIR:-undercontrol-deployment}"
echo "Creating deployment directory: $DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cd "$DEPLOY_DIR"

# Generate JWT secret
echo "Generating secure JWT_SECRET..."
if command -v openssl >/dev/null 2>&1; then
    JWT_SECRET=$(openssl rand -base64 32)
else
    echo "Warning: openssl not found, using fallback random generation"
    JWT_SECRET=$(head -c 32 /dev/urandom | base64)
fi
echo "✓ JWT_SECRET generated"
echo ""

# Create .env file
echo "Creating .env configuration file..."
cat > .env <<EOF
# Backend Configuration
PORT=8080
UD_DATA_PATH=/data
GIN_MODE=release

# JWT Authentication
JWT_SECRET=$JWT_SECRET

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Storage Configuration
S3_ENABLED="false"

# Optional: OpenAI Integration
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_API_KEY=your-openai-api-key
# OPENAI_MODEL=gpt-4o-mini
EOF
echo "✓ .env file created"
echo ""

# Create docker-compose.yml
echo "Creating docker-compose.yml..."
cat > docker-compose.yml <<'EOF'
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
EOF
echo "✓ docker-compose.yml created"
echo ""

# Check for license file
echo "=================================="
echo "License File Required"
echo "=================================="
echo ""
echo "Please place your license.txt file in the deployment directory:"
echo "  $(pwd)/license.txt"
echo ""
echo "If you don't have a license file yet, contact the UnderControl team."
echo ""

if [ -f "license.txt" ]; then
    echo "✓ license.txt found"
    echo ""

    # Start services
    echo "=================================="
    echo "Starting Services"
    echo "=================================="
    echo ""
    echo "Starting UnderControl with Docker Compose..."
    docker compose up -d

    echo ""
    echo "Checking container status..."
    docker compose ps

    echo ""
    echo "=================================="
    echo "Installation Complete!"
    echo "=================================="
    echo ""
    echo "Access your UnderControl instance:"
    echo "  Web Application: http://localhost:3000"
    echo "  API Endpoint:    http://localhost:8080"
    echo ""
    echo "Useful commands:"
    echo "  View logs:       docker compose logs -f"
    echo "  Stop services:   docker compose stop"
    echo "  Restart:         docker compose restart"
    echo "  Update:          docker compose pull && docker compose up -d"
    echo ""
    echo "Your deployment is located at: $(pwd)"
else
    echo "⚠ license.txt not found"
    echo ""
    echo "=================================="
    echo "Setup Complete (Awaiting License)"
    echo "=================================="
    echo ""
    echo "Next steps:"
    echo "  1. Copy your license file:"
    echo "     cp /path/to/license.txt $(pwd)/license.txt"
    echo ""
    echo "  2. Start the services:"
    echo "     cd $(pwd)"
    echo "     docker compose up -d"
    echo ""
    echo "  3. Access your instance:"
    echo "     Web Application: http://localhost:3000"
    echo "     API Endpoint:    http://localhost:8080"
    echo ""
fi

echo "For help and documentation, visit: https://docs.undercontrol.io"
echo ""
