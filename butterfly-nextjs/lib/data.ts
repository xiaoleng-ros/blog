/**
 * Butterfly 主题模拟数据
 * 包含 12 篇示例文章、分类、标签、友链数据
 */

import { Post, Category, Tag, FriendLink } from './types';

// ==================== 分类数据 ====================
export const categories: Category[] = [
  { name: '前端开发', path: '/categories/frontend', count: 5 },
  { name: '后端技术', path: '/categories/backend', count: 3 },
  { name: '工具效率', path: '/categories/tools', count: 2 },
  { name: '算法基础', path: '/categories/algorithm', count: 1 },
  { name: '项目实战', path: '/categories/projects', count: 1 },
];

// ==================== 标签数据 ====================
export const tags: Tag[] = [
  { name: 'React', path: '/tags/react', count: 4 },
  { name: 'Next.js', path: '/tags/nextjs', count: 3 },
  { name: 'JavaScript', path: '/tags/javascript', count: 5 },
  { name: 'TypeScript', path: '/tags/typescript', count: 4 },
  { name: 'CSS', path: '/tags/css', count: 3 },
  { name: 'Node.js', path: '/tags/nodejs', count: 2 },
  { name: 'Python', path: '/tags/python', count: 1 },
  { name: 'Docker', path: '/tags/docker', count: 1 },
  { name: 'Git', path: '/tags/git', count: 2 },
  { name: '性能优化', path: '/tags/performance', count: 2 },
  { name: '设计模式', path: '/tags/patterns', count: 1 },
  { name: 'Vue', path: '/tags/vue', count: 1 },
  { name: 'Tailwind CSS', path: '/tags/tailwindcss', count: 2 },
  { name: '开源', path: '/tags/opensource', count: 1 },
  { name: 'AI', path: '/tags/ai', count: 1 },
];

// ==================== 友链数据 ====================
export const friendLinks: FriendLink[] = [
  {
    name: 'JerryC',
    link: 'https://jerryc.me',
    avatar: 'https://i.loli.net/2021/04/14/6RfWQO8vBZ4GgXd.jpg',
    description: 'Butterfly 主题作者，全栈开发者',
  },
  {
    name: 'Hexo',
    link: 'https://hexo.io',
    avatar: 'https://hexo.io/logo.svg',
    description: '快速、简洁且高效的博客框架',
  },
  {
    name: 'Next.js',
    link: 'https://nextjs.org',
    avatar: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo-dark.svg',
    description: 'React 全栈框架',
  },
  {
    name: 'React',
    link: 'https://react.dev',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description: '用于构建用户界面的 JavaScript 库',
  },
  {
    name: 'GitHub',
    link: 'https://github.com',
    avatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    description: '全球最大的代码托管平台',
  },
  {
    name: 'MDN Web Docs',
    link: 'https://developer.mozilla.org',
    avatar: 'https://developer.mozilla.org/mdn-social-share.cd6c4a5a.png',
    description: 'Web 开发者权威文档',
  },
];

