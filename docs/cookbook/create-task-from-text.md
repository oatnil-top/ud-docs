---
title: Create Task from Text or Image
sidebar_position: 27
---

# Create Task from Text or Image

Let AI create tasks from plain text descriptions or images.

## curl

### Create task from plain text (AI)

```bash
curl -X POST https://your-server.com/todolist-from-text \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Schedule dentist appointment for next Tuesday, tag it personal and health"
  }'
```

### Create task from an existing resource (image)

If you already uploaded an image as a resource:

```bash
curl -X POST https://your-server.com/tasks/from-resource/{resourceId} \
  -H "Authorization: Bearer $TOKEN"
```

### Create expense from text (AI)

```bash
curl -X POST https://your-server.com/expense-from-text \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Coffee at Blue Bottle $6.50"
  }'
```

:::tip
The AI uses your existing tags, budgets, and accounts as context to auto-categorize items.
:::
