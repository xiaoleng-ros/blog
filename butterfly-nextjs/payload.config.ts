/**
 * Payload CMS 主配置文件
 * 功能：初始化 Payload 实例，配置数据库、认证、插件、中文语言包等
 */

import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'

// 内容集合导入
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Media } from './collections/Media'
// 全局配置导入
import { Settings } from './globals/Settings'

export default buildConfig({
  // 服务器基础配置
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    // Admin UI 配置
    user: 'users', // 用户集合名称
    // 中文化配置
    meta: {
      titleSuffix: '- Butterfly 博客管理后台',
      favicon: '/img/butterfly-icon.svg',
      ogImage: '/img/butterfly-icon.svg',
    },
    // 自定义组件（后续扩展）
    // components: {},
  },

  // 数据库配置：PostgreSQL
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  // 集合注册
  collections: [
    Users,      // 用户集合（必须第一个注册，用于认证）
    Media,      // 媒体集合（图片上传，其他集合依赖）
    Posts,      // 文章集合
    Categories, // 分类集合
    Tags,       // 标签集合
  ],

  // 全局配置（站点设置）
  globals: [
    Settings, // 站点全局配置
  ],

  // 插件配置
  plugins: [
    // SEO 插件（自动生成元数据）
    seoPlugin({
      collections: ['posts'], // 为文章集合启用 SEO
      generateTitle: ({ doc }) => `${doc.title} | Butterfly Blog`,
      generateDescription: ({ doc }) => doc.excerpt || doc.title,
    }),
  ],

  // 类型定义
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // 安全密钥（用于加密 Session 和 Token）
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-change-in-production',
})
