---
title: Authenticate
sidebar_position: 0
---

# Authenticate

Log in to get access tokens for CLI and API usage.

## CLI

```bash
ud login
```

You'll be prompted for server URL, username, and password. Credentials are saved to `~/.config/ud/config.yaml`.

### Login to a specific context

```bash
ud login --context work --api-url https://ud.company.com
```

## curl

### Get access token

```bash
curl -X POST https://your-server.com/auth/v2/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "you@example.com",
    "password": "your-password"
  }'
```

**Response:**

```json
{
  "accessToken": "eyJhbG...",
  "refreshToken": "eyJhbG...",
  "userId": "a1b2c3d4-...",
  "userName": "you@example.com",
  "userRole": "user"
}
```

### Use the token

```bash
export TOKEN="eyJhbG..."

curl -X GET https://your-server.com/todolist \
  -H "Authorization: Bearer $TOKEN"
```

### Refresh an expired token

```bash
curl -X POST https://your-server.com/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "eyJhbG..."
  }'
```
