---
title: Delete a Task
sidebar_position: 5
---

# Delete a Task

Remove a task. Deleted tasks go to trash and can be restored.

## CLI

```bash
ud delete task a1b2c3d4
```

## curl

### Delete

```bash
curl -X DELETE https://your-server.com/todolist/{taskId} \
  -H "Authorization: Bearer $TOKEN"
```

### Restore from trash

```bash
curl -X POST https://your-server.com/todolist/{taskId}/restore \
  -H "Authorization: Bearer $TOKEN"
```

### List deleted tasks

```bash
curl -X GET https://your-server.com/todolist/deleted \
  -H "Authorization: Bearer $TOKEN"
```
