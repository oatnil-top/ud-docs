# UnderControl Installation Script for Windows
# PowerShell version

$ErrorActionPreference = "Stop"

# Color output functions
function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }
function Write-Error-Custom { param($Message) Write-Host $Message -ForegroundColor Red }
function Write-Warning-Custom { param($Message) Write-Host $Message -ForegroundColor Yellow }

Write-Info "========================================="
Write-Info "  UnderControl Installation Script"
Write-Info "  Windows PowerShell Version"
Write-Info "========================================="
Write-Host ""

# Check if Docker is installed
Write-Info "Checking prerequisites..."
try {
    $dockerVersion = docker --version 2>$null
    if ($LASTEXITCODE -ne 0) { throw }
    Write-Success "✓ Docker is installed: $dockerVersion"
} catch {
    Write-Error-Custom "✗ Docker is not installed or not in PATH"
    Write-Error-Custom "Please install Docker Desktop from: https://docs.docker.com/desktop/install/windows-install/"
    exit 1
}

# Check if Docker Compose is available
try {
    $composeVersion = docker compose version 2>$null
    if ($LASTEXITCODE -ne 0) { throw }
    Write-Success "✓ Docker Compose is available: $composeVersion"
} catch {
    Write-Error-Custom "✗ Docker Compose is not available"
    Write-Error-Custom "Please ensure you have Docker Desktop with Compose v2+"
    exit 1
}

# Check if Docker daemon is running
try {
    docker info >$null 2>&1
    if ($LASTEXITCODE -ne 0) { throw }
    Write-Success "✓ Docker daemon is running"
} catch {
    Write-Error-Custom "✗ Docker daemon is not running"
    Write-Error-Custom "Please start Docker Desktop"
    exit 1
}

Write-Host ""

# Create deployment directory
$deploymentDir = "undercontrol-deployment"
if (Test-Path $deploymentDir) {
    Write-Warning-Custom "Directory '$deploymentDir' already exists."
    $response = Read-Host "Do you want to overwrite it? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Info "Installation cancelled."
        exit 0
    }
    Remove-Item -Path $deploymentDir -Recurse -Force
}

New-Item -ItemType Directory -Path $deploymentDir | Out-Null
Write-Success "✓ Created deployment directory: $deploymentDir"

# Generate JWT secret (equivalent to openssl rand -base64 32)
$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$jwtSecret = [Convert]::ToBase64String($bytes)
$rng.Dispose()
Write-Success "✓ Generated JWT secret"

# Create .env file
$envContent = @"
# UnderControl Configuration
# Generated on $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# License Configuration
LICENSE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55IjoiRW50ZXJwcmlzZSIsImV4cGlyZXMiOiIyMDI1LTEyLTE5VDAwOjAwOjAwWiIsIm1heF91c2VycyI6MTAwMCwibWF4X2NsaWVudHMiOjEwMDAwLCJmZWF0dXJlcyI6WyJhZHZhbmNlZF9hbmFseXRpY3MiLCJjdXN0b21fYnJhbmRpbmciLCJhcGlfYWNjZXNzIl19.abc123def456

# Security
JWT_SECRET=$jwtSecret

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
"@

Set-Content -Path "$deploymentDir\.env" -Value $envContent -NoNewline
Write-Success "✓ Created .env configuration file"

# Create docker-compose.yml
$composeContent = @"
version: '3.8'

services:
  backend:
    image: undercontrol/backend:latest
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

  frontend:
    image: undercontrol/frontend:latest
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
"@

Set-Content -Path "$deploymentDir\docker-compose.yml" -Value $composeContent -NoNewline
Write-Success "✓ Created docker-compose.yml"

Write-Host ""
Write-Info "Starting UnderControl services..."

# Change to deployment directory and start services
Push-Location $deploymentDir
try {
    docker compose pull
    if ($LASTEXITCODE -ne 0) { throw "Failed to pull Docker images" }

    docker compose up -d
    if ($LASTEXITCODE -ne 0) { throw "Failed to start services" }

    Write-Success "✓ Services started successfully"
} catch {
    Write-Error-Custom "Failed to start services: $_"
    Pop-Location
    exit 1
}
Pop-Location

# Wait for services to be ready
Write-Info "Waiting for services to be ready..."
Start-Sleep -Seconds 5

# Check service status
Write-Host ""
Write-Info "Checking service status..."
Push-Location $deploymentDir
docker compose ps
Pop-Location

Write-Host ""
Write-Success "========================================="
Write-Success "  UnderControl Installation Complete!"
Write-Success "========================================="
Write-Host ""
Write-Info "Access your UnderControl instance at:"
Write-Host "  Web UI:  " -NoNewline; Write-Success "http://localhost:3000"
Write-Host "  API:     " -NoNewline; Write-Success "http://localhost:8080"
Write-Host ""
Write-Info "Default login credentials:"
Write-Host "  Email:    " -NoNewline; Write-Success "admin@example.com"
Write-Host "  Password: " -NoNewline; Write-Success "admin123"
Write-Host ""
Write-Info "Useful commands:"
Write-Host "  View logs:       docker compose -f $deploymentDir\docker-compose.yml logs -f"
Write-Host "  Stop services:   docker compose -f $deploymentDir\docker-compose.yml stop"
Write-Host "  Start services:  docker compose -f $deploymentDir\docker-compose.yml start"
Write-Host "  Restart:         docker compose -f $deploymentDir\docker-compose.yml restart"
Write-Host "  Remove all:      docker compose -f $deploymentDir\docker-compose.yml down"
Write-Host ""
Write-Success "Happy monitoring!"
