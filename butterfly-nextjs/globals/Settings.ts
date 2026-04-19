/**
 * Settings 站点设置（Global）
 * 功能：全局站点配置，如名称、Logo、社交链接、SEO 默认值等
 * 特点：全局只有一条记录，通过 Admin UI 单独管理
 */

import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  admin: {
    group: '设置', // 在 Admin 导航中的分组名称
    description: '配置博客的全局信息，包括站点名称、Logo、社交链接等',
    // 自定义图标（可选）
    // icon: 'settings',
  },

  // 字段定义
  fields: [
    {
      name: 'siteInfo',
      type: 'group',
      label: '🌐 站点基本信息',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: '站点名称',
          required: true,
          defaultValue: 'Butterfly Blog',
          localized: true,
          admin: {
            description: '显示在浏览器标签页和页面标题中',
            width: '50%',
          },
        },
        {
          name: 'siteDescription',
          type: 'textarea',
          label: '站点描述',
          maxLength: 200,
          localized: true,
          defaultValue: '基于 Next.js 和 Payload CMS 构建的现代化博客系统',
          admin: {
            description: '用于 SEO 的 meta description 标签',
            rows: 2,
            width: '50%',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          label: '站点 Logo',
          relationTo: 'media',
          required: false,
          admin: {
            description: '建议尺寸 200x50 像素，支持 PNG/SVG 格式',
            width: '50%',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          label: '网站图标 (Favicon)',
          relationTo: 'media',
          required: false,
          admin: {
            description: '推荐尺寸 32x32 或 16x16 像素，支持 ICO/PNG 格式',
            width: '50%',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          label: '站点关键词',
          admin: {
            description: '多个关键词用英文逗号分隔，用于 SEO',
            placeholder: '博客,技术,前端,JavaScript,Next.js',
          },
        },
      ],
    },
    
    {
      name: 'authorInfo',
      type: 'group',
      label: '✍️ 作者/站长信息',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: '姓名/昵称',
          defaultValue: 'Admin',
          admin: {
            width: '33%',
          },
        },
        {
          name: 'avatar',
          type: 'upload',
          label: '头像',
          relationTo: 'media',
          admin: {
            width: '33%',
            description: '建议尺寸 200x200 像素',
          },
        },
        {
          name: 'bio',
          type: 'textarea',
          label: '个人简介',
          maxLength: 300,
          admin: {
            width: '34%',
            rows: 3,
          },
        },
      ],
    },

    {
      name: 'socialLinks',
      type: 'group',
      label: '🔗 社交媒体链接',
      fields: [
        {
          name: 'github',
          type: 'text',
          label: 'GitHub',
          admin: {
            placeholder: 'https://github.com/yourusername',
            width: '25%',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter / X',
          admin: {
            placeholder: 'https://twitter.com/yourusername',
            width: '25%',
          },
        },
        {
          name: 'email',
          type: 'text',
          label: '联系邮箱',
          admin: {
            placeholder: 'your@email.com',
            width: '25%',
          },
        },
        {
          name: 'wechat',
          type: 'text',
          label: '微信号',
          admin: {
            placeholder: 'your_wechat_id',
            width: '25%',
          },
        },
        {
          name: 'weibo',
          type: 'text',
          label: '微博',
          admin: {
            placeholder: 'https://weibo.com/yourid',
            width: '25%',
          },
        },
        {
          name: 'zhihu',
          type: 'text',
          label: '知乎',
          admin: {
            placeholder: 'https://www.zhihu.com/people/yourid',
            width: '25%',
          },
        },
        {
          name: 'bilibili',
          type: 'text',
          label: 'B站',
          admin: {
            placeholder: 'https://space.bilibili.com/yourid',
            width: '25%',
          },
        },
        {
          name: 'rss',
          type: 'text',
          label: 'RSS 订阅地址',
          admin: {
            placeholder: '/feed.xml',
            width: '25%',
          },
        },
      ],
    },

    {
      name: 'seoDefaults',
      type: 'group',
      label: '🔍 SEO 默认配置',
      fields: [
        {
          name: 'defaultMetaImage',
          type: 'upload',
          label: '默认分享图片',
          relationTo: 'media',
          admin: {
            description: '当文章未设置封面图时使用此图片，推荐尺寸 1200x630',
          },
        },
        {
          name: 'ogType',
          type: 'select',
          label: 'Open Graph 类型',
          options: [
            { label: '网站', value: 'website' },
            { label: '博客', value: 'blog' },
          ],
          defaultValue: 'blog',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'locale',
          type: 'select',
          label: '默认语言',
          options: [
            { label: '简体中文', value: 'zh_CN' },
            { label: '繁體中文', value: 'zh_TW' },
            { label: 'English', value: 'en_US' },
          ],
          defaultValue: 'zh_CN',
          admin: {
            width: '50%',
          },
        },
      ],
    },

    {
      name: 'displaySettings',
      type: 'group',
      label: '⚙️ 显示设置',
      fields: [
        {
          name: 'postsPerPage',
          type: 'number',
          label: '每页显示文章数',
          defaultValue: 10,
          min: 5,
          max: 50,
          admin: {
            description: '首页和列表页每页展示的文章数量',
            width: '33%',
          },
        },
        {
          name: 'enableComments',
          type: 'checkbox',
          label: '启用评论功能',
          defaultValue: true,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'enableDarkMode',
          type: 'checkbox',
          label: '启用暗黑模式',
          defaultValue: true,
          admin: {
            width: '34%',
          },
        },
        {
          name: 'codeHighlightTheme',
          type: 'select',
          label: '代码高亮主题',
          options: [
            { label: 'GitHub Dark', value: 'github-dark' },
            { label: 'One Dark', value: 'one-dark' },
            { label: 'Monokai', value: 'monokai' },
            { label: 'Solarized Light', value: 'solarized-light' },
          ],
          defaultValue: 'github-dark',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'dateFormat',
          type: 'select',
          label: '日期格式',
          options: [
            { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
            { label: 'YYYY年MM月DD日', value: 'YYYY年MM月DD日' },
            { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
            { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
          ],
          defaultValue: 'YYYY年MM月DD日',
          admin: {
            width: '50%',
          },
        },
      ],
    },

    {
      name: 'footerSettings',
      type: 'group',
      label: '📋 页脚配置',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          label: '版权声明文字',
          defaultValue: '© 2024 Butterfly Blog. All Rights Reserved.',
          admin: {
            description: '显示在页脚的版权信息，支持 HTML',
          },
        },
        {
          name: 'icpNumber',
          type: 'text',
          label: 'ICP 备案号',
          admin: {
            placeholder: '例如：京ICP备xxxxxxxx号-1',
            description: '中国大陆网站需要填写',
          },
        },
        {
          name: 'policeNumber',
          type: 'text',
          label: '公安备案号',
          admin: {
            placeholder: '例如：京公网安备 xxxxxxx号',
            description: '可选，用于公安备案',
          },
        },
        {
          name: 'customHTML',
          type: 'textarea',
          label: '自定义 HTML（页脚）',
          admin: {
            description: '可添加统计代码、第三方脚本等（需谨慎使用）',
            rows: 3,
          },
        },
      ],
    },

    {
      name: 'announcement',
      type: 'group',
      label: '📢 公告栏',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: '启用公告栏',
          defaultValue: false,
          admin: {
            width: '25%',
          },
        },
        {
          name: 'content',
          type: 'richText',
          label: '公告内容',
          editor: 'lexical', // Payload 3.x 必须指定编辑器
          admin: {
            width: '75%',
          },
        },
        {
          name: 'style',
          type: 'select',
          label: '公告样式',
          options: [
            { label: '信息蓝', value: 'info' },
            { label: '成功绿', value: 'success' },
            { label: '警告黄', value: 'warning' },
            { label: '错误红', value: 'error' },
          ],
          defaultValue: 'info',
        },
      ],
    },
  ],

  // 访问控制：仅管理员可修改
  access: {
    update: ({ req }) => req.user?.role === 'admin',
    read: () => true, // 所有人可读取
  },

  // Hooks
  hooks: {
    afterChange: [
      async ({ doc }) => {
        console.log('✅ 站点设置已更新')
        
        try {
          // 站点设置变更后刷新所有缓存
          const { revalidatePath } = await import('next/cache')
          revalidatePath('/')
          revalidatePath('/post/[slug]')
          console.log('🔄 已触发全站缓存刷新')
        } catch (error) {
          console.error('❌ 刷新缓存失败:', error)
        }
      },
    ],
  },
}

export default Settings
