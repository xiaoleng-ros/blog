'use client'

import { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'

export default function SidebarWrapper() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  /* 打开侧边栏 */
  const openSidebar = useCallback(() => setIsSidebarOpen(true), [])

  /* 关闭侧边栏 */
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), [])

  /* 监听全局自定义事件，允许外部组件（如 Header 汉堡按钮）触发开关 */
  useEffect(() => {
    const handleOpen = () => openSidebar()
    const handleClose = () => closeSidebar()

    window.addEventListener('sidebar:open', handleOpen)
    window.addEventListener('sidebar:close', handleClose)

    return () => {
      window.removeEventListener('sidebar:open', handleOpen)
      window.removeEventListener('sidebar:close', handleClose)
    }
  }, [openSidebar, closeSidebar])

  return <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
}
