---
title: CLI 命令参考
description: UnderControl 命令行工具完整参考手册
sidebar_position: 4
---

# CLI 命令参考

UnderControl CLI (`ud`) 是一个用于从终端管理任务的命令行工具。支持直接命令和带有 vim 风格快捷键的交互式 TUI 模式。

## 安装

### 下载

下载适合你平台的版本：

| 平台 | 文件名 |
|------|--------|
| macOS (Apple Silicon) | `ud_x.x.x_darwin_arm64.tar.gz` |
| macOS (Intel) | `ud_x.x.x_darwin_amd64.tar.gz` |
| Linux (x64) | `ud_x.x.x_linux_amd64.tar.gz` |
| Linux (ARM64) | `ud_x.x.x_linux_arm64.tar.gz` |
| Windows | `ud_x.x.x_windows_amd64.zip` |

### 安装步骤

**macOS / Linux：**

```bash
# 解压
tar -xzf ud_x.x.x_darwin_arm64.tar.gz

# 移动到 PATH
sudo mv ud /usr/local/bin/ud

# 验证
ud --version
```

**Windows：**

1. 解压 `.zip` 文件
2. 将 `ud.exe` 移动到 PATH 目录
3. 或将解压目录添加到系统 PATH

---

## 认证

### 登录

```bash
ud login
```

系统会提示输入：
- **服务器地址**：你的 UnderControl 服务器（如 `https://api.undercontrol.app`）
- **用户名**：账户邮箱
- **密码**：账户密码

登录信息保存在 `~/.config/ud/config.yaml`。

### 多账户支持

CLI 支持 kubectl 风格的上下文管理多个账户。详见 [CLI 多上下文认证](./cli-auth-context)。

```bash
# 列出上下文
ud config get-contexts

# 切换上下文
ud config use-context work

# 登录到指定上下文
ud login --context work --api-url https://ud.company.com
```

---

## 资源命令（kubectl 风格）

CLI 支持 kubectl 风格的顶层动词来管理资源。这是**推荐**的交互方式。

### 获取资源

```bash
ud get task [id] [--status <status>]
```

以表格形式显示一个或多个任务。

**选项：**
- `--status`：按状态过滤（`todo`、`in-progress`、`pending`、`stale`、`done`、`archived`）

**示例：**
```bash
# 列出所有任务
ud get task

# 只列出待办任务
ud get task --status todo

# 以表格形式显示单个任务
ud get task abc123
```

### 查看资源详情

```bash
ud describe task <id>
```

显示任务的详细信息，包括标题、描述、状态、标签、截止日期、时间戳、关联任务、附件和备注。

**示例：**
```bash
# 查看完整任务详情
ud describe task abc123

# 使用短前缀
ud describe task 3de
```

:::tip 短 ID 支持
所有接受任务 ID 的命令都支持**前缀匹配**。你可以使用 `get task` 显示的 8 位短 ID，或者更短的前缀（只要唯一即可）。

```bash
ud describe task 3de9f82b    # 列表中的完整短 ID
ud describe task 3de         # 更短的前缀（如果唯一）
ud describe task 3de9f82b-fc49-4e84-b288-9ae3174f69ae  # 完整 UUID 也可以
```

如果前缀匹配多个任务，会显示错误并列出匹配项：
```
Error: ambiguous ID prefix '3' matches 2 tasks:
  3de9f82b (任务标题一)
  3fbf7c24 (任务标题二)
Please use a longer prefix
```
:::

### 从文件应用资源

```bash
ud apply -f <file>
ud apply -f -  # 从标准输入读取
```

从带有 YAML frontmatter 的 Markdown 文件创建或更新资源。文件是唯一的数据源：
- 如果 frontmatter 中有 `id` → **更新**现有任务
- 如果没有 `id` → **创建**新任务

目前支持 `.md` 文件。YAML 支持将在未来版本中添加。

**标志：**
- `-f, --file`：要应用的文件（必需，使用 `-` 从标准输入读取）

**文件格式：**
```markdown
---
id: abc123          # 可选 - 如果存在则更新现有任务
title: 任务标题
status: in-progress
tags:
  - work
  - urgent
deadline: 2025-03-15
---

任务描述内容在这里。
支持多行。
```

**支持的字段：**
| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | 字符串 | 任务 ID（可选 — 存在则更新，不存在则创建） |
| `title` | 字符串 | 任务标题（创建新任务时必需） |
| `status` | 字符串 | 任务状态 |
| `tags` | 数组 | 标签列表 |
| `deadline` | 字符串 | 截止日期（YYYY-MM-DD 或 ISO 8601） |
| (正文) | 字符串 | 成为任务描述 |

**有效的状态值：**
- `todo` - 未开始
- `in-progress` - 进行中
- `pending` - 等待中
- `stale` - 已停滞
- `done` - 已完成
- `archived` - 已归档

