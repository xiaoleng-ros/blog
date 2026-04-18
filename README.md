# Butterfly Blog

基于 Next.js 和 Tailwind CSS 构建的现代化博客系统，灵感来源于 Hexo 主题 Butterfly。

## ✨ 特性

- 🎨 **现代化 UI** - 采用 Butterfly 主题设计，紫色渐变配色
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🌙 **暗黑模式** - 支持明暗主题切换
- 📝 **Markdown 支持** - 使用 react-markdown 渲染精美文章
- 📑 **文章目录** - 自动生成可交互的目录导航
- 🔍 **搜索功能** - 快速搜索文章标题和内容
- 🏷️ **标签与分类** - 完善的文章分类和标签系统
- 📰 **相关文章推荐** - 智能推荐相关文章

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| **Next.js 14** | React 框架，使用 App Router |
| **TypeScript** | 类型安全的 JavaScript |
| **Tailwind CSS** | 原子化 CSS 框架 |
| **react-markdown** | Markdown 渲染 |
| **@fortawesome** | 图标库 |

## 🚀 快速开始

### 环境要求

- Node.js 16.8 或更高版本
- npm / yarn / pnpm

### 安装依赖

```bash
cd butterfly-nextjs
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

### 构建生产版本

```bash
npm run build
npm run start
```

## 📁 项目结构

```
blog/
├── butterfly-nextjs/          # 主博客项目
│   ├── app/                   # Next.js App Router
│   │   ├── archives/         # 归档页
│   │   ├── categories/       # 分类页
│   │   ├── post/[slug]/      # 文章详情页
│   │   ├── tags/             # 标签页
│   │   └── page.tsx          # 首页
│   ├── components/           # React 组件
│   │   ├── aside/           # 侧边栏组件
│   │   ├── layout/          # 布局组件
│   │   ├── post/            # 文章相关组件
│   │   └── ui/              # UI 通用组件
│   ├── lib/                 # 工具函数和数据
│   └── public/              # 静态资源
└── themes/                  # 主题资源（子模块）
```

## 📝 文章管理

文章数据定义在 `butterfly-nextjs/lib/data.ts` 中，可按需修改。

## 🎨 自定义

### 修改主题色

在 `butterfly-nextjs/app/globals.css` 中修改 CSS 变量：

```css
:root {
  --theme-color: #49B1F5;        /* 主题色 */
  --theme-link-color: #49B1F5;  /* 链接色 */
}
```

### 修改网站信息

在 `butterfly-nextjs/components/aside/` 目录下的组件中修改站点信息。

## 📄 许可证

MIT License

## 👤 作者

**Butterfly Blog** - 基于 Butterfly 主题的 Next.js 博客

- GitHub: https://github.com/xiaoleng-ros/blog
