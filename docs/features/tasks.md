---
sidebar_position: 6
---

# Task Management

## What are Tasks?

Tasks are the core of UnderControl - your command center for tracking everything you need to do. Whether it's a quick to-do, a long-running project, or a recurring habit, tasks help you stay organized with multiple views, smart filtering, notes, file attachments, and collaboration tools.

## Task Statuses

Every task has one of six statuses to reflect where it stands:

- **Todo** - Ready to be worked on
- **In Progress** - Currently being worked on
- **Pending** - Waiting on something or someone
- **Stale** - Hasn't been touched in a while
- **Done** - Completed
- **Archived** - Finished and filed away

## Multiple Views

UnderControl gives you several ways to look at your tasks:

- **List View** - A traditional, organized task list with customizable sections
- **Kanban Board** - Visual columns you can drag tasks between (see [Kanban Boards](./kanban.md))
- **Calendar View** - See tasks on a timeline by deadline
- **Tree View** - Explore parent-child task hierarchies
- **Graph View** - Visualize relationships between linked tasks
- **Mindmap View** - A mind-mapping layout for brainstorming
- **Trash View** - See and restore deleted tasks

## Creating and Managing Tasks

### Creating a Task
1. Click the add button on the task list page
2. Enter a title (required) and optional details like description, tags, and deadline
3. The task appears instantly in your list

### Editing Tasks
Open any task to update its title, description (supports markdown), status, tags, deadline, and custom fields. Changes save automatically.

### Pinning Tasks
Pin important tasks to the top of your list for quick access. Pinned tasks stay visible regardless of filters.

### Deleting and Restoring
When you delete a task, it moves to the trash. You can restore it anytime or permanently delete it from the Trash view.

## Task Notes

Add notes to any task to track progress, decisions, or context. Notes support markdown formatting and keep a full edit history - you can revert any note to a previous version if needed.

## Task Relationships

### Derived Tasks (Parent-Child)
Create a new task from an existing one to build hierarchies. The child task links back to its parent, making it easy to break big projects into smaller steps.

### Linked Tasks
Link related tasks together with bidirectional connections. Use the Graph view to visualize how your tasks relate to each other.

## Filtering and Search

### Quick Filters
Filter your task list by:
- **Status** - Show only specific statuses
- **Tags** - Filter by one or more tags
- **Deadline** - Overdue, today, this week, next week, or no deadline

### Advanced Queries
Use a SQL-like query language for powerful filtering:
- `status = 'todo' AND deadline < '2025-06-01'`
- `tag:work = 'true' AND cf.priority = 'high'`

### Natural Language Search
Type queries in plain English like "show me overdue tasks tagged with work" and the AI translates it into a structured filter.

## Sharing and Collaboration

### Share Links
Generate a public link to any task with an optional expiration date. Great for sharing task details with people outside your team.

### Group Sharing
Share tasks with a group for team collaboration. You control whether group members get read-only or read-write access.

## Recurring Tasks

Set up tasks that create themselves automatically on a schedule. Choose from presets like daily, weekly, or monthly - or write a custom CRON expression for precise control (e.g., every weekday at 9 AM).

## Check-in System

Use check-ins to track recurring activities like habits or regular reviews. Each check-in increments a counter and records the timestamp, giving you a simple way to monitor consistency.

## File Attachments

Attach images, documents, diagrams, or any file to your tasks. Attachments are accessible from the task detail page and can optionally be included when sharing tasks.

## CLI Commands

Manage tasks directly from your terminal:

```bash
ud task list                    # List your tasks
ud task create "My new task"    # Create a task
ud task view <id>               # View task details
ud task edit <id>               # Edit in your $EDITOR
ud task done <id>               # Mark as done
ud task delete <id>             # Delete a task

# Notes
ud task note add <id> "Note"    # Add a note
ud task note list <id>          # List notes

# Relationships
ud task link <id> <other-id>    # Link two tasks

# Advanced
ud task query "status = 'todo'" # Structured query
ud task nlquery "overdue tasks" # Natural language query
ud task apply -f task.md        # Create/update from markdown file
```

## Tips for Success

1. **Use tags consistently** - Develop a tagging system (like `work`, `personal`, `urgent`) and stick to it for effective filtering
2. **Try different views** - List view is great for daily work, but Kanban and Calendar views can reveal different insights
3. **Break down big tasks** - Use derived tasks to split large projects into manageable pieces
4. **Set deadlines thoughtfully** - Deadlines help with prioritization, especially when combined with the Calendar view
5. **Add notes as you go** - Notes with edit history make it easy to track decisions and progress over time

## How Tasks Work with Other Features

### With Kanban Boards
Tasks appear as cards on kanban boards. Dragging a card between columns automatically updates its status.

### With Budgets and Expenses
Expenses can reference tasks, letting you connect spending to specific work items.

### With Scheduled Jobs
Set up recurring jobs to automatically create tasks on a schedule - perfect for daily standups, weekly reviews, or monthly reports.

### With the AI Assistant
Use natural language to create tasks, query your task list, or generate tasks from images and text.

## Getting Started

1. **Create your first task** - Click the add button and give it a title
2. **Organize with tags** - Add tags to categorize your tasks
3. **Explore views** - Try the List, Kanban, and Calendar views to find what works for you
4. **Set up recurring tasks** - Automate repetitive tasks with scheduled jobs
