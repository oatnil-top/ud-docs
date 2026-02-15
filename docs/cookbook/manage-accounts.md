---
title: Manage Payment Accounts
sidebar_position: 22
---

# Manage Payment Accounts

Track different payment methods — credit cards, bank accounts, cash, etc.

## curl

### Create an account

```bash
curl -X POST https://your-server.com/account \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chase Visa",
    "type": "credit_card",
    "currency": "USD"
  }'
```

### List all accounts

```bash
curl -X GET https://your-server.com/account \
  -H "Authorization: Bearer $TOKEN"
```

### Get account details

```bash
curl -X GET https://your-server.com/account/{accountId} \
  -H "Authorization: Bearer $TOKEN"
```

### Update an account

```bash
curl -X PUT https://your-server.com/account/{accountId} \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Chase Visa (Primary)"
  }'
```

### Delete an account

```bash
curl -X DELETE https://your-server.com/account/{accountId} \
  -H "Authorization: Bearer $TOKEN"
```
