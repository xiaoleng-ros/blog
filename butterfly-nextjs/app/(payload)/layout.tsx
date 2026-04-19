/**
 * Payload Admin UI 根布局
 * 功能：为所有 Payload 路由提供独立的 HTML 结构，避免与前台根布局冲突
 * 
 * 技术说明：
 * - Payload CMS 的管理后台需要完整的 HTML 结构（html, head, body）
 * - 前台 app/layout.tsx 也包含 <html> 标签
 * - Next.js App Router 不允许多个 <html> 组件同时存在
 * 
 * 解决方案：
 * - 此布局作为 Payload 路由组的专用布局
 * - 使用 Payload 官方提供的 RootLayout 组件
 * - 该组件会自动处理 HTML 结构，确保与前台页面隔离
 */

import { RootLayout } from '@payloadcms/next/layouts'
import config from '@/payload.config'
import { importMap } from './admin/importMap'
import { handleServerFunctions } from './admin/serverFunction'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return RootLayout({
    children,
    config: Promise.resolve(await config),
    importMap,
    serverFunction: handleServerFunctions,
  })
}
