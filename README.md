# Butterfly Blog

基于 **Next.js 15**、**Payload CMS v3** 和 **Tailwind CSS** 构建的现代化博客系统，灵感来源于 Hexo 主题 Butterfly。

## ✨ 特性

### 🎨 前台展示
- 🎨 **现代化 UI** - 采用 Butterfly 主题设计
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌙 **暗黑模式** - 支持明暗主题切换
- 📝 **Markdown 支持** - 使用 react-markdown 渲染精美文章
- 📑 **文章目录** - 自动生成可交互的目录导航
- 🔍 **搜索功能** - 快速搜索文章标题和内容
- 🏷️ **标签与分类** - 完善的文章分类和标签系统

### ⚙️ 后台管理 (Payload CMS)
- �️ **Admin 管理后台** - 开箱即用的内容管理界面
- 👥 **用户权限系统** - Admin/Editor/Viewer 三级角色
- 📝 **富文本编辑器** - 支持代码块、图片、链接等
- 🖼️ **媒体库管理** - 图片上传、缩略图自动生成
- 🔐 **安全认证** - NextAuth.js 集成（邮箱密码 + GitHub OAuth）
- 🌍 **SEO 优化** - 自动生成元数据、Open Graph 标签、站点地图
- ⚙️ **全局配置** - 站点名称、Logo、社交链接、公告栏等

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Next.js** | ^15.2.4 | React 全栈框架 (App Router) |
| **Payload CMS** | ^3.83.0 | Headless CMS（内容管理） |
| **PostgreSQL** | ^16.x | 关系型数据库 |
| **NextAuth.js** | ^5.0.0-beta.25 | 用户认证系统 |
| **TypeScript** | ^5.x | 类型安全的 JavaScript |
| **Tailwind CSS** | ^3.4.1 | 原子化 CSS 框架 |
| **react-markdown** | ^10.1.0 | Markdown 渲染 |
| **@fortawesome** | ^7.2.0 | 图标库 |

## 🚀 快速开始

### 环境要求

- Node.js 18+ 或更高版本
- PostgreSQL 16 或 17（本地安装或 Docker）
- npm / yarn / pnpm

### 1️⃣ 安装依赖

```bash
cd butterfly-nextjs
npm install
```

### 2️⃣ 配置数据库

#### 方案 A: 本地安装 PostgreSQL（推荐）

1. 下载安装：https://www.postgresql.org/download/windows/
2. 创建数据库：
   ```bash
   psql -U postgres -c "CREATE DATABASE butterfly_blog;"
   ```
3. 复制环境变量模板并修改：
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，修改 DATABASE_URL 中的密码
   ```

#### 方案 B: Docker 快速启动（无需安装）

```bash
docker run --name butterfly-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=butterfly_blog \
  -p 5432:5432 \
  -d postgres:16-alpine
