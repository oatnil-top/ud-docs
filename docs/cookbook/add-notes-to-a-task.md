---
title: Add Notes to a Task
sidebar_position: 3
---

# Add Notes to a Task

Track progress, decisions, or context by adding notes to a task.

## CLI

### Add a quick note

```bash
ud task note add <task-id> "Discussed with team, moving deadline to next Friday"
```

### Add a note with markdown via `apply`

```bash
cat <<'EOF' | ud task note apply -f -
---
task_id: a1b2c3d4
---

## Meeting Notes - Feb 15

- Agreed on the new API design
- @alice will handle the frontend
- Deadline extended to Feb 28
EOF
```

### List all notes on a task

```bash
ud task note list <task-id>
```

### Delete a note

```bash
ud task note delete <task-id> <note-id>
```

## curl

### Add a note

```bash
curl -X POST https://your-server.com/todolist/{taskId}/notes \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Discussed with team, moving deadline to next Friday"
  }'
```

### List notes

```bash
curl -X GET https://your-server.com/todolist/{taskId}/notes \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
[
  {
    "id": "n1e2f3...",
    "content": "Discussed with team, moving deadline to next Friday",
    "created_at": "2026-02-15T14:30:00Z",
    "updated_at": "2026-02-15T14:30:00Z"
  }
]
```

### Delete a note

```bash
curl -X DELETE https://your-server.com/todolist/{taskId}/notes/{noteId} \
  -H "Authorization: Bearer $TOKEN"
```
