'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * SidebarContext 类型定义
 * 用于管理侧边栏的开关状态
 */
interface SidebarContextType {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

/**
 * 创建 Sidebar 上下文
 * 提供全局侧边栏状态管理能力
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * SidebarProvider 组件
 * 为子组件提供侧边栏状态管理的 Context Provider
 * 
 * @param children - 子组件
 */
export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  /** 打开侧边栏 */
  const openSidebar = useCallback(() => setIsOpen(true), []);

  /** 关闭侧边栏 */
  const closeSidebar = useCallback(() => setIsOpen(false), []);

  /** 切换侧边栏状态 */
  const toggleSidebar = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

/**
 * useSidebar Hook
 * 获取侧边栏上下文的便捷钩子
 * 必须在 SidebarProvider 内部使用
 * 
 * @returns SidebarContextType - 侧边栏状态和控制方法
 * @throws Error - 如果在 Provider 外部使用则抛出错误
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
