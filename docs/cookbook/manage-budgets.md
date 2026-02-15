---
title: Manage Budgets
sidebar_position: 21
---

# Manage Budgets

Create budgets, add plans, and track spending.

## curl

### Create a budget

```bash
curl -X POST https://your-server.com/budget \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Groceries",
    "amount": 500,
    "currency": "USD",
    "frequency": "monthly",
    "start_date": "2026-01-01T00:00:00Z"
  }'
```

### List all budgets

```bash
curl -X GET https://your-server.com/budget \
  -H "Authorization: Bearer $TOKEN"
```

### Get budget with expenses

```bash
curl -X GET https://your-server.com/budget-with-expenses/{budgetId} \
  -H "Authorization: Bearer $TOKEN"
```

### Update a budget

```bash
curl -X PATCH https://your-server.com/budget/{budgetId} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Groceries & Household"
  }'
```

### Add a new plan (change allocation)

```bash
curl -X POST https://your-server.com/budget/{budgetId}/plans \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 600,
    "frequency": "monthly",
    "start_date": "2026-03-01T00:00:00Z"
  }'
```

### Add a one-time adjustment

```bash
curl -X POST https://your-server.com/budget/{budgetId}/adjustments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "reason": "Bonus budget for holiday shopping",
    "date": "2026-02-15T00:00:00Z"
  }'
```

### View budget ledger

```bash
curl -X GET https://your-server.com/budget/{budgetId}/ledger \
  -H "Authorization: Bearer $TOKEN"
```

### Delete a budget

```bash
curl -X DELETE https://your-server.com/budget/{budgetId} \
  -H "Authorization: Bearer $TOKEN"
```
