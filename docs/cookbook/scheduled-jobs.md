---
title: Set Up Scheduled Jobs
sidebar_position: 28
---

# Set Up Scheduled Jobs

Automate recurring actions — periodic reports, cleanup, reminders.

## curl

### Create a scheduled job

```bash
curl -X POST https://your-server.com/scheduled-jobs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Weekly task cleanup",
    "cron": "0 9 * * MON",
    "action": "archive_done_tasks"
  }'
```

### List all scheduled jobs

```bash
curl -X GET https://your-server.com/scheduled-jobs \
  -H "Authorization: Bearer $TOKEN"
```

### Enable / disable a job

```bash
# Enable
curl -X POST https://your-server.com/scheduled-jobs/{jobId}/enable \
  -H "Authorization: Bearer $TOKEN"

# Disable
curl -X POST https://your-server.com/scheduled-jobs/{jobId}/disable \
  -H "Authorization: Bearer $TOKEN"
```

### Run a job immediately

```bash
curl -X POST https://your-server.com/scheduled-jobs/{jobId}/run-now \
  -H "Authorization: Bearer $TOKEN"
```

### View run history

```bash
curl -X GET https://your-server.com/scheduled-jobs/{jobId}/runs \
  -H "Authorization: Bearer $TOKEN"
```

### Delete a scheduled job

```bash
curl -X DELETE https://your-server.com/scheduled-jobs/{jobId} \
  -H "Authorization: Bearer $TOKEN"
```
