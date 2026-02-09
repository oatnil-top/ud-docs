---
title: Saved Queries
description: Save frequently-used queries and run them anytime with one click
sidebar_position: 7
---

# Saved Queries

Saved Queries let you save frequently-used task queries so you can run them anytime with a single click. Instead of typing the same query string over and over, save it once, give it a descriptive name, and access it from the Saved Queries page.

---

## Getting Started

Navigate to the **Saved Queries** page from the sidebar. If you haven't saved any queries yet, you'll see an empty state prompting you to create your first one.

:::tip
You can also save a query directly from **Advanced Search** — after building a query, save it for quick access later.
:::

---

## Creating a Saved Query

Click the **Save Query** button in the top-right corner of the Saved Queries page. A dialog will appear with two fields:

- **Query Name** — A descriptive name for your query (e.g., "Overdue work tasks")
- **Query String** — The query expression to execute (e.g., `status = 'todo' AND deadline < 'today'`)

Fill in both fields and click **Save**. Your new query will appear at the top of the list.

### Query String Examples

```
status = 'todo' AND deadline < 'today'
```

```
status = 'in-progress' AND tags = 'work'
```

```
title ILIKE '%report%' AND status != 'done'
```

For full query syntax details, see the [Query Syntax](./query-syntax) documentation.

---

## Managing Saved Queries

Each saved query has a context menu (the **⋯** button that appears on hover) with the following actions:

### Edit

Update the query name or query string. Click **Edit Query** from the context menu to open the edit dialog. Modify the fields and click **Save** to apply changes.

### Delete

Remove a saved query you no longer need. Click **Delete Query** from the context menu. A confirmation dialog will ask you to confirm before the query is permanently deleted.

---

## Pinning

Pin your most important queries to keep them at the top of the list.

- **Pin**: Click the **Pin Query** option in the context menu. Pinned queries display a pin icon next to their name and always appear above unpinned queries.
- **Unpin**: Click **Unpin Query** from the context menu to remove the pin.

Pinned queries are sorted to the top of the list, making your most-used queries always accessible at a glance.

---

## Reordering

Drag and drop saved queries to reorder them. The order is persisted so your queries stay organized exactly how you want them. Combined with pinning, this gives you full control over your query list layout.

---

## Executing Queries

Click on any saved query to expand it and see the results inline. The query executes automatically when you expand it for the first time.

- **Result count** — A count badge appears next to the query name showing the total number of matching tasks
- **Task rows** — Each matching task is displayed with its status icon, title, tags, and deadline
- **Expand task details** — Click on a task row to expand it and view the full description and notes

### Load More

Results are paginated at 20 items per page. If there are more results, a **Load More** button appears at the bottom along with a "Showing X of Y" counter. Click it to load the next page of results.

---

## Actions on Results

When viewing query results, you have several actions available:

### Open in Advanced Search

Click **Open in Advanced Search** from the context menu to navigate to the Advanced Search page with the query string pre-filled. This is useful when you want to further refine the results or explore related tasks.

### Copy Query String

Click **Copy Query** from the context menu to copy the query string to your clipboard. You can then paste it into the CLI, share it with teammates, or use it elsewhere.

### Open Task in New Tab

When viewing expanded task results, click the **Open in New Tab** link to open the full task detail page in a new browser tab.

---

## Use Cases

Here are some practical examples of saved queries:

| Query Name | Query String | Purpose |
|---|---|---|
| Overdue Tasks | `status != 'done' AND deadline < 'today'` | Find tasks past their deadline |
| Today's Focus | `status = 'todo' AND deadline = 'today'` | Tasks due today |
| In Progress | `status = 'in-progress'` | All actively worked-on tasks |
| Work Tasks | `tags = 'work' AND status != 'done'` | Open tasks tagged "work" |
| This Week | `deadline BETWEEN 'today' AND '+7d'` | Tasks due within a week |
| Stale Tasks | `status = 'stale'` | Tasks that haven't been updated |
| Quick Wins | `tags = 'quick' AND status = 'todo'` | Small tasks to tackle when you have spare time |

---

## Tips

- **Use descriptive names** — Name your queries by purpose rather than by syntax (e.g., "Sprint Review" instead of "status done this week")
- **Pin your daily queries** — Pin the 2-3 queries you check every day for instant access
- **Combine with deadlines** — Queries using deadline filters like `'today'`, `'+7d'`, and `'this week'` are especially useful as saved queries since they always return fresh, relevant results
- **Keep it focused** — Each saved query should serve a specific purpose. Create multiple focused queries rather than one complex catch-all
- **Use for standups** — Save a query like `status = 'in-progress'` to quickly review active tasks during daily standups

---

## Related

- [Query Syntax](./query-syntax) — Full reference for the query language
- [CLI Reference](./cli) — Use `ud task query` to run queries from the terminal
