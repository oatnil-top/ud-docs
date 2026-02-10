---
sidebar_position: 2
---

# Backup and Export

## What is Backup and Export?

UnderControl's backup system protects your data by creating compressed copies of your database that are stored securely in the cloud. You can trigger backups manually or let them run automatically on a schedule. When you need your data, download a backup anytime.

:::info
The backup system works with **SQLite deployments only**. If you're using PostgreSQL, use PostgreSQL's native backup tools (pg_dump, etc.) instead.
:::

## Main Features

### Manual Backups
Trigger a backup anytime you want a snapshot of your data:
1. Go to the backup management page (admin panel)
2. Click **Trigger Backup**
3. Optionally set a custom filename
4. The backup starts immediately in the background
5. Download it when it's ready

### Scheduled Backups
Set up automatic daily backups so you never have to think about it:
- **Default schedule** - Daily at midnight
- **Configurable** - Change the schedule using cron expressions
- **Retention** - Old backups are automatically cleaned up after a set number of days (default: 30 days)

### Backup History
See all your backups in one place:
- **Status** - Pending, running, completed, or failed
- **File size** - How large each backup is
- **Duration** - How long the backup took to process
- **Download** - Get a secure download link for any completed backup

### Backup Downloads
Completed backups are available for download via secure, time-limited links:
- Links expire after **1 hour** for security
- Files are downloaded as **ZIP archives** containing your SQLite database files
- Generate a new download link anytime for completed backups

## How Backups Work

When you trigger a backup (manually or via schedule):

1. **Queued** - The backup job is created and queued for processing
2. **Processing** - A background worker finds all SQLite database files, creates a ZIP archive
3. **Uploaded** - The ZIP file is uploaded to secure S3 storage
4. **Complete** - The backup is ready for download

The entire process happens in the background - you get an instant response and can continue working while the backup runs.

## What Gets Backed Up

The backup system creates a ZIP archive of all SQLite database files in your data directory. This includes:
- Your main application database
- All user data, tasks, expenses, budgets, and accounts

The backup file is named `data-backup-{timestamp}.zip` by default, or you can specify a custom name.

## Backup Statistics

The system tracks helpful statistics:
- **Total backups** created
- **Success rate** of backup jobs
- **Average duration** per backup
- **Total data** backed up over time

## Data Export

### Account Data Export
Export your account data for external use or record-keeping. The export generates a downloadable file with your account information.

### Task Export (Coming Soon)
A planned feature for exporting tasks as structured packages including:
- Task details in markdown format
- Associated notes
- Attached resources and files

## Configuration

Backup settings are configured through environment variables or the admin panel:

| Setting | Default | Description |
|---------|---------|-------------|
| Backup enabled | `false` | Enable or disable scheduled backups |
| Schedule | `0 0 * * *` | Cron expression (default: daily at midnight) |
| Retention days | `30` | How long to keep backup records |
| Data path | `./data` | Directory containing SQLite files |

## Tips for Success

1. **Enable scheduled backups** - Set up automatic daily backups so your data is always protected

2. **Download periodically** - Keep a local copy of your backups in addition to cloud storage

3. **Monitor backup status** - Check the backup history occasionally to make sure scheduled backups are completing successfully

4. **Set appropriate retention** - 30 days is a good default, but adjust based on your needs and storage capacity

5. **Test your backups** - Periodically download a backup and verify the contents to make sure everything is working correctly

## How Backups Work with Other Features

### With the Queue System
Backups are processed as background queue tasks, so they don't slow down your regular usage of the application.

### With Resource Storage
Backup files are stored using the same secure S3 storage system as your uploaded resources, with presigned URLs for secure downloads.

### With Notifications
You'll receive a notification when a backup completes or fails, so you always know the status.

## Getting Started

1. **Check your deployment** - Make sure you're running SQLite (not PostgreSQL)
2. **Enable scheduled backups** - Turn on automatic backups in the admin system configuration
3. **Trigger a manual backup** - Create your first backup to verify everything works
4. **Download and verify** - Download the backup ZIP and confirm it contains your data
