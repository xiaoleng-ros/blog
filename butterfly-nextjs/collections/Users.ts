/**
 * Users 用户集合
 * 功能：定义用户数据模型、权限角色、认证配置
 * 角色：Admin（管理员）、Editor（编辑）、Viewer（访客）
 */

import { CollectionConfig } from 'payload'

// 定义用户角色枚举
export const UserRole = {
  ADMIN: 'admin',      // 管理员：拥有所有权限
  EDITOR: 'editor',    // 编辑：可创建/编辑文章，不能删除他人内容
  VIEWER: 'viewer',    // 访客：只读权限
} as const

export type UserRoleType = typeof UserRole[keyof typeof UserRole]

export const Users: CollectionConfig = {
  slug: 'users', // URL 路径和数据库表名
  auth: true,    // 启用内置认证功能
  admin: {
    // Admin UI 配置（中文化）
    useAsTitle: 'name', // 在列表中显示名称而非 ID
    description: '管理博客系统的用户账户和权限',
    defaultColumns: ['name', 'email', 'role', 'createdAt'], // 列表页显示的列
  },

  // 字段定义
  fields: [
    {
      name: 'name',
      type: 'text',
      label: '姓名', // 中文标签
      required: true,
      minLength: 2,
      maxLength: 50,
      admin: {
        placeholder: '请输入您的真实姓名或昵称',
        description: '将显示在文章作者位置',
      },
    },
    {
      name: 'role',
      type: 'select',
      label: '用户角色',
      required: true,
      defaultValue: 'editor', // 默认新注册用户为编辑
      options: [
        {
          label: '🔑 管理员 (Admin)',
          value: 'admin',
        },
        {
          label: '✏️ 编辑 (Editor)',
          value: 'editor',
        },
        {
          label: '👁️ 访客 (Viewer)',
          value: 'viewer',
        },
      ],
      admin: {
        description: '不同角色拥有不同的操作权限',
      },
      access: {
        // 只有管理员可以修改角色
        update: ({ req }) => {
          return req.user?.role === 'admin'
        },
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      label: '头像',
      relationTo: 'media', // 关联到媒体集合（后续创建）
      admin: {
        description: '建议尺寸 200x200 像素，支持 JPG/PNG 格式',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: '个人简介',
      maxLength: 500,
      admin: {
        placeholder: '介绍一下自己吧...',
      },
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: '社交链接',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'GitHub',
          admin: {
            placeholder: 'https://github.com/username',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X',
          admin: {
            placeholder: 'https://twitter.com/username',
          },
        },
        {
          name: 'website',
          type: 'text',
          label: '个人网站',
          admin: {
            placeholder: 'https://yourwebsite.com',
          },
        },
      ],
    },
    {
      name: 'preferences',
      type: 'group',
      label: '偏好设置',
      fields: [
        {
          name: 'language',
          type: 'select',
          label: '界面语言',
          defaultValue: 'zh-CN',
          options: [
            { label: '简体中文', value: 'zh-CN' },
            { label: 'English', value: 'en' },
          ],
        },
        {
          name: 'emailNotifications',
          type: 'checkbox',
          label: '接收邮件通知',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      label: '最后登录时间',
      admin: {
        readOnly: true, // 只读字段，自动更新
      },
      access: {
        update: () => false, // 禁止手动修改
      },
    },
  ],

  // 访问控制（权限配置）
  access: {
    // 读取权限：已登录用户可查看其他用户信息
    read: ({ req }) => !!req.user,
    
    // 创建权限：仅管理员可创建新用户（防止公开注册）
    create: ({ req }) => req.user?.role === 'admin',
    
    // 更新权限：
    // - 管理员可修改任何用户
    // - 普通用户只能修改自己的信息（除角色外）
    update: ({ req, id }) => {
      if (!req.user) return false
      
      // 管理员拥有完全权限
      if (req.user.role === 'admin') return true
      
      // 普通用户只能修改自己的资料
      return req.user.id === id
    },
    
    // 删除权限：仅管理员可删除用户
    delete: ({ req }) => req.user?.role === 'admin',
  },

  // Hooks（生命周期钩子）
  hooks: {
    // 创建前：验证邮箱格式
    beforeChange: [
      ({ data, operation }) => {
        if (operation === 'create' && data.email) {
          // 邮箱转小写存储（确保唯一性）
          data.email = data.email.toLowerCase().trim()
        }
        return data
      },
    ],
    
    // 创建后：记录日志
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          console.log(`✅ 新用户注册成功: ${doc.email} (角色: ${doc.role})`)
        } else if (operation === 'update') {
          console.log(`📝 用户信息更新: ${doc.email}`)
        }
      },
    ],
  },

  // 自定义端点（可选）
  endpoints: [
    {
      path: '/profile', // GET /api/users/profile
      method: 'get',
      handler: async (req, res) => {
        if (!req.user) {
          return res.status(401).json({ error: '请先登录' })
        }

        // 返回当前登录用户的完整信息
        const user = await req.payload.findByID({
          collection: 'users',
          id: req.user.id,
          depth: 0,
        })

        return res.json({ user })
      },
    },
  ],
}

export default Users
