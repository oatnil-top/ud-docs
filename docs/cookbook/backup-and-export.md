---
title: Backup and Export Data
sidebar_position: 26
---

# Backup and Export Data

Trigger backups and download your data.

## curl

### Trigger a manual backup

```bash
curl -X POST https://your-server.com/backup/trigger \
  -H "Authorization: Bearer $TOKEN"
```

**Response:**

```json
{
  "job_id": "backup-job-id-..."
}
```

### Check backup status

```bash
curl -X GET https://your-server.com/backup/status/{jobId} \
  -H "Authorization: Bearer $TOKEN"
```

### List all backups

```bash
curl -X GET https://your-server.com/backup/list \
  -H "Authorization: Bearer $TOKEN"
```

### Download a backup

```bash
curl -X GET https://your-server.com/backup/download/{jobId} \
  -H "Authorization: Bearer $TOKEN" \
  -o backup.zip
```

### Full backup workflow

```bash
# 1. Trigger backup
JOB_ID=$(curl -s -X POST https://your-server.com/backup/trigger \
  -H "Authorization: Bearer $TOKEN" | jq -r '.job_id')

# 2. Wait for completion
sleep 10
curl -X GET https://your-server.com/backup/status/$JOB_ID \
  -H "Authorization: Bearer $TOKEN"

# 3. Download
curl -X GET https://your-server.com/backup/download/$JOB_ID \
  -H "Authorization: Bearer $TOKEN" \
  -o "backup-$(date +%Y%m%d).zip"
```
