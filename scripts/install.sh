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
mkdir -p "$DEPLOYMENT_DIR/data"
print_success "✓ Created deployment directory: $DEPLOYMENT_DIR"
print_success "✓ Created data directory: $DEPLOYMENT_DIR/data"

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 32)
print_success "✓ Generated JWT secret"

# Create .env file
cat > "$DEPLOYMENT_DIR/.env" << 'EOF'
# UnderControl Configuration

# License Configuration
LICENSE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiRW50ZXJwcmlzZSIsImV4cGlyZXMiOiIyMDI1LTEyLTE5VDAwOjAwOjAwWiIsIm1heF91c2VycyI6MTAwMCwibWF4X2NsaWVudHMiOjEwMDAwLCJmZWF0dXJlcyI6WyJhZHZhbmNlZF9hbmFseXRpY3MiLCJjdXN0b21fYnJhbmRpbmciLCJhcGlfYWNjZXNzIl19.abc123def456

# Security
EOF
echo "JWT_SECRET=$JWT_SECRET" >> "$DEPLOYMENT_DIR/.env"
cat >> "$DEPLOYMENT_DIR/.env" << 'EOF'

# Data Directory
UD_DATA_PATH=/app/data

# Admin User (Optional - defaults shown)
# ADMIN_EMAIL=admin@example.com
# ADMIN_PASSWORD=admin123

# Database (Optional - uses SQLite by default)
# DATABASE_URL=postgresql://user:password@localhost:5432/undercontrol

# S3 Storage (Optional)
# S3_ENDPOINT=https://s3.amazonaws.com
# S3_BUCKET=undercontrol-uploads
# S3_ACCESS_KEY=your_access_key
# S3_SECRET_KEY=your_secret_key

# OpenAI Integration (Optional)
# OPENAI_API_KEY=sk-...

# CORS (Optional)
# ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Monitoring (Optional)
# ENABLE_METRICS=false
# ENABLE_TRACING=false
EOF

print_success "✓ Created .env configuration file"

# Create docker-compose.yml
cat > "$DEPLOYMENT_DIR/docker-compose.yml" << 'EOF'
version: '3.8'

services:
  backend:
    image: lintao0o0/undercontrol-backend:latest
    container_name: undercontrol-backend
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
    env_file:
      - .env
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
      - ./data:/app/data

  frontend:
    image: lintao0o0/undercontrol-next-web:latest
    container_name: undercontrol-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:8080
    env_file:
      - .env
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
echo "  Web UI:  http://localhost:3000"
echo "  API:     http://localhost:8080"
echo ""
print_info "Default login credentials:"
echo "  Email:    admin@example.com"
echo "  Password: admin123"
echo ""
print_info "Useful commands:"
echo "  View logs:       $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml logs -f"
echo "  Stop services:   $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml stop"
echo "  Start services:  $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml start"
echo "  Restart:         $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml restart"
echo "  Remove all:      $DOCKER_COMPOSE_CMD -f $DEPLOYMENT_DIR/docker-compose.yml down"
echo ""
print_success "Happy monitoring!"
