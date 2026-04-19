/**
 * Payload Admin UI 主页面
 * 功能：渲染完整的 Payload CMS 管理后台界面
 */

import { RootPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap'

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return RootPage({
    config: Promise.resolve(await config),
    importMap,
    params: Promise.resolve({
      segments: resolvedParams.segments || [],
    }),
    searchParams: Promise.resolve(resolvedSearchParams),
  })
}
