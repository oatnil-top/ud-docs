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

## 任务命令

### 列出任务

```bash
ud task list [--status <status>]
```

**选项：**
- `--status`：按状态过滤（`todo`、`in-progress`、`pending`、`stale`、`done`、`archived`）

**示例：**
```bash
# 列出所有任务
ud task list

# 只列出待办任务
ud task list --status todo

# 列出进行中的任务
ud task list --status in-progress
```

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

### 查看任务

```bash
ud task view <id>
```

显示任务详情，包括标题、描述、状态、标签、截止日期和时间戳。

:::tip 短 ID 支持
所有接受任务 ID 的命令都支持**前缀匹配**。你可以使用 `task list` 显示的 8 位短 ID，或者更短的前缀（只要唯一即可）。

```bash
ud task view 3de9f82b    # 列表中的完整短 ID
ud task view 3de         # 更短的前缀（如果唯一）
ud task view 3de9f82b-fc49-4e84-b288-9ae3174f69ae  # 完整 UUID 也可以
```

如果前缀匹配多个任务，会显示错误并列出匹配项：
```
Error: ambiguous ID prefix '3' matches 2 tasks:
  3de9f82b (任务标题一)
  3fbf7c24 (任务标题二)
Please use a longer prefix
```
:::

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

### 从文件应用更改

```bash
ud task apply -f <file> <id>
ud task apply -f - <id>  # 从标准输入读取
```

使用带有 YAML frontmatter 的 Markdown 文件更新任务。只更新指定的字段。

**标志：**
- `-f, --file`：带 frontmatter 的 Markdown 文件（必需，使用 `-` 从标准输入读取）

**文件格式：**
```markdown
---
title: 更新后的任务标题
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
| `title` | 字符串 | 任务标题 |
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
# 从文件更新
ud task apply -f task.md abc123

# 从标准输入更新
cat task.md | ud task apply -f - abc123

# 通过 echo 传入
echo '---
title: 快速更新
status: done
---' | ud task apply -f - abc123
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

### 删除任务

```bash
ud task delete <id>
ud task rm <id>  # 别名
```

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

- 查看任务：`ud task list`
- 创建任务：`ud task create "标题" -d "描述"`
- 完成任务：`ud task done <id>`
- 更新任务：`ud task apply -f task.md <id>`

在实现功能前，先查看相关任务获取上下文。
```

### 使用 Apply 批量更新

创建模板文件并应用到多个任务：

```bash
# 创建状态更新模板
cat > done.md << 'EOF'
---
status: done
---
EOF

# 应用到多个任务
for id in abc123 def456 ghi789; do
  ud task apply -f done.md $id
done
```

### 导出和编辑工作流

```bash
# 查看任务，复制内容
ud task view abc123

# 创建包含更新的 markdown 文件
cat > update.md << 'EOF'
---
title: 更新后的标题
status: in-progress
tags:
  - reviewed
  - approved
---

更新后的描述，包含新需求。
EOF

# 应用更改
ud task apply -f update.md abc123
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
