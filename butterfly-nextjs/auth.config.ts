/**
 * NextAuth 认证配置
 * 功能：集成 Payload CMS 与 NextAuth.js v5 实现统一认证
 * 支持：邮箱密码登录、GitHub OAuth（可选）
 */

import type { DefaultSession, NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import payload from 'payload'

/**
 * 验证用户凭据
 * 通过 Payload API 查询用户信息并验证密码
 */
async function authorizeUser(email: string, password: string) {
  try {
    // 使用 Payload 内置的 login 方法验证凭据
    const result = await payload.login({
      collection: 'users',
      data: {
        email,
        password,
      },
    })

    if (result.user && result.token) {
      return {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name || result.user.email,
        role: result.user.role, // 自定义字段：角色
        image: result.user.avatar?.url || null,
        token: result.token,
      }
    }

    return null
  } catch (error) {
    console.error('❌ 登录验证失败:', error)
    return null
  }
}

export default {
  providers: [
    // 邮箱密码登录（默认启用）
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: '邮箱地址', type: 'email', placeholder: '请输入邮箱' },
        password: { label: '密码', type: 'password', placeholder: '请输入密码' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('请输入邮箱和密码')
        }

        const user = await authorizeUser(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) {
          throw new Error('邮箱或密码错误')
        }

        return user
      },
    }),

    // GitHub OAuth 登录（需要配置环境变量）
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
      ? [
          GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
              params: {
                scope: 'read:user user:email',
              },
            },
            profile(profile) {
              return {
                id: profile.id.toString(),
                name: profile.name || profile.login,
                email: profile.email,
                image: profile.avatar_url,
                role: 'editor', // OAuth 用户默认为编辑角色
              }
            },
          }),
        ]
      : []),
  ],

  // 回调函数配置
  callbacks: {
    /**
     * JWT 回调：将自定义字段添加到 Token 中
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.payloadToken = (user as any).token
      }
      return token
    },

    /**
     * Session 回调：将角色等信息传递给客户端
     */
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).id = token.sub
        ;(session.user as any).role = token.role
      }
      return session
    },

    /**
     * 授权回调：控制哪些用户可以登录
     */
    async signIn({ user }) {
      // 可以在这里添加额外的验证逻辑
      // 例如：只允许特定域名的邮箱登录
      // if (!user.email?.endsWith('@yourdomain.com')) {
      //   return false
      // }
      return true
    },
  },

  // 页面配置（自定义登录页面）
  pages: {
    signIn: '/admin/login',  // 自定义登录页路径
    signOut: '/admin/logout',
    error: '/admin/auth/error',
    newUser: '/admin/register', // 新用户注册页（可选）
  },

  // Session 配置
  session: {
    strategy: 'jwt', // 使用 JWT 策略（无状态，适合分布式部署）
    maxAge: 7 * 24 * 60 * 60, // 7 天有效期
    updateAge: 24 * 60 * 60,   // 每天更新一次
  },

  // 安全配置
  secret: process.env.NEXTAUTH_SECRET,

  // 事件监听（可选）
  events: {
    async signIn({ user }) {
      console.log(`✅ 用户登录成功: ${user.email} (${(user as any).role})`)
    },
    async signOut({ token }) {
      console.log(`👋 用户登出: ${token.email}`)
    },
  },

  // 调试模式（开发环境开启）
  debug: process.env.NODE_ENV === 'development',

} satisfies NextAuthConfig

// 扩展 NextAuth 的类型定义（用于 TypeScript）
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      role?: string
    } & DefaultSession['user']
  }

  interface User {
    role?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    payloadToken?: string
  }
}
