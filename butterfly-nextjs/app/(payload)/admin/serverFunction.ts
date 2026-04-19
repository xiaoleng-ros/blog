/**
 * Payload Server Function 代理
 * 功能：将 handleServerFunctions 包装为 Next.js Server Action
 * 
 * 技术说明：
 * - 必须使用 'use server' 指令标记
 * - 这样函数才能从服务端传递到客户端组件
 * - 客户端通过此函数调用服务端逻辑（表单状态、数据操作等）
 */

'use server'

import { handleServerFunctions as payloadHandleServerFunctions } from '@payloadcms/next/layouts'

export async function handleServerFunctions(args: Parameters<typeof payloadHandleServerFunctions>[0]) {
  return payloadHandleServerFunctions(args)
}
