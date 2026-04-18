'use client';

/**
 * PostToc 文章目录组件
 * 从 Markdown 内容中提取标题生成可交互的目录
 */

import React, { useState, useEffect, useCallback } from 'react';
import { generateHeadingId } from '@/lib/headingUtils';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3 | 4;
}

interface PostTocProps {
  content: string;
  show?: boolean;
}

export default function PostToc({ content, show = true }: PostTocProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // 导航栏高度常量（与 Header 组件高度一致）
  const HEADER_HEIGHT = 80;

  // 从 Markdown 内容中提取标题
  useEffect(() => {
    const items: TocItem[] = [];
    // 匹配 ## ### #### 标题
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length as 2 | 3 | 4;
      const text = match[2].replace(/[*_`#]/g, '').trim();

      if (text) {
        // 使用统一的 ID 生成函数
        const id = generateHeadingId(text);
        items.push({ id, text, level });
      }
    }

    setTocItems(items);
  }, [content]);

  // 滚动监听：更新当前高亮的目录项
  useEffect(() => {
    if (typeof window === 'undefined' || tocItems.length === 0) return;

    /**
     * 计算当前应该高亮的标题 ID
     * 算法：找到最后一个 offsetTop <= scrollY + HEADER_HEIGHT 的标题
     */
    const calculateActiveId = (): string => {
      const scrollPosition = window.scrollY + HEADER_HEIGHT + 20; // 额外加 20px 容差

      let currentId = '';

      for (const item of tocItems) {
        const element = document.getElementById(item.id);
        if (element) {
          if (element.offsetTop <= scrollPosition) {
            currentId = item.id;
          } else {
            break;
          }
        }
      }

      return currentId;
    };

    const handleScroll = () => {
      const newActiveId = calculateActiveId();
      if (newActiveId && newActiveId !== activeId) {
        setActiveId(newActiveId);
      }
    };

    // 初始化时执行一次
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tocItems]);

  // 点击目录项：平滑滚动到对应位置（考虑导航栏偏移）
  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // 计算目标位置：元素顶部位置 - 导航栏高度 - 额外间距
      const targetPosition = element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 10;

      // 立即更新高亮状态
      setActiveId(id);

      // 平滑滚动到计算后的位置
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  if (!show || tocItems.length === 0) return null;

  return (
    <div className="card-widget" id="card-toc">
      <div className="toc-header">
        <h3 className="toc-title">📑 目录</h3>
        <span className="toc-count">{tocItems.length} 个章节</span>
      </div>

      <nav className="toc-nav">
        <ol className="toc-list">
          {tocItems.map((item) => (
            <li key={item.id} className={`toc-item toc-level-${item.level}`}>
              <button
                className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                onClick={() => handleClick(item.id)}
                title={item.text}
              >
                <span className="toc-text">{item.text}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <style jsx>{`
        #card-toc {
          position: sticky;
          position: -webkit-sticky;
          top: 20px;
          transition: top 0.3s ease;
          background: var(--card-bg);
          border-radius: 12px;
          padding: 18px 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
          border: 1px solid rgba(73, 177, 245, 0.08);
        }

        .toc-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid var(--theme-color);
        }

        .toc-title {
          font-size: 1.1em;
          font-weight: 700;
          color: var(--font-color);
          margin: 0;
        }

        .toc-count {
          font-size: 0.82em;
          color: var(--meta-theme-color);
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.12), rgba(118, 75, 162, 0.12));
          padding: 3px 10px;
          border-radius: 10px;
          border: 1px solid rgba(73, 177, 245, 0.15);
        }

        /* 目录列表容器 */
        .toc-nav {
          max-height: calc(100vh - 220px);
          overflow-y: auto;
          padding-right: 6px;
          background: linear-gradient(to bottom, rgba(73, 177, 245, 0.02), transparent);
          border-radius: 8px;
          padding: 10px 10px 10px 6px;
        }

        /* 目录列表 */
        .toc-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .toc-item {
          position: relative;
        }

        .toc-link {
          display: block;
          width: 100%;
          padding: 8px 12px 8px 16px;
          color: var(--font-black);
          text-decoration: none;
          font-size: 0.9em;
          line-height: 1.6;
          border-left: 2px solid transparent;
          background: transparent;
          border-top: none;
          border-right: none;
          border-bottom: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
          position: relative;
          margin-bottom: 2px;
        }

        .toc-link:hover {
          color: var(--theme-color);
          border-left-color: var(--theme-color);
          background: linear-gradient(to right, rgba(73, 177, 245, 0.1), rgba(118, 75, 162, 0.05));
          transform: translateX(2px);
          box-shadow: 0 2px 8px rgba(73, 177, 245, 0.1);
        }

        .toc-link.active {
          color: #fff;
          border-left-color: var(--theme-color);
          background: linear-gradient(135deg, var(--theme-color), #764ba2);
          font-weight: 600;
          box-shadow: 0 3px 12px rgba(73, 177, 245, 0.3);
        }

        .toc-link.active::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
        }

        .toc-link.active .toc-text {
          color: #fff;
        }

        /* 层级缩进 */
        .toc-level-3 .toc-link {
          padding-left: 28px;
          font-size: 0.87em;
        }

        .toc-level-4 .toc-link {
          padding-left: 40px;
          font-size: 0.84em;
        }

        .toc-text {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* 移动端隐藏 */
        @media (max-width: 900px) {
          #card-toc {
            display: none;
          }
        }

        /* 滚动条美化 */
        .toc-nav::-webkit-scrollbar {
          width: 4px;
        }

        .toc-nav::-webkit-scrollbar-thumb {
          background: rgba(73, 177, 245, 0.2);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
