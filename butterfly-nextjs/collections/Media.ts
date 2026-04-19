/**
 * Media 媒体集合
 * 功能：管理图片、视频等媒体文件的上传和存储
 * 特点：支持多种格式、自动压缩、CDN 集成（可选）
 */

import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    // 静态文件存储配置（开发环境）
    staticURL: '/media',       // 访问路径前缀
    staticDir: 'public/media',  // 存储目录
    
    // 图片尺寸配置（可选）
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
    
    // 文件大小限制
    fileSizeLimit: 5 * 1024 * 1024, // 5MB (单位：字节)
    
    // 允许的 MIME 类型
    mimeTypes: [
      'image/*',                    // 所有图片格式
      // 'video/mp4',               // 视频（如需启用取消注释）
      // 'application/pdf',         // PDF 文件
    ],
    
    sanitizeFileName: true, // 使用 Payload 内置的文件名清理（RSC 兼容）
  },

  admin: {
    useAsTitle: 'filename',
    description: '管理博客中使用的图片、Logo、封面等媒体资源',
    defaultColumns: ['filename', 'alt', 'mimeType', 'fileSize', 'createdAt'],
    group: '媒体', // 在 Admin 导航中的分组名称
  },

  // 字段定义
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: '替代文本 (Alt Text)',
      required: true,
      admin: {
        description: '用于无障碍访问和 SEO，简要描述图片内容',
        placeholder: '例如：一张展示 Next.js 架构的示意图',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: '图片说明',
      maxLength: 200,
      admin: {
        placeholder: '可选的详细说明文字...',
        rows: 2,
      },
    },
    {
      name: 'category',
      type: 'select',
      label: '媒体分类',
      options: [
        { label: '📷 封面图', value: 'cover' },
        { label: '🖼️ 文章配图', value: 'post' },
        { label: '🎨 Logo/图标', value: 'logo' },
        { label: '👤 头像', value: 'avatar' },
        { label: '📦 其他', value: 'other' },
      ],
      defaultValue: 'other',
    },
    {
      name: 'tags',
      type: 'text',
      label: '标签',
      admin: {
        description: '多个标签用逗号分隔，便于搜索和管理',
        placeholder: '例如：技术,教程,截图',
      },
    },
  ],

  // 访问控制
  access: {
    read: () => true, // 所有人可查看已发布的媒体
    create: ({ req }) => !!req.user, // 登录用户可上传
    update: ({ req }) => req.user?.role === 'admin', // 仅管理员可修改元数据
    delete: ({ req }) => req.user?.role === 'admin', // 仅管理员可删除
  },

  // Hooks
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          console.log(`📁 上传新文件: ${data.filename} (${(data.filesize / 1024).toFixed(2)} KB)`)
        }
        return data
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        console.log(`🗑️ 已删除媒体文件: ${doc.filename}`)
      },
    ],
  },
}

export default Media
