---
title: Use Custom Fields
sidebar_position: 12
---

# Use Custom Fields

Add structured data to tasks — priority levels, departments, story points, and more.

## curl

### Create a custom field definition

```bash
# Create a "Priority" select field
curl -X POST https://your-server.com/todolist/custom-fields \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Priority",
    "field_type": "select",
    "options": ["Low", "Medium", "High", "Critical"]
  }'
```

### List all custom fields

```bash
curl -X GET https://your-server.com/todolist/custom-fields \
  -H "Authorization: Bearer $TOKEN"
```

### Update a task's custom field value

```bash
curl -X PATCH https://your-server.com/todolist/{taskId}/metadata \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "custom_fields": {
      "priority": "High"
    }
  }'
```

### Query by custom field

```bash
# CLI
ud task query "cf.priority = 'High' AND status != 'done'"

# curl
curl -X POST https://your-server.com/todolist/query \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "cf.priority = '\''High'\'' AND status != '\''done'\''"
  }'
```

### Custom field types

| Type | Example use | Query example |
|------|------------|---------------|
| `text` | Notes, location | `cf.location = 'NYC'` |
| `number` | Story points | `cf.points > 5` |
| `select` | Priority dropdown | `cf.priority = 'High'` |
| `checkbox` | Reviewed? | `cf.reviewed = 'true'` |
| `user` | Assigned to | `cf.assigned = 'alice'` |
