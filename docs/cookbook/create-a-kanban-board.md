---
title: Create a Kanban Board
sidebar_position: 13
---

# Create a Kanban Board

Set up a visual board with columns to manage task workflow.

## curl

### Create a board

```bash
curl -X POST https://your-server.com/kanban/boards \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sprint 12"
  }'
```

### List all boards

```bash
curl -X GET https://your-server.com/kanban/boards \
  -H "Authorization: Bearer $TOKEN"
```

### Get board with columns

```bash
curl -X GET https://your-server.com/kanban/boards/{boardId} \
  -H "Authorization: Bearer $TOKEN"
```

### Create a task on a board

```bash
curl -X POST https://your-server.com/kanban/boards/{boardId}/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement search feature",
    "status": "todo"
  }'
```

### Query tasks on a board

```bash
curl -X POST https://your-server.com/kanban/boards/{boardId}/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "status = '\''in-progress'\''"
  }'
```

### Delete a board (tasks are preserved)

```bash
curl -X DELETE https://your-server.com/kanban/boards/{boardId} \
  -H "Authorization: Bearer $TOKEN"
```
