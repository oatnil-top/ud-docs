.PHONY: help install dev start build deploy clean

# Default target
help:
	@echo "Available targets:"
	@echo "  make install    - Install dependencies"
	@echo "  make dev        - Start development server"
	@echo "  make start      - Start development server (alias for dev)"
	@echo "  make build      - Build static site"
	@echo "  make deploy     - Deploy to GitHub Pages"
	@echo "  make deploy-ssh - Deploy to GitHub Pages using SSH"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make help       - Show this help message"

# Install dependencies
install:
	yarn install

# Start development server
dev:
	yarn start

# Alias for dev
start: dev

# Build static site
build:
	yarn build

# Deploy to GitHub Pages (without SSH)
deploy:
	yarn deploy

# Deploy to GitHub Pages (with SSH)
deploy-ssh:
	USE_SSH=true yarn deploy

# Clean build artifacts
clean:
	rm -rf build .docusaurus node_modules/.cache
