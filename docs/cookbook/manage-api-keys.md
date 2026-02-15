---
title: Manage API Keys
sidebar_position: 23
---

# Manage API Keys

Create API keys for programmatic access — CI/CD, scripts, integrations.

## curl

### Create an API key

```bash
curl -X POST https://your-server.com/auth/api-keys \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**

```json
{
  "key": "ud_ak_...",
  "id": "key-id-...",
  "created_at": "2026-02-15T10:00:00Z"
}
```

:::caution
The API key is only shown once. Save it securely.
:::

### List API keys

```bash
curl -X GET https://your-server.com/auth/api-keys \
  -H "Authorization: Bearer $TOKEN"
```

### Revoke an API key

```bash
curl -X DELETE https://your-server.com/auth/api-keys/{keyId} \
  -H "Authorization: Bearer $TOKEN"
```

### Use an API key with the CLI

```bash
ud config set-context ci --api-url https://your-server.com --api-key ud_ak_...
ud config use-context ci
ud get task
```

### Use an API key with curl

```bash
curl -X GET https://your-server.com/todolist \
  -H "X-API-Key: ud_ak_..."
```
