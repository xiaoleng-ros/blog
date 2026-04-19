/**
 * NextAuth API 路由处理器
 * 功能：处理所有认证相关的 HTTP 请求
 * 路径：/api/auth/* (login, logout, callback, session, csrf, etc.)
 */

import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

// 创建 NextAuth 处理器实例
const handler = NextAuth(authConfig)

// 导出 GET 和 POST 方法处理器
export { handler as GET, handler as POST }
