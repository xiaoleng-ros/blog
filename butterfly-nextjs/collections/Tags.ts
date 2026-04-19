/**
 * Tags 标签集合
 * 功能：管理文章标签，支持自定义颜色和图标
 */

import { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
    description: '管理文章标签，用于内容分类和检索',
    defaultColumns: ['name', 'slug', 'color', 'postCount'],
  },

  // 字段定义
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '标签名称',
      required: true,
      minLength: 1,
      maxLength: 30,
      localized: true, // 支持多语言
      admin: {
        placeholder: '例如：JavaScript、React、TypeScript...',
        description: '将显示在文章详情页和标签云中',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL 别名 (Slug)',
      index: true,
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
        description: '用于生成标签 URL，留空将自动从名称生成',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value, operation }) => {
            if ((operation === 'create' || !value) && siblingData.name) {
              return generateSlug(siblingData.name)
            }
            return value || ''
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: '标签描述',
      maxLength: 200,
      admin: {
        placeholder: '简要说明这个标签的用途...',
        rows: 2,
      },
    },
    {
      name: 'color',
      type: 'text',
      label: '标签颜色',
      defaultValue: '#49B1F5',
      required: true,
      admin: {
        width: '50%',
        description: '十六进制颜色值，用于标签样式展示',
      },
      validate: (val: string) => {
        if (!/^#[0-9A-Fa-f]{6}$/.test(val)) {
          return '请输入有效的十六进制颜色值（如 #FF5733）'
        }
        return true
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: '图标',
      admin: {
        width: '50%',
        description: 'Font Awesome 图标类名，如 fa-js、fa-react',
        placeholder: 'fa-tag',
      },
    },
    {
      name: 'postCount',
      type: 'number',
      label: '关联文章数',
      defaultValue: 0,
      admin: {
        readOnly: true, // 自动计算
        position: 'sidebar',
      },
    },
  ],

  // 访问控制
  access: {
    read: () => true, // 所有人可读
    create: ({ req }) => !!req.user, // 登录用户可创建
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin', // 仅管理员可删除
  },

  // Hooks
  hooks: {
    beforeDelete: [
      async ({ id }) => {
        // 检查是否有关联的文章
        const posts = await payload.find({
          collection: 'posts',
          where: { tags: { contains: id } },
          limit: 1,
        })
        
        if (posts.docs.length > 0) {
          throw new Error('该标签仍被文章使用，无法删除')
        }
      },
    ],
    
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          console.log(`🏷️ 新建标签: ${doc.name}`)
        }
      },
    ],
  },

  // 自定义端点
  endpoints: [
    {
      path: '/cloud', // GET /api/tags/cloud
      method: 'get',
      handler: async (req, res) => {
        try {
          // 获取所有标签及其使用频率（用于生成标签云）
          const tags = await payload.find({
            collection: 'tags',
            where: { postCount: { greater_than: 0 } }, // 只返回有文章的标签
            sort: '-postCount', // 按使用量降序
            depth: 0,
            limit: 50, // 限制数量避免性能问题
          })

          return res.json({
            tags: tags.docs.map((tag) => ({
              id: tag.id,
              name: tag.name,
              slug: tag.slug,
              color: tag.color,
              count: tag.postCount,
            })),
          })
        } catch (error) {
          console.error('获取标签云失败:', error)
          return res.status(500).json({ error: '获取失败' })
        }
      },
    },
    {
      path: '/popular/:limit', // GET /api/tags/popular/10
      method: 'get',
      handler: async (req, res) => {
        try {
          const limit = parseInt(req.params.limit) || 10
          
          const tags = await payload.find({
            collection: 'tags',
            sort: '-postCount',
            limit,
          })

          return res.json({ popularTags: tags.docs })
        } catch (error) {
          return res.status(500).json({ error: '获取失败' })
        }
      },
    },
  ],
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default Tags
