---
title: Manage Tags
sidebar_position: 25
---

# Manage Tags

Organize tasks with tags — create, filter, and clean up.

## CLI

### Create a task with tags

```bash
cat <<'EOF' | ud apply -f -
---
title: Review Q1 report
status: todo
tags:
  - work
  - Q1
  - review
---
EOF
```

### Query by tag

```bash
# Single tag
ud task query "tags = 'work'"

# Any of multiple tags
ud task query "tags IN ('work', 'personal')"

# Must have ALL tags
ud task query "tags CONTAINS_ALL ('work', 'urgent')"
```

## curl

### List all tags

```bash
curl -X GET https://your-server.com/tags \
  -H "Authorization: Bearer $TOKEN"
```

### Add tags to a task

```bash
curl -X POST https://your-server.com/todolist/{taskId} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tags": ["work", "urgent", "Q1"]
  }'
```

### Delete an unused tag

```bash
curl -X DELETE https://your-server.com/tags/{tagName} \
  -H "Authorization: Bearer $TOKEN"
```

:::tip
Tags are created automatically when first used. You can only delete tags with zero usage.
:::
