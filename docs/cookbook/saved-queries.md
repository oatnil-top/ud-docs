---
title: Save and Reuse Queries
sidebar_position: 24
---

# Save and Reuse Queries

Save frequently-used queries for one-click access.

## curl

### Create a saved query

```bash
curl -X POST https://your-server.com/saved-queries \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Overdue Tasks",
    "query": "deadline < '\''today'\'' AND status != '\''done'\'' AND status != '\''archived'\''"
  }'
```

### List saved queries

```bash
curl -X GET https://your-server.com/saved-queries \
  -H "Authorization: Bearer $TOKEN"
```

### Update a saved query

```bash
curl -X PUT https://your-server.com/saved-queries/{queryId} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Overdue & Urgent",
    "query": "(deadline < '\''today'\'' OR tags = '\''urgent'\'') AND status != '\''done'\''"
  }'
```

### Delete a saved query

```bash
curl -X DELETE https://your-server.com/saved-queries/{queryId} \
  -H "Authorization: Bearer $TOKEN"
```

### Reorder saved queries

```bash
curl -X PUT https://your-server.com/saved-queries/reorder \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["query-id-1", "query-id-2", "query-id-3"]
  }'
```

### Useful saved queries

| Name | Query |
|------|-------|
| Overdue | `deadline < 'today' AND status != 'done'` |
| Due this week | `deadline BETWEEN 'today' AND '+7d' AND status != 'done'` |
| Recently active | `updated_at >= '-7d' AND status IN ('todo', 'in-progress')` |
| Unplanned | `deadline IS NULL AND status = 'todo'` |
| Urgent items | `(deadline <= 'today' OR tags = 'urgent') AND status != 'done'` |
