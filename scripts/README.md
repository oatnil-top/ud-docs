# UnderControl Installation Scripts

This directory contains installation scripts for deploying UnderControl on different platforms.

## Quick Installation

### Linux / macOS / WSL

```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

Or download and run locally:

```bash
curl -O https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh
chmod +x install.sh
./install.sh
```

### Windows (PowerShell)

**Option 1: Direct execution (Recommended)**

```powershell
irm https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1 | iex
```

**Option 2: Download and run**

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.ps1" -OutFile "install.ps1"
.\install.ps1
```

**Option 3: Use WSL or Git Bash**

If you have WSL (Windows Subsystem for Linux) or Git Bash installed, you can use the Linux/macOS script:

```bash
curl -fsSL https://raw.githubusercontent.com/oatnil-top/ud-docs/main/scripts/install.sh | sh
```

## Prerequisites

### All Platforms
- Docker Desktop installed and running
- Docker Compose v2.0 or higher
- At least 2GB of available RAM

### Windows Additional Notes
- PowerShell 5.1 or higher (included in Windows 10/11)
- Run PowerShell as Administrator if you encounter permission issues
- If you get "execution policy" errors, run:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### Linux Additional Notes
- User must have permission to run Docker commands (add user to `docker` group)
- OpenSSL installed for JWT secret generation

### macOS Additional Notes
- Docker Desktop for Mac installed
- OpenSSL available (usually pre-installed)

## What the Scripts Do

Both scripts perform identical operations:

1. **Prerequisites Check**: Verify Docker, Docker Compose, and Docker daemon are running
2. **Directory Setup**: Create `undercontrol-deployment` directory
3. **JWT Secret**: Generate cryptographically secure JWT secret
4. **Configuration Files**: Create `.env` and `docker-compose.yml`
5. **Deployment**: Pull Docker images and start containers
6. **Verification**: Check service status and display access information

## After Installation

Once installed, access UnderControl at:
- **Web UI**: http://localhost:3000
- **API**: http://localhost:8080

Default credentials:
- Email: `admin@example.com`
- Password: `admin123`

## Managing Your Installation

### View logs
```bash
# Linux/macOS
docker compose -f undercontrol-deployment/docker-compose.yml logs -f

# Windows PowerShell
docker compose -f undercontrol-deployment\docker-compose.yml logs -f
```

### Stop services
```bash
# Linux/macOS
docker compose -f undercontrol-deployment/docker-compose.yml stop

# Windows PowerShell
docker compose -f undercontrol-deployment\docker-compose.yml stop
```

### Start services
```bash
# Linux/macOS
docker compose -f undercontrol-deployment/docker-compose.yml start

# Windows PowerShell
docker compose -f undercontrol-deployment\docker-compose.yml start
```

### Restart services
```bash
# Linux/macOS
docker compose -f undercontrol-deployment/docker-compose.yml restart

# Windows PowerShell
docker compose -f undercontrol-deployment\docker-compose.yml restart
```

### Remove completely
```bash
# Linux/macOS
docker compose -f undercontrol-deployment/docker-compose.yml down

# Windows PowerShell
docker compose -f undercontrol-deployment\docker-compose.yml down
```

## Troubleshooting

### Port Already in Use
If ports 3000 or 8080 are already in use, you can modify the `docker-compose.yml` file to use different ports:

```yaml
ports:
  - "3001:3000"  # Change host port from 3000 to 3001
```

### Docker Daemon Not Running
- **Windows/Mac**: Start Docker Desktop
- **Linux**: Run `sudo systemctl start docker`

### Permission Denied (Linux)
Add your user to the docker group:
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### PowerShell Execution Policy Error (Windows)
Allow running local scripts:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Support

For issues or questions:
- Check the [UnderControl Documentation](https://docs.undercontrol.io)
- Open an issue on GitHub
- Contact support@undercontrol.io