**示例：**
```bash
# 创建新任务（文件中无 id）
ud apply -f task.md

# 更新现有任务（文件中有 id）
ud apply -f task.md

# 从标准输入
cat task.md | ud apply -f -

# 快速从标准输入创建
echo '---
title: 新任务
status: todo
---
描述内容。' | ud apply -f -
```

**截止日期格式：**
```yaml
# 仅日期（UTC 午夜）
deadline: 2025-03-15
deadline: 2025/03/15

# 带时间
deadline: 2025-03-15T14:30:00
deadline: 2025-03-15T14:30:00Z
deadline: 2025-03-15T14:30:00+08:00
```

### 删除资源

```bash
ud delete task <id>
```

按 ID 删除任务。

**示例：**
```bash
ud delete task abc123
ud delete task 3de9f82b
```

---

## 任务命令

:::caution 已弃用的命令
以下 `ud task` 子命令已**弃用**，将在未来版本中移除。它们仍然可用，但会打印弃用警告。请使用 kubectl 风格的命令代替：

| 已弃用 | 替代命令 |
|--------|----------|
| `ud task list` | `ud get task` |
| `ud task view <id>` | `ud describe task <id>` |
| `ud task apply -f <file>` | `ud apply -f <file>` |
| `ud task delete <id>` | `ud delete task <id>` |
:::

### 创建任务

```bash
ud task create <title> [flags]
ud task create -f <file>
```

**标志：**
- `-d, --description`：任务描述
- `-s, --status`：初始状态（默认：`todo`）
- `-f, --file`：从文件创建（第一行为标题，其余为描述）

**示例：**
```bash
# 简单任务
ud task create "修复登录 bug"

# 带描述
ud task create "重构 API" -d "更新到 v2 接口"

# 带初始状态
ud task create "审查 PR" -s in-progress

# 从文件创建
ud task create -f requirements.md
```

**`-f` 文件格式：**
```markdown
任务标题在这里
文件的其余部分
成为任务描述。
```

### 标记任务完成

```bash
ud task done <id>
```

快捷命令，将任务状态设置为 `done`。

### 编辑任务

```bash
ud task edit <id>
```

在 `$EDITOR` 中打开任务（默认 `vi`）。文件格式：
- 第一行：标题
- 空行
- 其余：描述

### 查询任务

```bash
ud task query "<query>" [flags]
```

使用类 SQL 语法查询任务。

**标志：**
- `--page`：页码（默认：1）
- `--limit`：每页数量（默认：50）
- `--sort`：排序字段（`title`、`deadline`、`created_at`、`updated_at`）
- `--order`：排序方向（`asc`、`desc`）

**示例：**
```bash
# 查找待办任务
ud task query "status = 'todo'"

# 按标题搜索
ud task query "title ILIKE '%api%'"

# 查找本周到期的任务
ud task query "deadline BETWEEN 'today' AND '+7d'"

# 查找带标签的任务
ud task query "tags = 'urgent'"

# 复杂查询
ud task query "(status = 'todo' OR status = 'in-progress') AND deadline <= 'today'"
```

### 自然语言查询

```bash
ud task nlquery "<自然语言>"
ud task nl "<自然语言>"  # 别名
```

使用自然语言查询任务，由 AI 翻译为结构化查询。

**示例：**
```bash
ud task nlquery "显示逾期的任务"
ud task nlquery "标记为 work 但未完成的任务"
ud task nlquery "查找标题包含报告的任务"
ud task nlquery "上周创建的任务"
```

---

## 备注命令

备注功能允许你为任务添加评论、进度更新和上下文信息。适用于跟踪工作历史和 AI 助手协作。

### 添加备注

```bash
ud task note add <task-id> "<内容>"
ud task note add <task-id> -f <文件>
echo "内容" | ud task note add <task-id> -
```

**标志：**
- `-f, --file`：从文件读取备注内容

**示例：**
```bash
# 添加行内备注
ud task note add abc123 "开始实现"

# 添加进度更新
ud task note add abc123 "✓ 认证中间件完成"

# 从文件添加
ud task note add abc123 -f progress.md

# 从标准输入添加
echo "审查完成" | ud task note add abc123 -
```

### 列出备注

```bash
ud task note list <task-id>
ud task note ls <task-id>  # 别名
```

**输出格式：**
```
[4223db11] 2025-01-31 11:08
✓ 认证中间件完成
---
[3150c5ce] 2025-01-31 10:45
开始实现
```

### 删除备注

```bash
ud task note delete <task-id> <note-id>
ud task note rm <task-id> <note-id>  # 别名
```

**示例：**
```bash
ud task note delete abc123 4223db11
```

### AI 助手工作流

备注功能实现了人机无缝协作：

```bash
# AI 从计划创建任务
ud task create -f plan.md
# Created task: abc12345

# 人类在界面审查，通过备注添加上下文

# AI 获取任务并记录进度
ud task view abc123
ud task note add abc123 "✓ 完成步骤 1：数据库模型"
ud task note add abc123 "✓ 完成步骤 2：API 接口"
ud task note add abc123 "⚠️ 阻塞：需要外部服务的 API 密钥"

# 人类看到进度，解除阻塞

# AI 继续并完成任务
ud task note add abc123 "✓ 所有步骤已完成"
ud task done abc123
```

