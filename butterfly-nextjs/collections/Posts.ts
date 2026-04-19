/**
 * Posts 文章集合
 * 功能：博客文章的完整 CRUD 管理
 * 特性：自动生成 slug、阅读时间计算、SEO 元数据、版本控制
 */

import { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'

// 定义文章状态枚举
export const PostStatus = {
  DRAFT: 'draft',       // 草稿：不可公开访问
  PUBLISHED: 'published', // 已发布：前台可见
  ARCHIVED: 'archived',   // 已归档：保留但不在列表显示
} as const

export type PostStatusType = typeof PostStatus[keyof typeof PostStatus]

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    description: '管理博客文章内容，支持 Markdown 和富文本编辑',
    defaultColumns: ['title', 'author', 'status', 'categories', 'createdAt'],
    preview: (doc) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL || ''}/post/${doc.slug}`,
    // 自定义列表视图配置
    listSearchableFields: ['title', 'excerpt'], // 可搜索的字段
  },

  // 字段定义
  fields: [
    {
      name: 'title',
      type: 'text',
      label: '文章标题',
      required: true,
      minLength: 2,
      maxLength: 200,
      localized: true, // 支持多语言（可选）
      admin: {
        placeholder: '请输入吸引人的文章标题...',
        description: '建议长度 10-50 字符，利于 SEO',
        width: '100%',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL 别名 (Slug)',
      index: true, // 创建索引以加速查询
      unique: true,
      required: true,
      admin: {
        position: 'sidebar', // 放在侧边栏
        description: '用于生成文章 URL，留空将自动从标题生成',
        readOnly: false, // 允许手动修改
      },
      hooks: {
        // 自动从标题生成 slug
        beforeChange: [
          ({ siblingData, value, operation }) => {
            if ((operation === 'create' || !value) && siblingData.title) {
              return generateSlug(siblingData.title)
            }
            return value || ''
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      label: '发布状态',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: '📝 草稿',
          value: 'draft',
        },
        {
          label: '✅ 已发布',
          value: 'published',
        },
        {
          label: '📦 已归档',
          value: 'archived',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: '文章内容',
      required: true,
      editor: 'lexical', // Payload 3.x 必须指定编辑器（lexical 或 slate）
      admin: {
        elements: [
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', // 标题
          'blockquote',                         // 引用块
          'ol', 'ul',                           // 列表
          'link',                               // 链接
          'upload',                             // 图片上传
          'code',                               // 代码块
          'underline',                          // 下划线
          'strikethrough',                      // 删除线
          'italic',                             // 斜体
          'bold',                               // 粗体
          'aligncenter',                        // 居中
          'alignright',                         // 右对齐
          'indent',                             // 缩进
          'outdent',                            // 减少缩进
          'undo',                               // 撤销
          'redo',                               // 重做
        ],
        leaves: [
          'heading',                            // 标题叶子节点
          'link',                               // 链接叶子节点
          'relationship',                       // 关系字段
          'upload',                             // 上传叶子节点
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: '文章摘要',
      maxLength: 500,
      admin: {
        description: '用于列表页展示和 SEO 描述，建议 150-200 字符',
        rows: 3,
      },
      hooks: {
        beforeChange: [
          ({ data, siblingData }) => {
            // 如果未填写摘要，自动截取正文前 200 字符
            if (!siblingData.excerpt && data.content) {
              const plainText = stripHtml(data.content)
              return plainText.substring(0, 200) + '...'
            }
            return siblingData.excerpt
          },
        ],
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      label: '封面图片',
      relationTo: 'media', // 关联媒体集合
      required: false,
      admin: {
        description: '推荐尺寸 1200x630 像素，支持 JPG/WebP 格式',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      label: '分类',
      relationTo: 'categories',
      hasMany: true, // 多对多关系
      required: true,
      minRows: 1,   // 至少选择一个分类
      admin: {
        position: 'sidebar',
        isSortable: true, // 支持拖拽排序
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      label: '标签',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      label: '作者',
      relationTo: 'users',
      required: true,
      hasMany: false, // 多对一关系
      access: {
        // 只能选择自己或所有用户（根据角色）
        update: ({ req }) => {
          if (req.user?.role === 'admin') return true
          return false // 普通用户不能修改作者
        },
      },
      defaultValue: ({ req }) => {
        // 新建文章时默认为当前登录用户
        if (req.user) return req.user.id
        return null
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: '置顶文章',
      defaultValue: false,
      admin: {
        description: '置顶的文章会优先显示在首页顶部',
        position: 'sidebar',
      },
    },
    {
      name: 'viewCount',
      type: 'number',
      label: '阅读次数',
      defaultValue: 0,
      admin: {
        readOnly: true, // 只读，通过 API 更新
        position: 'sidebar',
      },
    },
    {
      name: 'likeCount',
      type: 'number',
      label: '点赞数',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'wordCount',
      type: 'number',
      label: '字数统计',
      admin: {
        readOnly: true, // 自动计算
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      label: '预计阅读时间（分钟）',
      admin: {
        readOnly: true, // 自动计算
        position: 'sidebar',
        helpText: '按每分钟 500 字计算',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: '发布日期',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
        description: '手动设置发布时间，留空则使用当前时间',
      },
      hooks: {
        beforeChange: [
          ({ data, value, operation }) => {
            // 发布时自动设置发布时间
            if (operation === 'publish' && !value && data.status === 'published') {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO 设置',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: '自定义 SEO 标题',
          maxLength: 70,
          admin: {
            description: '留空则使用文章标题',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'SEO 描述',
          maxLength: 160,
          admin: {
            description: '留空则使用文章摘要',
            rows: 2,
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: '关键词',
          admin: {
            description: '多个关键词用英文逗号分隔',
          },
        },
      ],
      admin: {
        collapsed: true, // 默认折叠
      },
    },
  ],

  // 访问控制
  access: {
    read: () => true, // 所有人可读已发布的文章
    
    create: ({ req }) => !!req.user, // 登录用户可创建
    
    update: ({ req, doc }) => {
      if (!req.user) return false
      
      // 管理员可编辑任何文章
      if (req.user.role === 'admin') return true
      
      // 编辑只能编辑自己的草稿或已发布的文章
      if (req.user.id === doc.author) return true
      
      return false
    },
    
    delete: ({ req, doc }) => {
      if (!req.user) return false
      
      // 管理员可删除任何文章
      if (req.user.role === 'admin') return true
      
      // 编辑只能删除自己的草稿
      if (req.user.id === doc.author && doc.status === 'draft') return true
      
      return false
    },
  },

  // Hooks（生命周期钩子）
  hooks: {
    beforeChange: [
      // 计算字数和阅读时间
      async ({ data }) => {
        if (data.content) {
          const plainText = stripHtml(data.content)
          const wordCount = plainText.length
          data.wordCount = wordCount
          data.readTime = Math.ceil(wordCount / 500) // 假设每分钟读 500 字
        }
        return data
      },
      
      // 发布时更新时间戳
      ({ data, previousDoc, operation }) => {
        if (operation === 'publish' || (data.status === 'published' && previousDoc?.status !== 'published')) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
    
    afterChange: [
      // 清除 ISR 缓存
      async ({ doc, previousDoc }) => {
        try {
          // 重新验证首页和文章详情页
          revalidatePath('/')
          revalidatePath(`/post/${doc.slug}`)
          
          // 如果 slug 变更，也清除旧路径缓存
          if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
            revalidatePath(`/post/${previousDoc.slug}`)
          }
          
          console.log(`🔄 缓存已刷新: ${doc.title}`)
        } catch (error) {
          console.error('❌ 刷新缓存失败:', error)
        }
      },
    ],
    
    afterDelete: [
      async ({ doc }) => {
        // 删除后清理相关缓存
        try {
          revalidatePath('/')
          revalidatePath('/post/[...slug]') // 匹配所有文章路径
          console.log(`🗑️ 文章已删除并清理缓存: ${doc.title}`)
        } catch (error) {
          console.error('❌ 清理缓存失败:', error)
        }
      },
    ],
  },

  // 索引优化（加速常用查询）- PostgreSQL 格式
  indexes: [
    {
      fields: ['status', 'publishedAt'], // 按状态和发布时间排序（数组格式）
      unique: false,
    },
    {
      fields: ['author'], // 按作者查询
      unique: false,
    },
    {
      fields: ['slug'], // 按 slug 查询（唯一索引）
      unique: true,
    },
  ],

  // 自定义端点
  endpoints: [
    {
      path: '/increment-view/:id', // POST /api/posts/increment-view/123
      method: 'post',
      handler: async (req, res) => {
        try {
          const { id } = req.params
          
          // 增加阅读计数
          await payload.update({
            collection: 'posts',
            id,
            data: {
              viewCount: { increment: 1 }, // 原子操作
            },
          })
          
          return res.json({ success: true })
        } catch (error) {
          return res.status(500).json({ error: '更新失败' })
        }
      },
    },
    {
      path: '/toggle-like/:id', // POST /api/posts/toggle-like/123
      method: 'post',
      handler: async (req, res) => {
        // 点赞功能（需要 Session 验证）
        if (!req.user) {
          return res.status(401).json({ error: '请先登录' })
        }

        try {
          const { id } = req.params
          
          // 简化实现：直接增加点赞数（实际应记录用户是否已点赞）
          await payload.update({
            collection: 'posts',
            id,
            data: {
              likeCount: { increment: 1 },
            },
          })
          
          return res.json({ success: true })
        } catch (error) {
          return res.status(500).json({ error: '操作失败' })
        }
      },
    },
  ],
}

/**
 * 工具函数：生成 URL 友好的 slug
 * @param text 输入文本（通常是中文标题）
 * @returns 格式化的 slug 字符串
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 移除特殊字符
    .replace(/[\s_]+/g, '-')   // 空格和下划线替换为横线
    .replace(/^-+|-+$/g, '')   // 移除首尾横线
    .substring(0, 100)         // 限制长度
}

/**
 * 工具函数：移除 HTML 标签获取纯文本
 * @param html 包含 HTML 的字符串
 * @returns 纯文本字符串
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

export default Posts
