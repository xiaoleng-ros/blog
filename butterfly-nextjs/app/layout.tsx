/**
 * 前台根布局
 * 功能：为博客前台页面提供统一的 HTML 结构、导航栏、侧边栏等
 * 
 * 重要说明：
 * - 此布局仅用于前台页面（首页、文章页等）
 * - Payload Admin 后台使用独立的 (payload)/layout.tsx，避免 <html> 标签冲突
 */

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import Rightside from "@/components/layout/Rightside";
import AsideContainer from "@/components/aside/AsideContainer";
import AsideWrapper from "@/components/aside/AsideWrapper";
import ClickEffect from "@/components/effects/ClickEffect";
import { SidebarProvider } from "@/components/contexts/SidebarContext";

export const metadata: Metadata = {
  title: "Butterfly Next.js Blog",
  description: "基于 Butterfly 主题的 Next.js 博客系统",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/favicon.ico" />
        <meta name="theme-color" content="#49B1F5" />
        <meta charSet="utf-8" />
        
        {/* 预连接字体资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      
      <body>
        {/* 点击特效 */}
        <ClickEffect type="text" text="🦋" enable={true} />

        <SidebarProvider>
          {/* 背景层 - 纯白色背景 */}
          <div id="web_bg" className="bg-animation" style={{
            background: '#FFFFFF',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -999,
          }} />

          {/* 移动端侧边栏 */}
          <Sidebar />

          {/* 主容器 */}
          <div id="body-wrap">
            {/* 导航栏 */}
            <Header />

            {/* 主要内容区 - 包含子页面和侧边栏 */}
            <main id="content-inner" className="layout">
              <div className="main-content">
                {children}
              </div>

              {/* 侧边栏（桌面端显示在右侧，文章详情页自动隐藏） */}
              <AsideWrapper />
            </main>

            {/* 页脚 */}
            <Footer
              owner="Butterfly"
              since={2025}
              showRuntime={true}
              footerImg={false}
            />
          </div>

          {/* 右侧工具栏 */}
          <Rightside />
        </SidebarProvider>
      </body>
    </html>
  );
}
