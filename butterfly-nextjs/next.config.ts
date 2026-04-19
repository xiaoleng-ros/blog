/**
 * Next.js 配置文件
 * 功能：配置 Payload CMS 集成、图片优化、安全设置等
 */

import type { NextConfig } from "next"
import { withPayload } from "@payloadcms/next/withPayload"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default withPayload(nextConfig)
