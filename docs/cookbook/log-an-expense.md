---
title: Log an Expense
sidebar_position: 20
---

# Log an Expense

Record spending manually, from a receipt image, or with plain text.

## curl

### Create an expense manually

```bash
curl -X POST https://your-server.com/expense \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lunch at Starbucks",
    "amount": 15.50,
    "currency": "USD",
    "budget_id": "{budgetId}",
    "account_id": "{accountId}",
    "expense_date": "2026-02-15T12:00:00Z"
  }'
```

### Create expense from plain text (AI)

```bash
curl -X POST https://your-server.com/expense-from-text \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Lunch at Starbucks $15.50"
  }'
```

### List expenses

```bash
curl -X GET https://your-server.com/expense \
  -H "Authorization: Bearer $TOKEN"
```

### Get expense details

```bash
curl -X GET https://your-server.com/expense/{expenseId} \
  -H "Authorization: Bearer $TOKEN"
```

### Update an expense

```bash
curl -X PUT https://your-server.com/expense/{expenseId} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Coffee at Starbucks",
    "amount": 12.00
  }'
```

### Delete an expense

```bash
curl -X DELETE https://your-server.com/expense/{expenseId} \
  -H "Authorization: Bearer $TOKEN"
```
