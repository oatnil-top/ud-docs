#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=================================================="
echo "  UnderControl - Automated Installation Script  "
echo "=================================================="
echo ""

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Check if Docker is installed
echo "Checking prerequisites..."
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "Docker is installed ($(docker --version))"

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not installed or is an old version."
    echo "Please install Docker Compose v2.0 or higher."
    exit 1
fi
print_success "Docker Compose is installed ($(docker compose version))"

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    print_error "Docker daemon is not running. Please start Docker."
    exit 1
fi
print_success "Docker daemon is running"

echo ""
echo "Creating deployment directory..."

# Create deployment directory
DEPLOY_DIR="undercontrol-deployment"
if [ -d "$DEPLOY_DIR" ]; then
    print_info "Directory '$DEPLOY_DIR' already exists."
    read -p "Do you want to continue? This may overwrite existing files. (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Installation cancelled."
        exit 0
    fi
else
    mkdir "$DEPLOY_DIR"
    print_success "Created directory: $DEPLOY_DIR"
fi

cd "$DEPLOY_DIR"

# Generate JWT_SECRET
echo ""
echo "Generating secure JWT_SECRET..."
JWT_SECRET=$(openssl rand -base64 32)
if [ -z "$JWT_SECRET" ]; then
    print_error "Failed to generate JWT_SECRET. Please ensure openssl is installed."
    exit 1
fi
print_success "JWT_SECRET generated successfully"

# Create .env file
echo ""
echo "Creating .env configuration file..."
cat > .env << 'EOF'
# License (Early Access - valid until 2025-12-19)
LICENSE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6IjE1ODdlZDRiLTkyMzEtNDYwZi1iOWNkLWZlZmUyNGRmOGYwMiIsImN1c3RvbWVyX25hbWUiOiJFYXJseUFjY2VzcyIsImV4cGlyZXNfYXQiOiIyMDI1LTEyLTE5IiwiaXNzdWVkX2F0IjoiMjAyNS0xMC0zMCIsImxpY2Vuc2VfaWQiOiJkZDZjZGE4YS05ODgyLTQyZjYtODc3Yy1lMWY4ODZhYTQ4MDciLCJtYXhfdXNlcnMiOjEwMCwicHJvZHVjdCI6IlVuZGVyQ29udHJvbCIsInRpZXIiOiJlbnRlcnByaXNlIn0.y3-UQaKDZ7QuXxpX0nynUZ1V96WfHHqqiJOeKkzrzBY

# JWT Authentication (Automatically generated)
EOF
echo "JWT_SECRET=$JWT_SECRET" >> .env
cat >> .env << 'EOF'

# Admin User Configuration (Optional - Override defaults)
# ADMIN_USERNAME=admin@oatnil.com
# ADMIN_PASSWORD=admin123

# Storage Configuration
S3_ENABLED="false"

# Monitoring (Disabled by default)
OTEL_ENABLED="false"

# Optional: OpenAI Integration
# OPENAI_BASE_URL=https://api.openai.com/v1
# OPENAI_API_KEY=your-openai-api-key
# OPENAI_MODEL=gpt-4o-mini

# CORS Configuration (default to http://localhost:3000)
# CORS_ALLOWED_ORIGINS=http://localhost:3000
EOF
print_success "Created .env file with secure JWT_SECRET"

# Create docker-compose.yml
echo ""
echo "Creating docker-compose.yml..."
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  # UnderControl Backend (Go API Server)
  server:
    image: lintao0o0/undercontrol-backend:latest
    container_name: undercontrol-backend
    restart: unless-stopped
    env_file:
      - .env
    ports:
      - "8080:8080"
    volumes:
      - backend-data:/data
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
    image: lintao0o0/undercontrol-next-web:production-latest
    container_name: ud-web
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
print_success "Created docker-compose.yml"

# Start services
echo ""
echo "Starting UnderControl services..."
docker compose pull
docker compose up -d

# Wait for services to start
echo ""
echo "Waiting for services to start..."
sleep 5

# Check if services are running
if docker compose ps | grep -q "Up"; then
    print_success "Services started successfully!"
    echo ""
    echo "=================================================="
    echo "  UnderControl is now running!                   "
    echo "=================================================="
    echo ""
    echo "Access the application:"
    echo "  Web UI:  http://localhost:3000"
    echo "  API:     http://localhost:8080"
    echo ""
    echo "Default admin credentials:"
    echo "  Username: admin@oatnil.com"
    echo "  Password: admin123"
    echo ""
    echo "⚠️  IMPORTANT: Change the default password after first login!"
    echo ""
    echo "Installation directory: $(pwd)"
    echo ""
    echo "Useful commands:"
    echo "  View logs:     docker compose logs -f"
    echo "  Stop services: docker compose down"
    echo "  Start services: docker compose up -d"
    echo ""
else
    print_error "Services failed to start. Check logs with: docker compose logs"
    exit 1
fi
