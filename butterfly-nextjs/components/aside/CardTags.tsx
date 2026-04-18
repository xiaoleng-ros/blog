'use client';

/**
 * CardTags 标签云卡片
 * 显示博客标签云，字号根据文章数量动态变化
 */

import React from 'react';
import Link from 'next/link';
import { tags as allTags } from '@/lib/data';

interface CardTagsProps {
  limit?: number;
  color?: boolean;
  orderby?: string;
  order?: number;
  enable?: boolean;
}

export default function CardTags({
  limit = 40,
  color = false,
  orderby = 'random',
  order = 1,
  enable = true,
}: CardTagsProps) {
  if (!enable) return null;

  // 截取指定数量的标签
  let displayedTags = limit > 0 ? allTags.slice(0, limit) : allTags;

  // 排序处理
  if (orderby === 'name') {
    displayedTags.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN') * order);
  } else if (orderby === 'length') {
    displayedTags.sort((a, b) => ((a.count || 0) - (b.count || 0)) * order);
  }
  // random 保持原顺序（前端随机打乱）

  // 根据文章数量计算字号（范围: 12px - 20px）
  const getFontSize = (count: number | undefined): string => {
    if (!count || count <= 1) return '0.82em';
    if (count <= 3) return '0.88em';
    if (count <= 5) return '0.95em';
    if (count <= 8) return '1.05em';
    return '1.15em';
  };

  // 预定义的标签颜色数组
  const tagColors = [
    '#49B1F5', '#00c4b6', '#FF7242', '#F47466',
    '#9b59b6', '#3498db', '#e74c3c', '#2ecc71',
    '#f39c12', '#1abc9c', '#e67e22', '#95a5a6',
    '#34495e', '#16a085', '#27ae60', '#2980b9',
  ];

  // 获取标签颜色（基于名称哈希或自定义）
  const getTagColor = (index: number, name: string): string => {
    if (!color) return 'inherit';
    
    // 使用索引循环颜色
    return tagColors[index % tagColors.length];
  };

  return (
    <div className="card-widget card-tags">
      <div className="item-headline">
        <i className="fas fa-tags"></i>
        <span>标签</span>
      </div>

      <div className="tag-cloud">
        {displayedTags.map((tag, index) => (
          <Link
            key={tag.name}
            href={tag.path}
            className="tag-item"
            style={{
              fontSize: getFontSize(tag.count),
              '--tag-color': getTagColor(index, tag.name),
            } as React.CSSProperties}
          >
            {tag.name}
          </Link>
        ))}
      </div>

      <style jsx>{`
        .card-tags {
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

        /* 标签云容器 */
        .tag-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          line-height: 2;
        }

        /* 单个标签 */
        .tag-item {
          display: inline-block;
          padding: 3px 12px;
          border-radius: 15px;
          text-decoration: none;
          color: var(--font-black);
          background: rgba(73, 177, 245, 0.06);
          border: 1px solid transparent;
          transition: all 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          white-space: nowrap;
          line-height: 1.75;
          font-weight: 500;
        }

        .tag-item:hover {
          color: #fff !important;
          background: var(--tag-color, var(--theme-color)) !important;
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 4px 12px rgba(73, 177, 245, 0.25);
          border-color: transparent;
        }

        /* 有颜色时的样式 */
        .tag-item[style*="--tag-color"] {
          background: transparent;
          border-color: var(--tag-color);
          color: var(--tag-color);
          opacity: 0.85;
        }

        .tag-item[style*="--tag-color"]:hover {
          opacity: 1;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .tag-cloud {
            gap: 6px;
          }

          .tag-item {
            padding: 2px 10px;
            font-size: 0.9em !important;
          }
        }
      `}</style>
    </div>
  );
}
