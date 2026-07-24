---
sidebar_position: 2
---

# 自部署指南

用一条 Docker 命令即可自部署 UnDercontrol。**all-in-one 镜像**把前端和后端打包在同一个容器里，
无需自己拼装——运行即可打开浏览器使用。

镜像同时发布 **linux/amd64** 和 **linux/arm64**（Apple 芯片、ARM 服务器），同一条命令在任何机器上都能用。

## 快速开始（免费 / Personal）

无需许可证。单用户，SQLite，本地文件存储。

```bash
docker run -d --name undercontrol \
  -p 3000:8080 \
  -e HOST_DOMAIN=http://localhost:3000 \
  -e JWT_SECRET=change-me-to-a-random-string \
  -v undercontrol-data:/app/data \
  lintao0o0/undercontrol:latest
```

然后打开 `http://localhost:3000`，点击 **Start** 即可使用。前端和后端在同一容器中，
自动通过 `/api/v1` 连接——无需配置服务器地址。

### 首次启动 banner

容器日志会让成功和失败一目了然。启动成功时，`docker logs undercontrol` 的末尾会打印一个
ready banner，直接告诉你去哪打开、用什么账号登录：

```text
==============================================================================

  UnDercontrol v1.x.x is ready

  --> Open http://localhost:3000 to get started

      Login as:  personal@undercontrol.local
                 default password: personal123 (set PERSONAL_TIER_PASSWORD to change it)
      Tier:      Personal (max users: 1)
      Database:  SQLITE
      Storage:   LocalFS

==============================================================================
```

如果配置有误，容器会立即退出，同一份日志里会出现 `STARTUP FAILED` 块，明确指出要修什么——
缺 `HOST_DOMAIN`、Pro/Max 下缺 `ADMIN_EMAIL`，或端口被占用。密码提示只在账号仍使用出厂默认密码时才会出现。

## Pro / Max（多用户）

加上许可证和管理员账号即可启用多用户、PostgreSQL、S3 存储和管理后台。许可证请联系 UnDercontrol 团队获取。

```bash
docker run -d --name undercontrol \
  -p 3000:8080 \
  -e HOST_DOMAIN=http://localhost:3000 \
  -e JWT_SECRET=change-me-to-a-random-string \
  -e ADMIN_EMAIL=admin@example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  -e LICENSE_TOKEN=your-license-token \
  -e LICENSE_HOST_SECRET=your-license-host-secret \
  -v undercontrol-data:/app/data \
  lintao0o0/undercontrol:latest
```

用你设置的 `ADMIN_EMAIL` / `ADMIN_PASSWORD` 登录。

:::warning Pro/Max 必须设置 ADMIN_EMAIL
Pro/Max tier 启动时会用 `ADMIN_EMAIL` 创建初始管理员账号。如果缺失，服务会**直接拒绝启动**并给出明确报错——
启动前请先设置它（以及 `ADMIN_PASSWORD`）。
:::

## docker-compose

如需持久化数据和更方便的配置，推荐使用 docker-compose：

```yaml
services:
  undercontrol:
    image: lintao0o0/undercontrol:latest
    ports:
      - "3000:8080"
    volumes:
      - ./data:/app/data
    environment:
      - HOST_DOMAIN=http://localhost:3000
      - JWT_SECRET=change-me-to-a-random-string
      # 仅 Pro/Max：
      # - ADMIN_EMAIL=admin@example.com
      # - ADMIN_PASSWORD=your-secure-password
      # - LICENSE_TOKEN=your-license-token
      # - LICENSE_HOST_SECRET=your-license-host-secret
```

```bash
docker compose up -d
```

## 环境变量

| 变量 | 是否必填 | 默认值 | 说明 |
|------|----------|--------|------|
| `HOST_DOMAIN` | **是** | — | 客户端访问本实例的公开 URL，用于生成文件下载/上传链接，必须可达（如 `http://localhost:3000` 或 `https://ud.example.com`）。 |
| `JWT_SECRET` | **是** | — | 用于签发认证 token 的随机密钥。 |
| `ADMIN_EMAIL` | Pro/Max | — | 初始管理员的登录用户名。Pro/Max tier 必填。 |
| `ADMIN_PASSWORD` | Pro/Max | `admin123` | 初始管理员密码，请务必修改。 |
| `LICENSE_TOKEN` | Pro/Max | — | 解锁 Pro/Max 功能的许可证 token。 |
| `LICENSE_HOST_SECRET` | Pro/Max | — | 与许可证 token 配套的 host secret。 |
| `PERSONAL_TIER_PASSWORD` | 否 | `personal123` | Personal tier 唯一用户（`personal@undercontrol.local`）的密码。请在**首次启动前**设置：**Start** 自动登录始终读取该变量，用户创建后只改环境变量、或只在应用内改密码，都会导致自动登录失效（两者必须一致；登录名本身不可修改）。 |
| `PORT` | 否 | `8080` | 服务在容器内监听的端口。 |

### 可选：PostgreSQL、S3 与 AI

all-in-one 镜像默认使用 SQLite + 本地文件存储，对大多数自部署实例已经足够。Pro/Max 下可通过额外环境变量接入外部服务：

- **PostgreSQL** — 设置 `DATABASE_URL`（或单独的 `DB_*` 变量）以替代内置 SQLite。
- **S3 / R2 存储** — 设置 `S3_*` 变量，把上传文件存到 S3 兼容对象存储（AWS S3、Cloudflare R2、MinIO），替代本地卷。
- **AI 服务** — 设置 OpenAI 兼容的 `AI_*` 变量以启用 AI 功能。

## 前后端分离镜像（进阶）

如果需要前端和后端独立扩缩容，或分别放在不同代理后面，它们也各自发布为多架构镜像：

- 后端 — `lintao0o0/undercontrol-backend:latest`
- 前端 — `lintao0o0/undercontrol-vite-app:latest`

后端使用与上面相同的环境变量；前端通过 nginx 提供静态资源并把 `/api` 反代到后端。

## 数据与备份

所有状态都在 `/app/data`（上面挂载的卷）下：SQLite 数据库，以及默认情况下的上传文件。备份该卷即可备份整个实例。
如果使用外部 PostgreSQL 和 S3，则改为备份它们。

## 故障排查

先看 `docker logs undercontrol`：正常启动的日志以上面的 ready banner 结尾；配置有误则以
`STARTUP FAILED` 块结尾，直接点名要修的变量。

- **容器启动后立即退出** — 读日志里的 `STARTUP FAILED` 块。常见原因：缺 `HOST_DOMAIN`、
  Pro/Max 下缺 `ADMIN_EMAIL`、端口被占用。
- **`no matching manifest for linux/arm64/v8`** — 更新到最新镜像，现已同时发布 amd64 和 arm64。
- **不知道去哪登录** — ready banner 里打印了访问 URL 和当前 tier 的登录账号。
- **文件链接无法访问** — `HOST_DOMAIN` 必须是客户端实际访问实例的 URL，包含协议和端口。
- 仍无法解决时，携带日志和配置联系支持（去除敏感信息）。