```

#### 方案 C: 云数据库（生产环境）

推荐使用 [Supabase](https://supabase.com) 或 [Neon](https://neon.tech)，获取连接字符串后填入 `.env`。

### 3️⃣ 测试数据库连接

```bash
npm run db:test
```

显示 `✅ 数据库连接成功！` 即可继续。

### 4️⃣ 启动开发服务器

```bash
npm run dev
```

访问地址：
- 🏠 **博客前台**: http://localhost:3000
- ⚙️ **Admin 后台**: http://localhost:3000/admin
- 📡 **REST API**: http://localhost:3000/api/posts

### 5️⃣ 创建管理员账户

首次访问 `/admin` 时按提示创建管理员账户即可。

## 📁 项目结构

```
butterfly-nextjs/
├── app/                          # Next.js App Router
│   ├── api/auth/[...nextauth]/   # NextAuth 认证 API
│   ├── archives/                 # 归档页
│   ├── categories/               # 分类页
│   ├── post/[slug]/              # 文章详情页
│   ├── tags/                     # 标签页
│   └── page.tsx                  # 首页
├── collections/                  # Payload 内容集合定义
│   ├── Users.ts                  # 用户认证与权限
│   ├── Posts.ts                  # 文章管理（核心）
│   ├── Categories.ts             # 分类管理（支持嵌套）
│   ├── Tags.ts                   # 标签管理
│   └── Media.ts                  # 媒体库（图片上传）
├── globals/                      # Payload 全局配置
│   └── Settings.ts               # 站点设置（40+ 配置项）
├── components/                   # React 组件
│   ├── aside/                    # 侧边栏组件
│   ├── layout/                   # 布局组件
│   ├── post/                     # 文章相关组件
│   └── ui/                       # UI 通用组件
├── lib/                          # 工具函数和数据
├── scripts/                      # 数据库工具脚本
├── docs/                         # 详细文档
│   ├── POSTGRESQL_SETUP.md       # PostgreSQL 安装指南
│   └── INTEGRATION_REPORT.md     # 集成完成报告
├── payload.config.ts             # Payload 主配置
├── auth.config.ts                # NextAuth 认证配置
├── .env / .env.example           # 环境变量
└── public/                       # 静态资源
```

## 📋 可用命令

```bash
# 开发
npm run dev              # 启动开发服务器（Next.js + Payload）

# 数据库
npm run db:test          # 测试数据库连接
npm run db:init          # 初始化数据库

# 构建 & 运行
npm run build            # 生产环境构建
npm run start            # 启动生产服务器

# Payload CLI
npx payload migrate:create  # 创建新的数据库迁移
npx payload migrate:run     # 执行迁移
```

## � 内容模型

### Posts（文章）
| 字段 | 类型 | 说明 |
|------|------|------|
| title | text | 文章标题（必填） |
| slug | text | URL 别名（自动生成） |
| content | richText | 富文本内容（Markdown） |
| excerpt | textarea | 摘要（自动截取） |
| status | select | 状态：草稿/已发布/已归档 |
| categories | relationship | 分类（多对多） |
| tags | relationship | 标签（多对多） |
| coverImage | upload | 封面图片 |
| author | relationship | 作者（多对一） |

### Categories（分类）
支持多级嵌套结构（父分类 → 子分类）

### Tags（标签）
支持自定义颜色和图标

### Users（用户）
三级角色权限：**Admin**（管理员）> **Editor**（编辑）> **Viewer**（访客）

### Settings（站点配置）
7 大模块：站点信息、作者信息、社交链接、SEO 设置、显示设置、页脚配置、公告栏

## 🎨 自定义

### 修改主题色

在 `app/globals.css` 中修改 CSS 变量：

```css
:root {
  --theme-color: #49B1F5;        /* 主题色 */
  --theme-link-color: #49B1F5;  /* 链接色 */
}
```

### 修改站点信息

通过 Admin 后台 `设置 → 站点设置` 进行可视化配置，或直接编辑 `globals/Settings.ts`。

### 扩展内容模型

在 `collections/` 目录下创建新的 TypeScript 文件，参考现有集合的结构，然后在 `payload.config.ts` 中注册。

## 🔒 安全性

- ✅ 密码使用 bcrypt 加密存储
- ✅ Session Token 使用 HttpOnly + Secure 标志
- ✅ API 接口有速率限制（防暴力破解）
- ✅ 文件上传有类型和大小限制（仅图片，最大 5MB）
- ✅ SQL 注入防护（ORM 参数化查询）
- ✅ XSS 防护（Rich Text 内容自动 sanitize）

## 📄 许可证

MIT License

## 👤 作者

**Butterfly Blog** - 基于 Butterfly 主题的 Next.js 博客，集成 Payload CMS 内容管理系统

- GitHub: https://github.com/xiaoleng-ros/blog
- 技术支持: 查看 `docs/INTEGRATION_REPORT.md` 获取详细文档

---

**🚀 开始使用**: 参考 [集成完成报告](./butterfly-nextjs/docs/INTEGRATION_REPORT.md) 了解完整实施细节！
