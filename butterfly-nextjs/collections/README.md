# Collections 目录

此目录用于存放 Payload CMS 的内容集合定义文件。

## 集合列表（按开发顺序）

1. **Users.ts** - 用户集合（认证必需）
   - 字段：email, password, name, role, avatar, bio
   - 权限：Admin/Editor/Viewer 三级角色

2. **Posts.ts** - 文章集合（核心）
   - 字段：title, slug, content, excerpt, coverImage, status, categories, tags
   - Hooks：自动生成 slug、计算阅读时间、更新时间戳

3. **Categories.ts** - 分类集合
   - 字段：name, slug, description, parentCategory

4. **Tags.ts** - 标签集合
   - 字段：name, slug, color

5. **Media.ts** - 媒体库（可选，Payload 内置支持）

## 开发规范

- 每个集合单独一个文件
- 使用 TypeScript 类型注解
- 所有用户可见文本使用中文
- 导出默认配置对象
