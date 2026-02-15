---
title: Share a Task Publicly
sidebar_position: 8
---

# Share a Task Publicly

Generate a public link to share a task with anyone — no login required.

## curl

### Create a share link

```bash
curl -X POST https://your-server.com/todolist/{taskId}/share \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json"
```

**Response:**

```json
{
  "token": "abc123xyz",
  "url": "https://your-server.com/share/todolist/abc123xyz"
}
```

### List all share links for a task

```bash
curl -X GET https://your-server.com/todolist/{taskId}/shares \
  -H "Authorization: Bearer $TOKEN"
```

### Revoke a share link

```bash
curl -X DELETE https://your-server.com/todolist/share/{token} \
  -H "Authorization: Bearer $TOKEN"
```

### View a shared task (no auth needed)

```bash
curl -X GET https://your-server.com/share/todolist/{token}
```
