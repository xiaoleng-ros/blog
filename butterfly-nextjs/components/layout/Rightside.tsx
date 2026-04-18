'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  faArrowUp,
  faBookOpen,
  faMoon,
  faSun,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * RightsideProps 接口定义 - 右侧工具栏组件属性类型
 * @property showScrollPercent - 是否显示滚动百分比（默认 true）
 * @property bottomOffset - 距离底部的偏移量，单位 px（默认 40）
 */
interface RightsideProps {
  showScrollPercent?: boolean;
  bottomOffset?: number;
}

/**
 * Rightside 右侧工具栏组件
 * 功能：固定在右下角的浮动工具栏，提供快捷操作按钮
 * 特性：
 * - 回到顶部（带滚动百分比显示）
 * - 阅读模式切换
 * - 亮色/暗色主题切换
 * - 侧边栏显隐切换
 * - Framer Motion 入场动画
 * - Hover tooltip 提示
 */
export default function Rightside({
  showScrollPercent = true,
  bottomOffset = 40,
}: RightsideProps) {
  // 滚动百分比状态（0-100）
  const [scrollPercent, setScrollPercent] = useState<number>(0);
  // 是否显示回到顶部按钮（滚动超过阈值后显示）
  const [showToTop, setShowToTop] = useState<boolean>(false);
  // 阅读模式激活状态
  const [isReadMode, setIsReadMode] = useState<boolean>(false);
  // 侧边栏隐藏状态
  const [isAsideHidden, setIsAsideHidden] = useState<boolean>(false);
  // 当前主题（light/dark），使用 next-themes 管理
  const { theme, setTheme } = useTheme();
  // 系统主题是否已加载完成（防止闪烁）
  const [mounted, setMounted] = useState<boolean>(false);

  /**
   * 组件挂载后设置 mounted 状态为 true
   * 用于确保主题渲染不会闪烁
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * 滚动事件处理函数
   * 功能：
   * 1. 计算当前滚动百分比：(scrollTop / (scrollHeight - clientHeight)) * 100
   * 2. 判断是否显示回到顶部按钮（滚动 > 300px 时显示）
   * 使用 useCallback 优化性能，避免不必要的重新创建
   */
  const handleScroll = useCallback(() => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // 计算滚动百分比，保留一位小数
    const percent = Math.round(
      (scrollTop / (scrollHeight - clientHeight)) * 100
    );
    setScrollPercent(percent);

    // 判断是否显示回到顶部按钮（滚动距离 > 300px）
    setShowToTop(scrollTop > 300);
  }, []);

  /**
   * 监听滚动事件
   * 在组件挂载时添加事件监听器，卸载时移除
   * 注意：使用 passive: true 提升滚动性能
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初始调用一次以设置初始状态
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /**
   * 回到顶部处理函数
   * 使用 window.scrollTo 实现平滑滚动到页面顶部
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * 阅读模式切换处理函数
   * 通过切换 body 的 'read-mode' 类来启用/禁用阅读模式
   * 后续可在 CSS 中定义 .read-mode 相关样式（如调整字体大小、行距等）
   */
  const toggleReadMode = () => {
    const newState = !isReadMode;
    setIsReadMode(newState);
    if (newState) {
      document.body.classList.add('read-mode');
    } else {
      document.body.classList.remove('read-mode');
    }
  };

  /**
   * 主题切换处理函数
   * 在 light 和 dark 主题之间循环切换
   * 使用 next-themes 的 setTheme 方法，会自动保存到 localStorage
   */
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  /**
   * 侧边栏显隐切换处理函数
   * 通过切换 body 的 'hide-aside' 类来控制侧边栏显示状态
   * 可配合 CSS 选择器 body.hide-aside aside { display: none; } 使用
   */
  const toggleAside = () => {
    const newState = !isAsideHidden;
    setIsAsideHidden(newState);
    if (newState) {
      document.body.classList.add('hide-aside');
    } else {
      document.body.classList.remove('hide-aside');
    }
  };

  /**
   * Framer Motion 入场动画配置
   * 从右侧滑入效果，带弹性缓动
   */
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  // 如果系统主题未加载完成，返回空元素避免闪烁
  if (!mounted) {
    return null;
  }

  return (
    <div
      id="rightside"
      style={{ position: 'fixed', bottom: bottomOffset, right: 0, zIndex: 100 }}
    >
      {/* 回到顶部按钮 - 条件渲染：滚动超过 300px 后显示 */}
      <motion.div
        id="to-top"
        className={`rightside-item ${showToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        data-tooltip="回到顶部"
        role="button"
        tabIndex={0}
        aria-label="回到顶部"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showToTop ? 1 : 0, scale: showToTop ? 1 : 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
        {/* 滚动百分比数字显示 */}
        {showScrollPercent && (
          <span className="scroll-percent">{scrollPercent}%</span>
        )}
      </motion.div>

      {/* 阅读模式切换按钮 */}
      <div
        className={`rightside-item ${isReadMode ? 'active' : ''}`}
        onClick={toggleReadMode}
        data-tooltip={isReadMode ? '退出阅读模式' : '进入阅读模式'}
        role="button"
        tabIndex={0}
        aria-label="切换阅读模式"
      >
        <FontAwesomeIcon icon={faBookOpen} />
      </div>

      {/* 主题切换按钮 */}
      <div
        className="rightside-item"
        onClick={toggleTheme}
        data-tooltip={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
        role="button"
        tabIndex={0}
        aria-label="切换主题"
      >
        <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
      </div>

      {/* 侧边栏显隐切换按钮 */}
      <div
        className={`rightside-item ${isAsideHidden ? 'active' : ''}`}
        onClick={toggleAside}
        data-tooltip={isAsideHidden ? '显示侧边栏' : '隐藏侧边栏'}
        role="button"
        tabIndex={0}
        aria-label="切换侧边栏"
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
    </div>
  );
}
