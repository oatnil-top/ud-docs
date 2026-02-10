---
sidebar_position: 13
---

# Tags and Custom Fields

## What are Tags and Custom Fields?

Tags are lightweight labels you add to tasks for quick categorization and filtering. Custom fields let you define structured data on tasks - like a "Priority" dropdown or an "Assigned To" user picker. Together, they make your task system flexible enough to fit any workflow.

## Tags

### How Tags Work
Tags are simple text labels attached to tasks. They're created automatically when you first use them - no setup required.

- **Type a hashtag** - Write `#urgent` in a task title and the tag is extracted automatically
- **Pick from existing tags** - Use the tag picker to select from tags you've used before
- **Autocomplete** - Start typing and see suggestions from your existing tags
- **Optional colors** - Assign a hex color to any tag for visual distinction

### Using Tags

#### Adding Tags to Tasks
- Type `#tagname` directly in the task title (inline hashtag parsing)
- Use the tag picker on the task detail page
- Select from autocomplete suggestions as you type

#### Filtering by Tags
Tags are a powerful way to focus your view:
- Click any tag badge to filter your task list
- Use tags in search and kanban views
- Combine tag filters with other criteria

#### Managing Tags
Visit the **Tags page** to see all your tags:
- **Two-column layout** - Tag list on the left, tasks for the selected tag on the right
- **Usage counts** - See how many tasks use each tag
- **Delete unused tags** - Remove tags with zero usage

#### Batch Operations
Select multiple tasks and add or remove tags in bulk - great for reorganizing your task categories.

### Tag Details
- Tags are unique per user
- Usage counts update automatically when tasks are created, updated, or deleted
- Tags with zero usage can be deleted; tags in use cannot
- Tags persist even after removing them from all tasks (until you delete them)

## Custom Fields

### What are Custom Fields?
Custom fields let you add structured data to tasks beyond the standard title, description, and status. Define exactly the fields your workflow needs.

### Field Types

| Type | Description | Example |
|------|-------------|---------|
| **Text** | Free-form text input | "Meeting notes", "Location" |
| **Number** | Numeric values | "Story points", "Estimated hours" |
| **Select** | Dropdown with predefined options | "Priority: Low/Medium/High" |
| **Checkbox** | True/false toggle | "Reviewed", "Approved" |
| **User** | Dropdown of workspace members | "Assigned to", "Reviewer" |
| **Datetime** | Date and time picker | "Due date", "Review date" |
| **Array** | Multiple values | "Related items", "Dependencies" |

### Creating Custom Fields
1. Go to the **Custom Fields** page
2. Click to create a new field
3. Choose a field type from the visual type selector
4. Set a name and display label
5. Configure options (for select fields, define the dropdown choices)
6. Optionally scope the field to specific tags

### Tag-Based Scoping
Custom fields can apply to all tasks or only tasks with specific tags:
- **No tag selector** - Field appears on every task
- **With tag selector** - Field only appears on tasks that have all the specified tags

This is powerful for workflow-specific fields. For example, a "Sprint Number" field that only shows on tasks tagged `#engineering`.

### Select Field Sources
Select (dropdown) fields can pull their options from different sources:
- **Static values** - A fixed list you define (e.g., Low, Medium, High)
- **Users** - Workspace members
- **Tags** - Your existing tags
- **Statuses** - Task statuses
- **Task IDs** - Reference other tasks

### Editing Custom Field Values
Custom field values are edited inline on the task detail page. Click the field value to edit it directly - no need to open a separate form.

## Tips for Success

1. **Start with tags** - Tags are simple and require no setup. Add them to tasks as you go and patterns will emerge naturally

2. **Use hashtags in titles** - Typing `#meeting` in a task title is the fastest way to tag

3. **Create fields for repeated data** - If you find yourself writing the same kind of note on many tasks, create a custom field for it

4. **Scope fields with tags** - Don't clutter every task with fields that only apply to certain workflows

5. **Review your tags regularly** - Visit the Tags page to clean up unused tags and see which categories are most active

## How Tags and Custom Fields Work with Other Features

### With Tasks
Tags and custom fields are core task metadata. They appear on task detail pages and can be used for filtering and searching.

### With Kanban Boards
Kanban column conditions can filter on custom field values. Kanban actions can automatically set custom field values when tasks move between columns.

### With Search
Filter and search tasks by tags and custom field values for powerful, flexible queries.

## Getting Started

1. **Add tags to a few tasks** - Try typing `#important` or `#project-name` in task titles
2. **Browse the Tags page** - See your tags organized with usage counts
3. **Create your first custom field** - Try a "Priority" select field with Low, Medium, and High options
4. **Experiment with scoping** - Create a field that only appears on tasks with a specific tag
