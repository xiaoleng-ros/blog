/**
 * Categories 分类集合
 * 功能：管理文章分类，支持多级嵌套（父分类 → 子分类）
 */

import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    description: '管理文章分类，支持多级嵌套结构',
    defaultColumns: ['name', 'slug', 'parentCategory', 'postCount'],
  },

  // 字段定义
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '分类名称',
      required: true,
      minLength: 1,
      maxLength: 50,
      localized: true, // 支持多语言
      admin: {
        placeholder: '例如：前端开发、后端技术、生活随笔...',
        description: '将显示在导航栏和文章列表中',
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
        description: '用于生成分类 URL，留空将自动从名称生成',
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
      label: '分类描述',
      maxLength: 300,
      admin: {
        placeholder: '简要描述这个分类包含的内容...',
        rows: 3,
      },
    },
    {
      name: 'parentCategory',
      type: 'relationship',
      label: '父级分类',
      relationTo: 'categories', // 自引用关系
      hasMany: false,
      required: false,
      filterOptions: ({ id }) => {
        // 防止选择自己作为父级（避免循环引用）
        if (id) {
          return { id: { not_equals: id } }
        }
      },
      admin: {
        position: 'sidebar',
        description: '留空则为顶级分类，选择后将成为子分类',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: '图标名称',
      admin: {
        description: 'Font Awesome 图标名称，例如：fa-code、fa-book',
        width: '50%',
      },
    },
    {
      name: 'color',
      type: 'text',
      label: '主题颜色',
      defaultValue: '#49B1F5',
      admin: {
        width: '50%',
        description: '十六进制颜色值，用于标签样式',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: '排序权重',
      defaultValue: 0,
      admin: {
        description: '数字越小越靠前，相同数字按创建时间排序',
        step: 1,
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
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => !!req.user,
    delete: ({ req }) => req.user?.role === 'admin', // 仅管理员可删除
  },

  // Hooks
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        // 检查是否有子分类
        const children = await payload.find({
          collection: 'categories',
          where: { parentCategory: { equals: id } },
          limit: 1,
        })
        
        if (children.docs.length > 0) {
          throw new Error('请先删除或移动该分类下的所有子分类')
        }
        
        // 检查是否有关联的文章
        const posts = await payload.find({
          collection: 'posts',
          where: { categories: { contains: id } },
          limit: 1,
        })
        
        if (posts.docs.length > 0) {
          throw new Error('该分类下仍有文章，无法删除')
        }
      },
    ],
  },

  // 自定义端点
  endpoints: [
    {
      path: '/tree', // GET /api/categories/tree
      method: 'get',
      handler: async (req, res) => {
        try {
          // 获取所有分类并构建树形结构
          const categories = await payload.find({
            collection: 'categories',
            depth: 1, // 包含关系字段的数据
            sort: 'sortOrder',
          })

          const tree = buildTree(categories.docs)

          return res.json({ tree })
        } catch (error) {
          console.error('获取分类树失败:', error)
          return res.status(500).json({ error: '获取失败' })
        }
      },
    },
  ],
}

/**
 * 构建树形结构
 */
function buildTree(categories: any[], parentId: string | null = null): any[] {
  return categories
    .filter((cat) => String(cat.parentCategory) === String(parentId))
    .map((cat) => ({
      ...cat,
      children: buildTree(categories, cat.id),
    }))
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default Categories
