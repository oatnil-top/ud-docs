---
title: Link Tasks Together
sidebar_position: 7
---

# Link Tasks Together

Create relationships between tasks — link related work, dependencies, or subtasks.

## CLI

### Link two tasks

```bash
ud task link a1b2c3d4 e5f6g7h8
```

### Unlink tasks

```bash
ud task unlink a1b2c3d4 e5f6g7h8
```

### View linked tasks

```bash
ud describe task a1b2c3d4
# Output includes linked tasks section
```

## curl

### Add a linked item

```bash
curl -X POST https://your-server.com/todolist/{taskId}/linked-items \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "linked_entity_id": "e5f6g7h8-...",
    "linked_entity_type": "todolist"
  }'
```

### Remove a linked item

```bash
curl -X DELETE https://your-server.com/todolist/{taskId}/linked-items/{linkedItemId} \
  -H "Authorization: Bearer $TOKEN"
```