---

## TUI 模式

不带参数运行 `ud` 进入交互式终端界面。

### 列表视图快捷键

| 按键 | 功能 |
|------|------|
| `j` / `k` | 上下移动 |
| `gg` | 跳到顶部 |
| `G` | 跳到底部 |
| `Enter` | 查看任务详情 |
| `i` | 创建新任务 |
| `e` | 编辑任务（使用 $EDITOR） |
| `x` | 切换任务状态 |
| `dd` | 删除任务 |
| `/` | 搜索 |
| `n` / `N` | 下一个/上一个搜索结果 |
| `r` | 刷新列表 |
| `f` | 打开文件选择器 |
| `q` | 退出 |
| `?` | 显示帮助 |

### 详情视图快捷键

| 按键 | 功能 |
|------|------|
| `j` / `k` | 滚动内容 |
| `x` | 切换任务状态 |
| `e` | 编辑任务 |
| `dd` | 删除任务 |
| `Esc` / `q` | 返回列表 |

### 文件选择器

在列表视图按 `f` 打开类似 fzf 的文件选择器：
- 模糊搜索当前目录文件
- 选择文件创建任务
- 第一行 = 标题，其余 = 描述
- 自动跳过二进制文件

---

## 配置命令

### 查看配置

```bash
ud config view
```

显示完整配置，令牌部分隐藏。

### 列出上下文

```bash
ud config get-contexts
```

### 切换上下文

```bash
ud config use-context <name>
```

### 显示当前上下文

```bash
ud config current-context
```

### 创建/更新上下文

```bash
ud config set-context <name> [flags]
```

**标志：**
- `--api-url`：API 服务器地址
- `--api-key`：API 密钥（用于 CI/CD）

### 删除上下文

```bash
ud config delete-context <name>
```

### 重命名上下文

```bash
ud config rename-context <旧名称> <新名称>
```

---

## 环境变量

| 变量 | 说明 |
|------|------|
| `UD_CONTEXT` | 覆盖当前上下文 |
| `UD_API_URL` | 覆盖 API 地址 |
| `UD_API_KEY` | 覆盖 API 密钥 |
| `UD_TOKEN` | 覆盖认证令牌 |
| `EDITOR` | 用于 `task edit` 命令的编辑器 |

**示例：**
```bash
# 单次命令使用不同上下文
UD_CONTEXT=staging ud task list

# 覆盖 API 地址
UD_API_URL=http://localhost:4000 ud task list

# 设置编辑器
export EDITOR=vim
```

---

## 常用工作流

### AI 助手集成

在项目根目录创建 `.claude/instructions.md` 或 `.cursorrules`：

```markdown
# 任务管理

使用 UnderControl CLI 管理项目任务：

- 列出任务：`ud get task`
- 查看任务详情：`ud describe task <id>`
- 创建任务：`ud task create "标题" -d "描述"`
- 完成任务：`ud task done <id>`
- 更新任务：`ud apply -f task.md`
- 删除任务：`ud delete task <id>`

在实现功能前，先查看相关任务获取上下文。
```

### 使用 Apply 批量更新

创建模板文件并应用到多个任务：

```bash
# 为每个任务创建状态更新模板
for id in abc123 def456 ghi789; do
  echo "---
id: $id
status: done
---" | ud apply -f -
done
```

### 导出和编辑工作流

```bash
# 查看任务，复制内容
ud describe task abc123

# 创建包含更新的 markdown 文件（包含 id 用于更新）
cat > update.md << 'EOF'
---
id: abc123
title: 更新后的标题
status: in-progress
tags:
  - reviewed
  - approved
---

更新后的描述，包含新需求。
EOF

# 应用更改
ud apply -f update.md
```

---

## 故障排除

### 登录失败

**问题：** `API error: Invalid credentials`

**解决方案：**
1. 验证用户名和密码
2. 检查服务器地址是否正确
3. 尝试通过网页登录验证账户

### 连接超时

**问题：** `connection timeout`

**解决方案：**
1. 检查网络连接
2. 验证服务器地址可访问
3. 检查防火墙设置

### 令牌过期

**问题：** `API error: Token expired`

**解决方案：** 运行 `ud login` 重新认证。

### 编辑器不工作

**问题：** `task edit` 没有效果

**解决方案：** 设置 `EDITOR` 环境变量：
```bash
export EDITOR=vim  # 或 nano、code 等
```

### 无效状态错误

**问题：** 使用 `apply` 时出现 `API error: An unexpected error occurred`

**解决方案：** 确保状态是以下值之一：`todo`、`in-progress`、`pending`、`stale`、`done`、`archived`

### 上下文未找到

**问题：** `context "work" not found`

**解决方案：** 先创建上下文：
```bash
ud config set-context work --api-url https://ud.company.com
ud login --context work
```
