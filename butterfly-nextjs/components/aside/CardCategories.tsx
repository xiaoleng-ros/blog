'use client';

/**
 * CardCategories 分类列表卡片
 * 显示博客分类及其文章数量
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { categories as allCategories } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CardCategoriesProps {
  limit?: number;
  expand?: string | null | undefined | boolean;
  enable?: boolean;
}

export default function CardCategories({
  limit = 8,
  expand = null,
  enable = true,
}: CardCategoriesProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  if (!enable) return null;

  // 截取指定数量的分类
  const displayedCategories = limit > 0 ? allCategories.slice(0, limit) : allCategories;

  // 切换展开/折叠
  const toggleExpand = (name: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  return (
    <div className="card-widget card-categories">
      <div className="item-headline">
        <i className="fas fa-folder-open"></i>
        <span>分类</span>
      </div>

      <ul className="category-list">
        {displayedCategories.map((cat) => {
          const isExpanded = expandedItems.has(cat.name) || expand === true;
          
          return (
            <li key={cat.name} className={`category-item ${isExpanded ? 'expanded' : ''}`}>
              <Link 
                href={cat.path} 
                className="category-link"
                onClick={(e) => {
                  // 如果有子分类可以展开（当前数据结构没有子分类，预留扩展）
                  e.stopPropagation();
                }}
              >
                <span className="category-name">
                  <FontAwesomeIcon icon={faFolderOpen} className="folder-icon" />
                  {cat.name}
                </span>
                <span className="category-count">{cat.count || 0}</span>
              </Link>
              
              {/* 展开/折叠按钮（预留） */}
              {(expand === null || expand === false) && (
                <button
                  className="toggle-btn"
                  onClick={() => toggleExpand(cat.name)}
                  aria-label={`${isExpanded ? '收起' : '展开'} ${cat.name}`}
                >
                  <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />
                </button>
              )}
            </li>
          );
        })}
      </ul>

      {/* 显示更多提示 */}
      {limit > 0 && allCategories.length > limit && (
        <div class="more-hint">
          还有 {allCategories.length - limit} 个分类...
        </div>
      )}

      <style jsx>{`
        .card-categories {
          position: relative;
        }

        .item-headline {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 10px;
          margin-bottom: 14px;
          font-size: 1.15em;
          font-weight: 700;
          color: var(--font-color);
          border-bottom: 2px solid var(--theme-color);
        }

        .item-headline i {
          color: var(--theme-color);
          font-size: 0.95em;
        }

        /* 分类列表 */
        .category-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .category-item {
          position: relative;
          display: flex;
          align-items: center;
          padding: 3px 0;
          border-radius: 6px;
          transition: background 0.25s ease;
        }

        .category-item:hover {
          background: rgba(73, 177, 245, 0.04);
        }

        .category-link {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          text-decoration: none;
          color: var(--font-black);
          font-size: 0.92em;
          border-radius: 6px;
          transition: all 0.25s ease;
        }

        .category-link:hover {
          color: var(--theme-color);
          background: rgba(73, 177, 245, 0.06);
        }

        .category-name {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .folder-icon {
          color: var(--light-orange);
          font-size: 0.9em;
          flex-shrink: 0;
        }

        .category-count {
          flex-shrink: 0;
          background: rgba(73, 177, 245, 0.08);
          color: var(--theme-color);
          font-size: 0.82em;
          font-weight: 600;
          padding: 2px 9px;
          border-radius: 10px;
          min-width: 24px;
          text-align: center;
        }

        .toggle-btn {
          position: absolute;
          right: 4px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 6px;
          color: var(--meta-theme-color);
          font-size: 0.78em;
          opacity: 0;
          transition: all 0.25s ease;
          border-radius: 4px;
        }

        .category-item:hover .toggle-btn {
          opacity: 1;
        }

        .toggle-btn:hover {
          color: var(--theme-color);
          background: rgba(73, 177, 245, 0.08);
        }

        .more-hint {
          text-align: center;
          font-size: 0.85em;
          color: var(--meta-theme-color);
          padding: 10px 0 4px;
          font-style: italic;
          opacity: 0.75;
        }
      `}</style>
    </div>
  );
}
