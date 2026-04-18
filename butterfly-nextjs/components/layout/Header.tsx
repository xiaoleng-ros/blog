'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import {
  faSearch,
  faBars,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { useSidebar } from '@/components/contexts/SidebarContext';
import styles from './Header.module.css';

/**
 * 导航项接口定义
 */
interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

/**
 * 社交链接接口定义
 */
interface SocialLink {
  icon: any;
  url: string;
  color?: string;
}

/**
 * Header 组件属性接口
 */
interface HeaderProps {
  siteTitle?: string;
  logo?: string;
  navItems?: NavItem[];
  socialLinks?: SocialLink[];
  fixed?: boolean;
}

/** 默认导航菜单配置 */
const defaultNavItems: NavItem[] = [
  { label: '首页', path: '/' },
  { label: '归档', path: '/archives' },
  { label: '分类', path: '/categories' },
  { label: '标签', path: '/tags' },
  { label: '友链', path: '/flink' },
];

/** 默认社交链接配置 */
const defaultSocialLinks: SocialLink[] = [
  { icon: faGithub, url: 'https://github.com', color: '#24292e' },
  { icon: faEnvelope, url: 'mailto:example@email.com', color: '#4a7dbe' },
];

/**
 * Header 导航栏组件
 * 
 * 功能特性：
 * - 固定定位，滚动时背景透明化
 * - 响应式布局（桌面端显示完整菜单，移动端显示汉堡按钮）
 * - 当前路由自动高亮
 * - 社交图标 hover 旋转动画
 * - 入场动画（从上方滑入）
 * 
 * @param siteTitle - 网站标题文字
 * @param logo - 网站 Logo 图片路径
 * @param navItems - 自定义导航菜单项数组
 * @param socialLinks - 自定义社交链接数组
 * @param fixed - 是否启用固定定位模式（默认 true）
 */
export default function Header({
  siteTitle = 'Butterfly Blog',
  logo,
  navItems = defaultNavItems,
  socialLinks = defaultSocialLinks,
  fixed = true,
}: HeaderProps) {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();
  
  /** 控制滚动状态，用于添加透明背景效果 */
  const [isScrolled, setIsScrolled] = useState(false);
  
  /** 控制移动端菜单是否展开 */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * 滚动事件处理函数
   * 当滚动距离超过 100px 时触发透明背景效果
   */
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 100);
  }, []);

  /**
   * 监听滚动事件
   * 组件挂载时添加监听器，卸载时移除，防止内存泄漏
   */
  useEffect(() => {
    if (fixed) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [fixed, handleScroll]);

  /**
   * 切换移动端菜单显示状态
   * 同时通过 Context 触发 Sidebar 打开/关闭
   */
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    toggleSidebar();
  };

  /**
   * 判断导航项是否为当前活跃路由
   * 支持精确匹配和前缀匹配（用于子页面）
   * 
   * @param path - 导航项路径
   * @returns 是否为当前活跃路由
   */
  const isActiveRoute = (path: string): boolean => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  /**
   * 根据 icon 字符串获取对应的 FontAwesome 图标对象
   * 支持 Font Awesome 的 class 名称格式
   * 
   * @param iconClass - 图标 class 名称（如 'fab fa-github'）
   * @returns 图标定义对象或 null
   */
  const getIconDefinition = (iconClass: string): any => {
    const iconMap: Record<string, any> = {
      'fab fa-github': faGithub,
      'fas fa-envelope': faEnvelope,
    };
    return iconMap[iconClass] || null;
  };

  return (
    <motion.header
      className={`${styles.nav} ${fixed && isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* 导航栏内容容器 */}
      <div className={styles.navContent}>
        {/* 左侧：网站标题/Logo 区域 */}
        <div className={styles.blogInfo}>
          <Link href="/" className={styles.siteName} aria-label="返回首页">
            {logo ? (
              <img src={logo} alt={siteTitle} className={styles.logo} />
            ) : (
              siteTitle
            )}
          </Link>
        </div>

        {/* 中间：导航菜单区域 */}
        <nav className={`${styles.menus} ${isMobileMenuOpen ? '' : styles.hideMenu}`} role="navigation" aria-label="主导航">
          <ul id="menus" className={styles.menuList}>
            {navItems.map((item) => (
              <li key={item.path} className={styles.menuItem}>
                <Link
                  href={item.path}
                  className={`${styles.menuLink} ${isActiveRoute(item.path) ? styles.active : ''}`}
                  aria-current={isActiveRoute(item.path) ? 'page' : undefined}
                >
                  {item.icon && (
                    <FontAwesomeIcon icon={getIconDefinition(item.icon)} className={styles.menuIcon} />
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 右侧：操作区域 */}
        <div className={styles.actions}>
          {/* 社交图标链接组 */}
          <div className={styles.socialIcons} aria-label="社交媒体链接">
            {socialLinks.map((social, index) => {
              return social.icon ? (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={`访问 ${social.url}`}
                  style={{ '--hover-color': social.color } as React.CSSProperties}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ) : null;
            })}
          </div>

          {/* 搜索按钮 */}
          <button
            className={styles.searchButton}
            aria-label="搜索"
            onClick={() => {
              console.log('搜索功能待实现');
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>

          {/* 移动端汉堡菜单按钮 */}
          <button
            className={styles.toggleMenu}
            aria-label="切换菜单"
            aria-expanded={isMobileMenuOpen}
            onClick={handleToggleMobileMenu}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
