/**
 * Payload Admin 404 页面
 * 功能：Admin 路由未匹配时显示的页面
 */

import { NotFoundPage } from '@payloadcms/next/views'
import config from '@/payload.config'
import { importMap } from '../importMap'

export default async function NotFound({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] } | null>
  searchParams: Promise<{ [key: string]: string | string[] } | null>
}) {
  const resolvedParams = params ? await params : { segments: [] }
  const resolvedSearchParams = searchParams ? await searchParams : {}

  return NotFoundPage({
    config: Promise.resolve(await config),
    importMap,
    params: Promise.resolve({
      segments: resolvedParams?.segments || [],
    }),
    searchParams: Promise.resolve(resolvedSearchParams),
  })
}
