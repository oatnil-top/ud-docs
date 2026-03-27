---
title: 可视化数据库结构
sidebar_position: 20
---

# 使用数据流图可视化数据库结构

将运行中的 PostgreSQL 数据库转换为 UnDercontrol 中的交互式数据流图。本指南以 Keycloak 数据库为例。

## 概览

```
PostgreSQL ──(psql: \l \dn \c \d)──► schema 文件 ──(AI 生成 / JSON 导入)──► 数据流图
```

## 前提条件

在 macOS 上安装 `psql`（无需安装完整的 PostgreSQL 服务器）：

```bash
brew install libpq
```

## 第一步：探索数据库

连接到 PostgreSQL 实例：

```bash
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak
```

然后探索数据库结构：

```sql
\l          -- 列出所有数据库
\c keycloak -- 连接到目标数据库
\dn         -- 列出 schema
```

## 第二步：导出表定义

一次性生成所有表的 `\d` 命令并捕获输出：

```bash
# 为所有表生成 \d 命令
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak -t -A \
  -c "SELECT '\d ' || tablename FROM pg_tables WHERE schemaname='public'" \
  > /tmp/describe-all.sql

# 执行并捕获输出
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak \
  -f /tmp/describe-all.sql > /tmp/keycloak-schema.txt
```

### 筛选子集

对于大型数据库（Keycloak 有 90+ 张表），可以按领域筛选：

```bash
PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak -t -A \
  -c "SELECT '\d ' || tablename FROM pg_tables WHERE schemaname='public' AND tablename LIKE '%user%'" \
  > /tmp/describe-all.sql

PGPASSWORD=keycloak psql -h localhost -p 5432 -U keycloak -d keycloak \
  -f /tmp/describe-all.sql > /tmp/keycloak-schema.txt
```

输出文件包含每张表的列、类型、索引和外键约束。

## 第三步：导入数据流图

从任务附件中打开数据流编辑器（"新建数据流"），或打开已有的 `.dataflow.png` 资源。

### 方式 A：AI 生成（推荐）

最快的方式 — AI 直接解析 psql 输出，生成节点和连线。

1. 点击工具栏中的 **AI 生成**按钮（闪光图标）
2. 选择 AI 提供商
3. 将 `/tmp/keycloak-schema.txt` 的内容粘贴到输入框
4. 点击**生成**

AI 会为每张表创建一个节点，并自动为外键关系绘制连线。节点按拓扑结构排列 — 父表在上，子表在下。

### 方式 B：外部 AI + JSON 导入

如果没有在 UnDercontrol 中配置 AI 提供商，可以使用外部 AI 生成 JSON。

1. 点击工具栏中的**复制提示词** — 将系统提示词复制到剪贴板
2. 将提示词和 schema 文件内容一起粘贴到任意 AI 工具（ChatGPT、Claude 等）
3. AI 返回数据流格式的 JSON
4. 点击工具栏中的**导入图表**，粘贴 JSON

JSON 格式如下：

```json
{
  "nodes": [
    {
      "name": "user_entity",
      "fields": {
        "id": "uuid",
        "email": "alice@example.com",
        "email_verified": false,
        "enabled": true,
        "realm_id": "master",
        "username": "admin"
      }
    },
    {
      "name": "credential",
      "fields": {
        "id": "uuid",
        "user_id": "uuid",
        "type": "password",
        "created_date": 1700000000,
        "secret_data": "...",
        "credential_data": "..."
      }
    }
  ],
  "pipes": [
    {
      "from_node": "user_entity",
      "from_field": "id",
      "to_node": "credential",
      "to_field": "user_id"
    }
  ]
}
```

**JSON 关键规则：**
- `fields` 的值是示例数据，用于指示类型（字符串、数字、布尔值）
- `from_node`/`to_node` 必须与节点 `name` 完全匹配
- `from_field`/`to_field` 必须与字段名完全匹配

### 方式 C：逐表导入

手动逐个导入表：

1. 点击工具栏中的**导入 JSON**
2. 输入表名（例如 `user_entity`）
3. 粘贴一行示例数据的 JSON
4. 对每张表重复操作，然后通过拖拽字段连接点来绘制连线

## 第四步：完善图表

导入后：

- **框选节点** — 在画布上拖拽即可框选，可以一起移动或删除
- **绘制连线** — 从输出连接点拖拽到输入连接点
- **右键点击**节点可以复制或删除
- **继续导入** — 导入操作始终追加到现有图表，可以从多个来源逐步构建
- **保存**或**保存并退出** — 作为 `.dataflow.png` 资源附加到任务

## 合并多个图表

可以将多个 schema 文件导入同一个图表。每次导入的节点会追加到现有图表的右侧。适用于可视化跨数据库或跨服务的关系。

## 快速参考

| psql 命令 | 用途 |
|-----------|------|
| `\l` | 列出所有数据库 |
| `\dn` | 列出当前数据库的 schema |
| `\c dbname` | 连接到数据库 |
| `\d tablename` | 显示列、类型、索引和外键 |

## 提示

- **从小处开始** — 先选择一个领域子集（例如 `WHERE tablename LIKE '%user%'`）
- **`\d` 显示外键** — 输出中的外键约束直接对应图表中的连线
- **连线 = 外键** — 每条连线连接两个节点中的字段，反映外键关系
- **缩放查看** — 大型图表可以通过滚轮缩小查看全部节点（支持 85+ 张表）
