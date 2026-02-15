---
title: Batch Update Tasks
sidebar_position: 6
---

# Batch Update Tasks

Update multiple tasks at once — useful for bulk status changes or cleanup.

## CLI

### Mark multiple tasks done with a loop

```bash
for id in a1b2c3d4 e5f6g7h8 i9j0k1l2; do
  ud task done $id
done
```

### Batch status update via `apply`

```bash
for id in a1b2c3d4 e5f6g7h8 i9j0k1l2; do
  echo "---
id: $id
status: archived
---" | ud apply -f -
done
```

## curl

### Batch update

```bash
curl -X POST https://your-server.com/todolist/batch-update \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["a1b2c3d4-...", "e5f6g7h8-...", "i9j0k1l2-..."],
    "updates": {
      "status": "archived"
    }
  }'
```

### Batch delete

```bash
curl -X POST https://your-server.com/todolist/batch-delete \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["a1b2c3d4-...", "e5f6g7h8-..."]
  }'
```
