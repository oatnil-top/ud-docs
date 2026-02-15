---
title: Update a Task
sidebar_position: 4
---

# Update a Task

Change the title, description, status, tags, or deadline of an existing task.

## CLI

### Update via `apply` (recommended)

```bash
cat <<'EOF' | ud apply -f -
---
id: a1b2c3d4
title: Updated title
status: in-progress
tags:
  - work
  - reviewed
deadline: 2026-03-01
---

Updated description with new requirements.
EOF
```

### Update from a markdown file

Save as `update.md`:

```markdown
---
id: a1b2c3d4
title: Refactored API endpoints
status: done
tags:
  - backend
  - v2
---

All endpoints migrated to v2. Tests passing.
```

Then:

```bash
ud apply -f update.md
```

### Quick status change

```bash
# Mark as done
ud task done a1b2c3d4

# Edit in your $EDITOR
ud task edit a1b2c3d4
```

## curl

```bash
curl -X POST https://your-server.com/todolist/{taskId} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated title",
    "status": "in-progress",
    "tags": ["work", "reviewed"],
    "deadline": "2026-03-01T00:00:00Z"
  }'
```