// ==================== 文章数据 ====================
export const posts: Post[] = [
  {
    id: 'post-001',
    slug: 'hello-world',
    title: 'Hello World - 欢迎来到 Butterfly 博客',
    date: '2025-01-15T08:00:00.000Z',
    updated: '2025-01-20T10:30:00.000Z',
    cover: 'https://picsum.photos/seed/hello/800/400',
    cover_type: 'img',
    top: true,
    sticky: 99,
    content: `# Hello World

欢迎来到基于 **Butterfly 主题** 的 Next.js 博客系统！这是一个完整的 Hexo Butterfly 主题复刻项目。

## ✨ 项目特色

本项目将 Butterfly 主题的精华完整移植到 Next.js 框架中，保留了所有经典的视觉设计和交互体验：

- 🎨 **像素级还原**：完全复刻 Butterfly 的样式系统和配色方案
- 📱 **响应式设计**：完美适配桌面、平板、移动端
- 🌓 **暗色模式**：支持亮色/暗色主题无缝切换
- ⚡ **性能优化**：基于 Next.js 的 SSR/SSG 和代码分割
- 🔧 **TypeScript**：完整的类型安全保障

## 🚀 技术栈

\`\`\`typescript
// 核心技术栈
const techStack = {
  framework: 'Next.js 14+ (App Router)',
  language: 'TypeScript',
  styling: 'Tailwind CSS + CSS Variables',
  animation: 'Framer Motion',
  icons: 'Font Awesome 6',
  markdown: 'react-markdown + remark-gfm',
  codeHighlight: 'PrismJS',
};
\`\`\`

## 📝 后续计划

接下来我们将实现：

1. 完整的文章列表和详情页
2. 功能丰富的侧边栏组件
3. 归档、分类、标签聚合页
4. 友链展示页面
5. 本地搜索功能
6. 阅读模式和更多交互效果

> **提示**：本项目使用模拟数据展示，后续可对接 CMS 或 Markdown 文件系统。

感谢你的访问！🦋`,
    excerpt: '欢迎来到基于 Butterfly 主题的 Next.js 博客系统！这是一个完整的 Hexo Butterfly 主题复刻项目，保留了所有经典的视觉设计和交互体验。',
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [{ name: 'Next.js', path: '/tags/nextjs' }, { name: 'React', path: '/tags/react' }],
    wordcount: 520,
    min2read: 2,
    comments: 12,
  },
  {
    id: 'post-002',
    slug: 'nextjs-guide',
    title: 'Next.js 14 入门指南 - 从零开始构建现代 Web 应用',
    date: '2025-01-20T09:00:00.000Z',
    updated: '2025-01-25T14:20:00.000Z',
    cover: 'https://picsum.photos/seed/nextjs/800/400',
    cover_type: 'img',
    top: true,
    sticky: 88,
    content: `# Next.js 14 入门指南

Next.js 是一个强大的 React 框架，它提供了许多开箱即用的功能，让我们能够快速构建现代化的 Web 应用。

## 为什么选择 Next.js？

### 1. 服务端渲染 (SSR)
Next.js 默认支持服务端渲染，这对 SEO 非常友好：

\`\`\`jsx
// app/page.tsx - 自动支持 SSR
export default function Home() {
  return <h1>Hello World</h1>
}
\`\`\`

### 2. App Router
Next.js 13+ 引入了全新的 App Router，基于文件系统的路由更加直观：

\`\`\`
app/
├── layout.tsx      # 根布局
├── page.tsx        # 首页 (/)
├── about/
│   └── page.tsx    # 关于页 (/about)
└── blog/
    ├── page.tsx    # 博客列表 (/blog)
    └── [slug]/
        └── page.tsx  # 博客详情 (/blog/:slug)
\`\`\`

### 3. Server Components
React Server Components 让我们能够在服务器上执行组件逻辑，减少客户端 JavaScript 体积。

## 快速开始

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## 核心概念

| 特性 | 说明 |
|------|------|
| **Server Components** | 在服务器执行的 React 组件 |
| **Client Components** | 需要交互时使用 \`'use client'\` |
| **Routes** | 基于文件系统的路由 |
| **Layouts** | 跨路由共享的 UI |
| **Loading UI** | 自动加载状态管理 |
| **Error Handling** | 优雅的错误处理 |

## 性能优化技巧

1. **图片优化**：使用 \`next/image\` 组件
2. **字体优化**：使用 \`next/font\`
3. **代码分割**：动态导入重型组件
4. **缓存策略**：利用 ISR (Incremental Static Regeneration)

> Next.js 正在成为构建生产级 React 应用的首选框架。无论是个人博客还是企业级应用，它都能提供卓越的开发体验和用户体验。`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'Next.js', path: '/tags/nextjs' },
      { name: 'React', path: '/tags/react' },
      { name: 'JavaScript', path: '/tags/javascript' },
    ],
    wordcount: 1580,
    min2read: 5,
    comments: 24,
  },
  {
    id: 'post-003',
    slug: 'react-hooks-deep-dive',
    title: 'React Hooks 详解 - 掌握 useState、useEffect 与自定义 Hook',
    date: '2025-02-01T10:00:00.000Z',
    updated: '2025-02-05T16:45:00.000Z',
    cover: 'https://picsum.photos/seed/hooks/800/400',
    cover_type: 'img',
    content: `# React Hooks 详解

Hooks 是 React 16.8 引入的革命性特性，它让我们在函数组件中使用状态和其他 React 特性。

## useState - 状态管理

\`\`\`tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}
\`\`\`

## useEffect - 副作用处理

\`\`\`tsx
import { useEffect, useState } from 'react'

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 在组件挂载或 userId 变化时执行
    fetchUser(userId).then(setUser);
    
    // 清理函数（可选）
    return () => {
      // 组件卸载前执行清理
    };
  }, [userId]); // 依赖数组
  
  return user ? <div>{user.name}</div> : <p>加载中...</p>;
}
\`\`\`

## 自定义 Hook

自定义 Hook 让我们能够提取组件逻辑到可复用的函数中：

\`\`\`tsx
// useLocalStorage.ts
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// 使用示例
function App() {
  const [name, setName] = useLocalStorage('name', '默认值');
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
\`\`\`

## Hooks 使用规则

1. **只在最顶层调用 Hook**：不要在循环、条件或嵌套函数中调用
2. **只在 React 函数中调用 Hook**：
   - React 函数组件
   - 自定义 Hook

## 高级 Hooks

- **useContext**：跨组件共享状态
- **useReducer**：复杂状态管理
- **useMemo/useCallback**：性能优化
- **useRef**：访问 DOM 元素
- **useLayoutEffect**：同步执行副作用

> 掌握 Hooks 是成为高级 React 开发者的必经之路。它们让代码更简洁、更易复用、更易于测试。`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'React', path: '/tags/react' },
      { name: 'JavaScript', path: '/tags/javascript' },
      { name: 'TypeScript', path: '/tags/typescript' },
    ],
    wordcount: 1350,
    min2read: 4,
    comments: 18,
  },
  {
    id: 'post-004',
    slug: 'tailwindcss-best-practices',
    title: 'Tailwind CSS 最佳实践 - 构建现代化设计系统',
    date: '2025-02-10T11:30:00.000Z',
    updated: '2025-02-12T09:15:00.000Z',
    cover: 'https://picsum.photos/seed/tailwind/800/400',
    cover_type: 'img',
    content: `# Tailwind CSS 最佳实践

Tailwind CSS 是一个实用优先的 CSS 框架，它让你直接在 HTML 中快速构建定制化设计。

## 为什么选择 Tailwind？

传统 CSS 方式的问题：

\`\`\`css
/* 传统方式 - 需要命名类 */
.card { /* ... */ }
.card-title { /* ... */ }
.card-body { /* ... */ }

/* Tailwind 方式 - 直接写样式 */
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-bold text-gray-800">标题</h2>
  <p className="text-gray-600 mt-2">内容</p>
</div>
\`\`\`

## 配置扩展

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#49B1F5',
        secondary: '#00c4b6',
      },
      fontFamily: {
        sans: ['Microsoft YaHei', 'PingFang SC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
\`\`\`

## 常用模式

### 1. 响应式设计
\`\`\`html
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 卡片网格 -->
</div>
\`\`\`

### 2. Hover 和 Focus 状态
\`\`\`html
<button className="bg-blue-500 hover:bg-blue-600 
               focus:outline-none focus:ring-2 focus:ring-blue-300
               transition-colors duration-300">
  点击我
</button>
\`\`\`

### 3. 暗色模式
\`\`\`html
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <!-- 自动适配亮色/暗色 -->
</div>
\`\`\`

## 性能优化

1. **Purge unused CSS**：生产环境自动清除未使用的样式
2. **JIT Mode**：按需生成 CSS
3. **Group Hover**：父元素 hover 时触发子元素样式变化

> Tailwind CSS 让你告别编写重复的 CSS，专注于构建出色的用户界面。配合工具如 Headless UI，可以快速搭建完整的组件库。`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'CSS', path: '/tags/css' },
      { name: 'Tailwind CSS', path: '/tags/tailwindcss' },
      { name: '性能优化', path: '/tags/performance' },
    ],
    wordcount: 1100,
    min2read: 4,
    comments: 9,
  },
  {
    id: 'post-005',
    slug: 'typescript-advanced-types',
    title: 'TypeScript 高级类型 - 泛型、条件类型与映射类型',
    date: '2025-02-15T08:45:00.000Z',
    updated: '2025-02-18T11:20:00.000Z',
    cover: 'https://picsum.photos/seed/typescript/800/400',
    cover_type: 'img',
    content: `# TypeScript 高级类型

TypeScript 的类型系统非常强大，掌握高级类型能让你写出更安全、更优雅的代码。

## 泛型 (Generics)

泛型让我们创建可复用的组件和函数：

\`\`\`typescript
// 基础泛型函数
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("Hello"); // 类型为 string

// 泛型接口
interface Box<T> {
  contents: T;
}

const stringBox: Box<string> = { contents: "Hello" };
const numberBox: Box<number> = { contents: 42 };
\`\`\`

## 条件类型 (Conditional Types)

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // true

// 内置条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 提取类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
\`\`\`

## 映射类型 (Mapped Types)

\`\`\`typescript
// 将所有属性变为可选
type Optional<T> = {
  [K in keyof T]?: T[K];
};

// 将所有属性变为只读
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 实用示例
interface User {
  id: number;
  name: string;
  email: string;
}

type PartialUser = Partial<User>; // 所有属性可选
type ReadonlyUser = Readonly<User>; // 所有属性只读
\`\`\`

## 工具类型 (Utility Types)

TypeScript 提供了许多内置的工具类型：

| 工具类型 | 用途 |
|---------|------|
| \`Partial<T>\` | 所有属性变为可选 |
| \`Required<T>\` | 所有属性变为必需 |
| \`Pick<T, K>\` | 选择指定属性 |
| \`Omit<T, K>\` | 排除指定属性 |
| \`Record<K, V>\` | 创建键值对类型 |
| \`Exclude<T, U>\` | 排除联合类型中的某些类型 |
| \`Extract<T, U>\` | 提取联合类型中的某些类型 |

## 实战：API 响应类型

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<ApiResponse<User>> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}
\`\`\`

> TypeScript 的高级类型系统是它的核心竞争力之一。善用这些特性，可以让你的代码更健壮、更易维护。`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'TypeScript', path: '/tags/typescript' },
      { name: 'JavaScript', path: '/tags/javascript' },
    ],
    wordcount: 1450,
    min2read: 5,
    comments: 31,
  },
  {
    id: 'post-006',
    slug: 'frontend-performance-optimization',
    title: '前端性能优化实战 - 从加载到交互的全链路优化',
    date: '2025-02-20T13:00:00.000Z',
    updated: '2025-02-22T17:30:00.000Z',
    cover: 'https://picsum.photos/seed/performance/800/400',
    cover_type: 'img',
    content: `# 前端性能优化实战

性能是用户体验的核心。本文将从多个维度介绍如何优化前端应用的性能。

## Core Web Vitals

Google 定义的三个核心指标：

| 指标 | 名称 | 目标值 |
|------|------|--------|
| LCP | 最大内容绘制 | ≤ 2.5s |
| FID | 首次输入延迟 | ≤ 100ms |
| CLS | 累积布局偏移 | ≤ 0.1 |

## 加载性能优化

### 1. 资源压缩与缓存

\`\`\`javascript
// next.config.js
module.exports = {
  compress: true,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    }];
  },
}
\`\`\`

### 2. 代码分割

\`\`\`tsx
import dynamic from 'next/dynamic';

// 动态导入重型组件
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { loading: () => <p>Loading...</p>, ssr: false }
);
\`\`\`

### 3. 图片优化

\`\`\`tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // 首屏图片预加载
  placeholder="blur"
/>
\`\`\`

## 运行时性能优化

### 1. 虚拟滚动

对于长列表，只渲染可视区域内的元素：

\`\`\`tsx
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});
\`\`\`

### 2. Memoization

\`\`\`tsx
import { useMemo, useCallback } from 'react';

// 缓存计算结果
const sortedItems = useMemo(
  () => [...items].sort((a, b) => a.value - b.value),
  [items]
);

// 缓存回调函数
const handleClick = useCallback((id: number) => {
  console.log('Clicked:', id);
}, []);
\`\`\`

## 监控与分析

使用 Performance API 和 Lighthouse 进行性能分析：

\`\`\`javascript
// 测量渲染时间
const start = performance.now();
renderComponent();
console.log(\`Render took \${performance.now() - start}ms\`);

// 使用 React Profiler
<Profiler id="ComponentName" onRender={(id, phase, actualDuration) => {
  console.log(\${id} \${phase} took \${actualDuration}ms);
}}>
  <MyComponent />
</Profiler>
\`\`\`

> 性能优化是一个持续的过程。建立性能预算、定期审计、持续监控是保持高性能的关键。`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'JavaScript', path: '/tags/javascript' },
      { name: '性能优化', path: '/tags/performance' },
      { name: 'React', path: '/tags/react' },
    ],
    wordcount: 1680,
    min2read: 6,
    comments: 42,
  },
  {
    id: 'post-007',
    slug: 'git-workflow-guide',
    title: 'Git 工作流指南 - 团队协作的最佳实践',
    date: '2025-03-01T09:30:00.000Z',
    updated: '2025-03-03T14:00:00.000Z',
    cover: 'https://picsum.photos/seed/git/800/400',
    cover_type: 'img',
    content: `# Git 工作流指南

Git 是现代软件开发不可或缺的版本控制工具。掌握高效的工作流对团队协作至关重要。

## Git Flow 工作流

Git Flow 是一种经典的工作流模型：

\`\`\`
main (生产环境)
  │
  ├─ develop (开发分支)
  │     │
  │     ├─ feature/login (功能分支)
  │     ├─ feature/payment
  │     │
  │     └─ release/v1.0 (发布分支)
  │           │
  │           └─ hotfix/fix-bug (热修复)
\`\`\`

## 常用命令速查

### 分支操作
\`\`\`bash
# 创建并切换分支
git checkout -b feature/new-feature

# 合并分支
git merge feature/new-feature

# 删除分支
git branch -d feature/new-feature
\`\`\`

### 提交规范

采用 Conventional Commits 规范：

\`\`\`
feat(login): 添加用户登录功能

fix(auth): 修复 token 刷新问题

docs(readme): 更新安装说明

style(header): 调整导航栏样式

refactor(user): 重构用户模块代码

test(api): 添加接口测试用例
\`\`\`

## 高级技巧

### 1. Interactive Rebase
\`\`\`bash
# 修改最近 3 次提交信息
git rebase -i HEAD~3
\`\`\`

### 2. Cherry-pick
\`\`\`bash
# 将特定提交应用到当前分支
git cherry-pick abc1234
\`\`\`

### 3. Stash 临时保存
\`\`\`bash
# 保存当前修改
git stash

# 查看保存列表
git stash list

# 恢复最近一次保存
git stash pop
\`\`\`

## .gitignore 最佳实践

\`\`\`.gitignore
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
coverage/
.vscode/
\`\`\`

> 好的 Git 工作流能显著提升团队协作效率。选择适合团队规模的工作流，并坚持遵循统一的规范。`,
    categories: [{ name: '工具效率', path: '/categories/tools' }],
    tags: [
      { name: 'Git', path: '/tags/git' },
      { name: '开源', path: '/tags/opensource' },
    ],
    wordcount: 1200,
    min2read: 4,
    comments: 15,
  },
  {
    id: 'post-008',
    slug: 'docker-container-deployment',
    title: 'Docker 容器化部署 - 一键部署全栈应用',
    date: '2025-03-10T10:15:00.000Z',
    updated: '2025-03-12T16:40:00.000Z',
    cover: 'https://picsum.photos/seed/docker/800/400',
    cover_type: 'img',
    content: `# Docker 容器化部署

Docker 让我们能够将应用及其依赖打包成容器，实现"一次构建，到处运行"。

## Dockerfile 编写

\`\`\`dockerfile
# 基础镜像
FROM node:18-alpine AS builder

WORKDIR /app

# 安装依赖
COPY package*.json ./
RUN npm ci

# 复制源码并构建
COPY . .
RUN npm run build

# 生产镜像
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

## Docker Compose 多容器编排

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
  
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## 常用命令

\`\`\`bash
# 构建镜像
docker build -t my-app .

# 运行容器
docker run -d -p 3000:3000 --name my-app-container my-app

# 查看日志
docker logs -f my-app-container

# 进入容器
docker exec -it my-app-container sh

# 清理资源
docker system prune -a
\`\`\`

## 优化建议

1. **多阶段构建**：减小最终镜像体积
2. **.dockerignore**：排除不需要的文件
3. **健康检查**：确保容器正常运行
4. **资源限制**：防止容器占用过多资源

> Docker 已成为现代 DevOps 的标准配置。掌握容器化技术，能让你的部署流程更加可靠和高效。`,
    categories: [{ name: '后端技术', path: '/categories/backend' }],
    tags: [
      { name: 'Docker', path: '/tags/docker' },
      { name: 'Node.js', path: '/tags/nodejs' },
    ],
    wordcount: 1350,
    min2read: 5,
    comments: 21,
  },
  {
    id: 'post-009',
    slug: 'algorithms-data-structures',
    title: '算法与数据结构精要 - 前端工程师必备基础知识',
    date: '2025-03-15T14:00:00.000Z',
    updated: '2025-03-18T11:25:00.000Z',
    cover: 'https://picsum.photos/seed/algorithm/800/400',
    cover_type: 'img',
    content: `# 算法与数据结构精要

作为前端工程师，掌握基本的算法和数据结构对于解决复杂问题和通过技术面试都至关重要。

## 时间复杂度分析

\`\`\`javascript
// O(1) - 常数时间
function getFirst(arr) {
  return arr[0]; // 无论数组多大，都是一步操作
}

// O(n) - 线性时间
function find(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// O(log n) - 对数时间（二分查找）
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
\`\`\`

## 常用数据结构

### 数组 vs 链表

| 操作 | 数组 | 链表 |
|------|------|------|
| 访问 | O(1) | O(n) |
| 插入（头部）| O(n) | O(1) |
| 删除 | O(n) | O(1) |
| 内存 | 连续 | 分散 |

### Map 和 Set

\`\`\`javascript
// Map - 键值对集合
const map = new Map();
map.set('key1', 'value1');
map.get('key1'); // 'value1'
map.has('key1'); // true

// Set - 唯一值集合
const set = new Set([1, 2, 3, 3, 4]);
set.size; // 4（自动去重）
set.has(2); // true
\`\`\`

## 经典算法题

### 1. 两数之和

给定一个整数数组和目标值，找出两个数的索引使它们的和等于目标值。

\`\`\`javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}
\`\`\`

### 2. 反转链表

\`\`\`javascript
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  
  return prev;
}
\`\`\`

### 3. 有效括号

\`\`\`javascript
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  
  for (const char of s) {
    if (!pairs[char]) {
      stack.push(char); // 左括号入栈
    } else if (stack.pop() !== pairs[char]) {
      return false; // 不匹配
    }
  }
  
  return stack.length === 0;
}
\`\`\`

> 算法能力不是一朝一夕能练成的。每天花时间练习一道 LeetCode 题目，日积月累就能看到显著的进步。推荐从简单难度开始，逐步挑战中等和困难题目。`,
    categories: [{ name: '算法基础', path: '/categories/algorithm' }],
    tags: [
      { name: 'JavaScript', path: '/tags/javascript' },
      { name: 'TypeScript', path: '/tags/typescript' },
    ],
    wordcount: 1750,
    min2read: 6,
    comments: 27,
  },
  {
    id: 'post-010',
    slug: 'design-patterns-frontend',
    title: '设计模式在前端的应用 - 提升代码架构质量',
    date: '2025-03-20T08:00:00.000Z',
    updated: '2025-03-23T13:50:00.000Z',
    cover: 'https://picsum.photos/seed/patterns/800/400',
    cover_type: 'img',
    content: `# 设计模式在前端的应用

设计模式是经过验证的解决方案模板，能帮助我们编写更清晰、更可维护的代码。

## 单例模式 (Singleton)

确保一个类只有一个实例：

\`\`\`typescript
class Database {
  private static instance: Database;
  private connection: any;
  
  private constructor() {
    this.connection = this.createConnection();
  }
  
  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  private createConnection() {
    // 创建数据库连接
    return {};
  }
}

// 使用
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true
\`\`\`

## 观察者模式 (Observer)

事件驱动的核心模式：

\`\`\`typescript
class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();
  
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }
  
  emit(event: string, ...args: any[]) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => cb(...args));
    }
  }
  
  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      this.listeners.set(event, callbacks.filter(cb => cb !== callback));
    }
  }
}

// React 中的应用
const eventBus = new EventEmitter();

// 组件 A 发布事件
eventBus.emit('user-login', userData);

// 组件 B 订阅事件
useEffect(() => {
  const handler = (data) => console.log('User logged in:', data);
  eventBus.on('user-login', handler);
  return () => eventBus.off('user-login', handler);
}, []);
\`\`\`

## 策略模式 (Strategy)

定义一系列算法，让它们可以相互替换：

\`\`\`typescript
interface PaymentStrategy {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(\`Paid \$\{amount} via Credit Card\`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(\`Paid \$\{amount} via PayPal\`);
  }
}

class AlipayPayment implements PaymentStrategy {
  pay(amount: number) {
    console.log(\`Paid \$\{amount} via Alipay\`);
  }
}

class ShoppingCart {
  private strategy: PaymentStrategy;
  
  setPaymentStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }
  
  checkout(amount: number) {
    this.strategy.pay(amount);
  }
}

// 使用
const cart = new ShoppingCart();
cart.setPaymentStrategy(new AlipayPayment());
cart.checkout(100); // Paid $100 via Alipay
\`\`\`

## 其他常用模式

| 模式 | 应用场景 |
|------|---------|
| **工厂模式** | 创建对象时的封装 |
| **装饰器模式** | 动态添加功能 |
| **适配器模式** | 接口转换 |
| **代理模式** | 控制对象访问 |
| **组合模式** | 树形结构 |

> 设计模式的目的是提高代码的可读性和可维护性，而不是过度设计。在实际项目中，根据需求合理选用即可。`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'TypeScript', path: '/tags/typescript' },
      { name: '设计模式', path: '/tags/patterns' },
      { name: 'React', path: '/tags/react' },
    ],
    wordcount: 1520,
    min2read: 5,
    comments: 19,
  },
  {
    id: 'post-011',
    slug: 'open-source-recommendations',
    title: '我的开源项目推荐 - 2025 年值得关注的优秀项目',
    date: '2025-03-25T15:30:00.000Z',
    updated: '2025-03-28T10:10:00.000Z',
    cover: 'https://picsum.photos/seed/opensource/800/400',
    cover_type: 'img',
    content: `# 我的开源项目推荐

开源社区有大量优秀的项目和工具，这里分享一些我认为值得关注的项目。

## 前端框架 & 库

### 1. Next.js
- **地址**: https://nextjs.org
- **简介**: React 全栈框架，SSR/SSG 支持
- **亮点**: App Router、Server Components、优秀的 DX

### 2. Vue 3
- **地址**: https://vuejs.org
- **简介**: 渐进式 JavaScript 框架
- **亮点**: Composition API、响应式系统重构

### 3. Tailwind CSS
- **地址**: https://tailwindcss.com
- **简介**: 实用优先的 CSS 框架
- **亮点**: JIT 编译、高度可定制

## 开发工具

### 4. VS Code
- **地址**: https://code.visualstudio.com
- **简介**: 微软出品的轻量级编辑器
- **亮点**: 丰富的插件生态、智能补全

### 5. Vite
- **地址**: https://vitejs.dev
- **简介**: 新一代前端构建工具
- **亮点**: 极速冷启动、HMR 热更新

## 学习资源

### 6. freeCodeCamp
- **地址**: https://freecodecamp.org
- **简介**: 免费学习编程的平台
- **亮点**: 系统化课程、认证证书

### 7. MDN Web Docs
- **地址**: https://developer.mozilla.org
- **简介**: Web 技术权威文档
- **亮点**: 全面准确、多语言支持

## 如何参与开源

1. **从小的贡献开始**：修复 typo、改进文档
2. **选择合适的项目**：从你使用的工具开始
3. **阅读贡献指南**：每个项目都有 CONTRIBUTING.md
4. **积极沟通**：通过 Issue 和 PR 与维护者交流

> 开源不仅是获取免费软件的方式，更是学习、成长、建立影响力的绝佳途径。即使只是提交一个小小的 PR fix，也是对社区的贡献。`,
    categories: [{ name: '工具效率', path: '/categories/tools' }],
    tags: [
      { name: '开源', path: '/tags/opensource' },
      { name: 'Vue', path: '/tags/vue' },
      { name: 'React', path: '/tags/react' },
    ],
    wordcount: 1100,
    min2read: 4,
    comments: 33,
  },
  {
    id: 'post-012',
    slug: 'tech-trends-2025',
    title: '2025 年技术趋势展望 - AI 时代的前端发展方向',
    date: '2025-04-01T09:00:00.000Z',
    updated: '2025-04-05T15:20:00.000Z',
    cover: 'https://picsum.photos/seed/trends2025/800/400',
    cover_type: 'img',
    top: true,
    sticky: 77,
    content: `# 2025 年技术趋势展望

站在 2025 年的时间节点，让我们一起展望技术发展的方向，特别是 AI 如何重塑前端开发的未来。

## AI 驱动的开发

### 1. AI 辅助编程
- GitHub Copilot、Cursor 等 AI 编程助手已成为标配
- 自然语言转代码的能力越来越强
- 代码审查、测试生成自动化程度提升

### 2. AI 原生应用
- 大语言模型（LLM）集成到各类应用中
- RAG（检索增强生成）成为主流架构
- 多模态 AI（文本、图像、音频）融合

## 前端技术演进

### 3. React Server Components 成熟
- 更广泛的服务端渲染采用
- 数据获取模式革新
- Bundle Size 显著减少

### 4. Edge Computing 普及
- Vercel Edge Functions、Cloudflare Workers
- 全球边缘节点部署
- 超低延迟的用户体验

### 5. WebAssembly (Wasm) 进入主流
- 高性能 Web 应用（视频编辑、3D 渲染）
- 非 JavaScript 语言编写 Web 应用
- Rust、Go 代码编译运行在浏览器

## 开发体验提升

### 6. TypeScript 5.x 新特性
- 装饰器模式标准化
- const 类型参数
- 更智能的类型推断

### 7. 构建工具革新
- Turbopack（Vercel）挑战 Webpack 地位
- Rolldown（Rollup 的 Rust 重写版）
- 构建速度数量级提升

## 新兴领域

### 8. 空间计算 (Spatial Computing)
- Apple Vision Pro 推动 XR 发展
- WebXR API 完善
- 3D Web 应用增多

### 9. WebGPU 图形编程
- 替代 WebGL 的下一代图形 API
- 机器学习推理在浏览器端运行
- 复杂可视化场景

## 给开发者的建议

1. **拥抱变化**：保持学习的热情和开放的心态
2. **夯实基础**：HTML/CSS/JS 核心知识永不过时
3. **关注 AI**：学会使用 AI 工具提升效率
4. **深度专精**：在一个领域做到专家级别
5. **分享输出**：写博客、做开源、参与社区

> 技术浪潮滚滚向前，唯有不断学习和适应才能立于不败之地。2025 年将是充满机遇的一年，让我们一起迎接挑战！🚀`,
    categories: [{ name: '前端开发', path: '/categories/frontend' }],
    tags: [
      { name: 'AI', path: '/tags/ai' },
      { name: 'React', path: '/tags/react' },
      { name: 'TypeScript', path: '/tags/typescript' },
      { name: 'Next.js', path: '/tags/nextjs' },
    ],
    wordcount: 1650,
    min2read: 6,
    comments: 56,
  },
];

// 导出默认数据
export default posts;
