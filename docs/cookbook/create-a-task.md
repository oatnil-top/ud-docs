---
title: Create a Task
sidebar_position: 1
---

# Create a Task

Create a new task with a title, description, status, tags, and deadline.

## CLI

### Quick create

```bash
ud task create "Buy groceries"
```

### Create with full details using `apply`

```bash
cat <<'EOF' | ud apply -f -
---
title: Buy groceries
status: todo
tags:
  - personal
  - errands
deadline: 2026-02-20
---

- Milk
- Eggs
- Bread
EOF
```

### Create from a markdown file

Save this as `task.md`:

```markdown
---
title: Prepare quarterly report
status: todo
tags:
  - work
  - Q1
deadline: 2026-03-31
---

Compile data from all teams and prepare the Q1 summary.
Include revenue, expenses, and headcount changes.
```

Then apply:

```bash
ud apply -f task.md
```

## curl

```bash
curl -X POST https://your-server.com/todolist \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "- Milk\n- Eggs\n- Bread",
    "status": "todo",
    "tags": ["personal", "errands"],
    "deadline": "2026-02-20T00:00:00Z"
  }'
```

**Response:**

```json
{
  "id": "a1b2c3d4-...",
  "title": "Buy groceries",
  "status": "todo",
  "tags": ["personal", "errands"],
  "deadline": "2026-02-20T00:00:00Z",
  "created_at": "2026-02-15T10:30:00Z"
}
```
