'use client'

import Sidebar from './Sidebar'
import { useSidebar } from '@/components/contexts/SidebarContext'

export default function SidebarWrapper() {
  const { isOpen, closeSidebar } = useSidebar()

  return <Sidebar isOpen={isOpen} onClose={closeSidebar} />
}
