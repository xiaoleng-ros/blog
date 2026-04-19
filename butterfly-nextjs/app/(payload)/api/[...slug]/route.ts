/**
 * Payload REST API 路由处理器
 * 功能：处理所有 /api/* 的 REST API 请求
 * 
 * 重要说明：
 * - Payload CMS 3.x 使用独立的方法导出（REST_GET, REST_POST 等）
 * - 不再使用 handler() 包装函数
 */

import {
  REST_GET,
  REST_POST,
  REST_PATCH,
  REST_DELETE,
} from '@payloadcms/next/routes'
import config from '@/payload.config'

export const GET = REST_GET({ config })
export const POST = REST_POST({ config })
export const PATCH = REST_PATCH({ config })
export const DELETE = REST_DELETE({ config })
