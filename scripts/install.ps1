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
    Write-Info "To delete it manually, run: Remove-Item -Path $deploymentDir -Recurse -Force"
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

# Create docker-compose.yml with entrypoint
$composeContent = @"
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
      - --jwt-secret=$jwtSecret
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
Write-Host "  Web UI:  " -NoNewline; Write-Success "http://localhost:23773"
Write-Host "  API:     " -NoNewline; Write-Success "http://localhost:8080"
Write-Host ""
Write-Info "Useful commands:"
Write-Host "  View logs:       docker compose -f $deploymentDir\docker-compose.yml logs -f"
Write-Host "  Stop services:   docker compose -f $deploymentDir\docker-compose.yml stop"
Write-Host "  Start services:  docker compose -f $deploymentDir\docker-compose.yml start"
Write-Host "  Restart:         docker compose -f $deploymentDir\docker-compose.yml restart"
Write-Host "  Remove all:      docker compose -f $deploymentDir\docker-compose.yml down"
Write-Host ""
Write-Info "Data management:"
Write-Host "  Backup data:     docker run --rm -v undercontrol-data:/data -v `${PWD}:/backup alpine tar czf /backup/undercontrol-backup.tar.gz -C /data ."
Write-Host "  Restore data:    docker run --rm -v undercontrol-data:/data -v `${PWD}:/backup alpine tar xzf /backup/undercontrol-backup.tar.gz -C /data"
Write-Host "  View data:       docker volume inspect undercontrol-data"
Write-Host "  Remove data:     docker volume rm undercontrol-data (warning: deletes all data!)"
Write-Host ""
Write-Success "Happy monitoring!"
