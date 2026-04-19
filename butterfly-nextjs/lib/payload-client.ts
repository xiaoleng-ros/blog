/**
 * Payload CMS 客户端初始化工具
 * 功能：创建全局唯一的 Payload 实例，供服务端组件和 API 路由使用
 */

import { getPayload } from 'payload'
import config from '../payload.config'

// 声明全局变量类型（避免重复初始化）
declare global {
  var payload: ReturnType<typeof getPayload> | undefined
}

/**
 * 获取 Payload 客户端实例（单例模式）
 * @returns Payload 实例对象
 * 
 * 使用场景：
 * - 服务端组件中获取数据
 * - API 路由中操作数据库
 * - Server Actions 中调用 CMS 功能
 */
async function getPayloadClient() {
  // 如果已存在实例则直接返回（开发环境热重载时保持单例）
  if (!global.payload) {
    global.payload = await getPayload({ config })
  }
  
  return global.payload
}

export default getPayloadClient
