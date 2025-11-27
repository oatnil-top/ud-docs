#!/bin/bash

# UnderControl Installation Script
# For Linux, macOS, and WSL

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
print_success() { echo -e "${GREEN}$1${NC}"; }
print_info() { echo -e "${BLUE}$1${NC}"; }
print_error() { echo -e "${RED}$1${NC}"; }
print_warning() { echo -e "${YELLOW}$1${NC}"; }

print_info "========================================="
print_info "  UnderControl Installation Script"
print_info "========================================="
echo ""

# Check if Docker is installed
print_info "Checking prerequisites..."
if ! command -v docker &> /dev/null; then
    print_error "✗ Docker is not installed"
    print_error "Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "✓ Docker is installed: $(docker --version)"

# Check if Docker Compose is available
DOCKER_COMPOSE_CMD=""
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
elif docker-compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
else
    print_error "✗ Docker Compose is not available"
    print_error "Please install Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi
print_success "✓ Docker Compose is available: $($DOCKER_COMPOSE_CMD version)"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    print_error "✗ Docker daemon is not running"
    print_error "Please start the Docker daemon"
    exit 1
fi
print_success "✓ Docker daemon is running"

echo ""

# Create deployment directory
DEPLOYMENT_DIR="undercontrol-deployment"
if [ -d "$DEPLOYMENT_DIR" ]; then
    print_warning "Directory '$DEPLOYMENT_DIR' already exists."
    print_info "To delete it manually, run: rm -rf $DEPLOYMENT_DIR"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Installation cancelled."
        exit 0
    fi
    rm -rf "$DEPLOYMENT_DIR"
fi

mkdir -p "$DEPLOYMENT_DIR"
print_success "✓ Created deployment directory: $DEPLOYMENT_DIR"

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)
print_success "✓ Generated JWT secret"

# Create docker-compose.yml with entrypoint
cat > "$DEPLOYMENT_DIR/docker-compose.yml" << EOF
services:
  backend:
    image: lintao0o0/undercontrol-backend:latest
    ports:
      - "8080:8080"
    entrypoint:
      - /usr/local/bin/undercontrol-backend
      - --port=8080
      - --environment=production
      - --data-path=/app/data
      - --database-type=sqlite
      - --jwt-secret=$JWT_SECRET
      - --s3-enabled=false
      - --otel-enabled=false
      - --cors-allowed-origins=*
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 1G
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    volumes:
      - undercontrol-data:/app/data

  frontend:
    image: lintao0o0/ud-vite-app:latest
    ports:
      - "23773:80"
    depends_on:
      - backend
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

volumes:
  undercontrol-data:
    driver: local
EOF

print_success "✓ Created docker-compose.yml"

echo ""
print_info "Starting UnderControl services..."

# Start services
cd "$DEPLOYMENT_DIR"
$DOCKER_COMPOSE_CMD pull
$DOCKER_COMPOSE_CMD up -d
cd ..

print_success "✓ Services started successfully"

# Wait for services to be ready
print_info "Waiting for services to be ready..."
sleep 5

# Check service status
echo ""
print_info "Checking service status..."
cd "$DEPLOYMENT_DIR"
$DOCKER_COMPOSE_CMD ps
cd ..

echo ""
print_success "========================================="
print_success "  UnderControl Installation Complete!"
print_success "========================================="
echo ""
print_info "Access your UnderControl instance at:"
echo "  Web UI:  http://localhost:23773"
echo "  API:     http://localhost:8080"
echo ""
print_info "Useful commands:"
echo "  View logs:       $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml logs -f"
echo "  Stop services:   $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml stop"
echo "  Start services:  $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml start"
echo "  Restart:         $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml restart"
echo "  Remove all:      $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml down"
echo ""
print_info "Data management:"
echo "  Backup data:     docker run --rm -v undercontrol-data:/data -v \$(pwd):/backup alpine tar czf /backup/undercontrol-backup.tar.gz -C /data ."
echo "  Restore data:    docker run --rm -v undercontrol-data:/data -v \$(pwd):/backup alpine tar xzf /backup/undercontrol-backup.tar.gz -C /data"
echo "  View data:       docker volume inspect undercontrol-data"
echo "  Remove data:     docker volume rm undercontrol-data (warning: deletes all data!)"
echo ""
print_success "Happy monitoring!"
