'use client';

/**
 * AsideWrapper 侧边栏包装组件
 * 功能：根据当前路由动态控制侧边栏显示
 * 在文章详情页（/post/[slug]）隐藏侧边栏卡片
 */

import React from 'react';
import { usePathname } from 'next/navigation';
import AsideContainer from './AsideContainer';

export default function AsideWrapper() {
  const pathname = usePathname();

  // 判断是否为文章详情页（匹配 /post/xxx 格式）
  const isPostDetailPage = /^\/post\/[^/]+$/.test(pathname);

  return <AsideContainer show={!isPostDetailPage} />;
}
