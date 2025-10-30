---
sidebar_position: 2
---

# 自部署指南

**快速开始**：想要立即开始？跳转到 [Docker Compose 本地存储 + SQLite](/docs/deployment/docker-compose-local) - 最简单的自部署选项。

---

根据您的基础设施和需求选择部署方法。

![UnderControl Architecture](/img/Arch.png)

该架构图展示了用户如何通过浏览器与系统交互，浏览器连接到前端。前端和后端通过 CORS 或反向代理进行通信。后端协调与数据库和可选外部服务（AI、S3 存储和 OTEL 监控）的连接。

## 架构

UnderControl 由两个主要组件和几个可选的外部服务组成：

### 核心组件

- **后端 (ud-backend)**：基于 Go 的 API 服务器，支持 CORS
  - 处理所有 API 请求和业务逻辑
  - 连接到数据库和外部服务
  - 支持 PostgreSQL 和 SQLite 数据库

- **前端 (ud-frontend)**：Next.js Web 应用程序
  - 用于 Web 和移动浏览器的用户界面
  - 通过 CORS 或反向代理与后端通信
  - 服务器端渲染以实现最佳性能

### 外部服务（可选）

- **AI 提供商**：OpenAI 兼容的 API，用于 AI 驱动的功能
  - 可配置的基础 URL 和 API 密钥
  - 支持 GPT-4o-mini 等模型
  - 可以使用 OpenAI 或兼容的替代方案

- **S3 提供商**：S3 兼容的对象存储，用于文件附件
  - 支持 AWS S3、Cloudflare R2、MinIO 等
  - 存储上传的文件和资源
  - 可以回退到本地文件系统存储

- **OTEL 后端（可选）**：OpenTelemetry 用于可观测性
  - 监控和追踪
  - 支持 OneUptime 和其他 OTEL 兼容平台
  - 默认禁用

- **数据库**：数据持久化层
  - **PostgreSQL**：推荐用于生产环境（并发访问，更好的性能）
  - **SQLite**：适用于开发/测试（设置更简单，单文件数据库）


## 部署选项

### Docker Compose 部署

使用 Docker Compose 进行简单直接的部署：

- **[本地存储 + SQLite](/docs/deployment/docker-compose-local)** - 推荐用于入门
  - 本地文件系统存储
  - SQLite 数据库
  - 所需配置最少

- **[本地存储 + PostgreSQL](/docs/deployment/docker-compose-postgres)** - 更适合生产环境
  - 本地文件系统存储
  - PostgreSQL 数据库
  - 提高性能和可靠性

- **[S3/R2 存储 + PostgreSQL](/docs/deployment/docker-compose-s3)** - 云就绪
  - S3 兼容的云存储
  - PostgreSQL 数据库
  - 可扩展的文件存储

### Kubernetes 部署

适用于生产环境的企业级部署：

- **[Kubernetes 使用 Helm](/docs/deployment/kubernetes-helm)** - 生产就绪
  - Helm chart 部署
  - 可扩展且高可用
  - 高级配置选项

## 我应该选择哪种部署方式？

### 用于开发或测试
→ **[Docker Compose 本地存储 + SQLite](/docs/deployment/docker-compose-local)**

设置简单，依赖项最少，非常适合试用 UnderControl。

### 用于小型生产部署
→ **[Docker Compose 本地存储 + PostgreSQL](/docs/deployment/docker-compose-postgres)**

对于并发访问比 SQLite 更可靠，仍然易于管理。

### 用于使用云存储的生产环境
→ **[Docker Compose S3/R2 + PostgreSQL](/docs/deployment/docker-compose-s3)**

将文件存储卸载到云端，数据库保持本地或使用托管 PostgreSQL。

### 用于企业或高可用性
→ **[Kubernetes 使用 Helm](/docs/deployment/kubernetes-helm)**

完整的编排、自动扩展、滚动更新和生产级可靠性。

## 通用要求

所有部署方法都需要：

- **许可证文件**：联系 UnderControl 团队获取许可证文件
- **JWT 密钥**：用于身份验证的安全随机字符串
- **容器运行时**：Docker 或兼容的容器运行时

## 下一步

1. 从上面选择一种部署方法
2. 按照所选方法的详细指南进行操作
3. 配置您的环境变量
4. 部署并访问您的 UnderControl 实例

## 获取帮助

如果您在部署过程中遇到问题：

1. 检查部署指南中的故障排除部分
2. 查看日志以获取错误消息
3. 访问[文档](/)获取更多帮助
4. 联系支持并提供您的配置（删除敏感数据）
