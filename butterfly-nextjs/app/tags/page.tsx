'use client';

/**
 * 标签总览页
 * 以标签云形式展示所有标签
 */

import React from 'react';
import Link from 'next/link';
import { tags as allTags } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

export default function TagsPage() {
  // 预定义的标签颜色数组 - 更丰富的配色方案
  const tagColors = [
    { bg: 'rgba(73, 177, 245, 0.08)', color: '#49B1F5', hoverBg: 'rgba(73, 177, 245, 0.15)' },
    { bg: 'rgba(0, 196, 182, 0.08)', color: '#00c4b6', hoverBg: 'rgba(0, 196, 182, 0.15)' },
    { bg: 'rgba(255, 114, 66, 0.08)', color: '#FF7242', hoverBg: 'rgba(255, 114, 66, 0.15)' },
    { bg: 'rgba(244, 116, 102, 0.08)', color: '#F47466', hoverBg: 'rgba(244, 116, 102, 0.15)' },
    { bg: 'rgba(155, 89, 182, 0.08)', color: '#9b59b6', hoverBg: 'rgba(155, 89, 182, 0.15)' },
    { bg: 'rgba(52, 152, 219, 0.08)', color: '#3498db', hoverBg: 'rgba(52, 152, 219, 0.15)' },
    { bg: 'rgba(231, 76, 60, 0.08)', color: '#e74c3c', hoverBg: 'rgba(231, 76, 60, 0.15)' },
    { bg: 'rgba(46, 204, 113, 0.08)', color: '#2ecc71', hoverBg: 'rgba(46, 204, 113, 0.15)' },
    { bg: 'rgba(241, 196, 15, 0.08)', color: '#f1c40f', hoverBg: 'rgba(241, 196, 15, 0.12)' },
    { bg: 'rgba(26, 188, 156, 0.08)', color: '#1abc9c', hoverBg: 'rgba(26, 188, 156, 0.15)' },
    { bg: 'rgba(230, 126, 34, 0.08)', color: '#e67e22', hoverBg: 'rgba(230, 126, 34, 0.15)' },
    { bg: 'rgba(149, 165, 166, 0.08)', color: '#95a5a6', hoverBg: 'rgba(149, 165, 166, 0.15)' },
    { bg: 'rgba(52, 73, 94, 0.08)', color: '#34495e', hoverBg: 'rgba(52, 73, 94, 0.15)' },
    { bg: 'rgba(22, 160, 133, 0.08)', color: '#16a085', hoverBg: 'rgba(22, 160, 133, 0.15)' },
    { bg: 'rgba(39, 174, 96, 0.08)', color: '#27ae60', hoverBg: 'rgba(39, 174, 96, 0.15)' },
    { bg: 'rgba(41, 128, 185, 0.08)', color: '#2980b9', hoverBg: 'rgba(41, 128, 185, 0.15)' },
  ];

  // 根据文章数量计算字号（范围: 14px - 28px）
  const getFontSize = (count: number | undefined): string => {
    if (!count || count <= 1) return '0.92em';
    if (count <= 2) return '1em';
    if (count <= 3) return '1.1em';
    if (count <= 5) return '1.25em';
    if (count <= 6) return '1.42em';
    return '1.65em';
  };

  // 获取权重等级（用于视觉区分）
  const getWeight = (count: number | undefined): number => {
    if (!count) return 1;
    if (count >= 5) return 5;
    if (count >= 4) return 4;
    if (count >= 3) return 3;
    if (count >= 2) return 2;
    return 1;
  };

  return (
    <div className="tags-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">
          <FontAwesomeIcon icon={faTags} className="title-icon" />
          标签云
        </h1>
        <p className="page-description">共 {allTags.length} 个标签</p>
      </div>

      {/* 标签云容器 */}
      <div className="tag-cloud-container">
        <div className="tag-cloud">
          {allTags.map((tag, index) => {
            const colorScheme = tagColors[index % tagColors.length];
            const fontSize = getFontSize(tag.count);
            const weight = getWeight(tag.count);
            
            return (
              <Link
                key={tag.name}
                href={tag.path}
                className="tag-item"
                style={{
                  fontSize,
                  '--tag-bg': colorScheme.bg,
                  '--tag-color': colorScheme.color,
                  '--tag-hover-bg': colorScheme.hoverBg,
                  animationDelay: `${index * 50}ms`,
                } as React.CSSProperties}
              >
                <span className="tag-name">{tag.name}</span>
                <span className="tag-count">{tag.count || 0}</span>
              </Link>
            );
          })}
        </div>

        {/* 统计信息 */}
        <div className="tags-stats">
          <div className="stat-item">
            <span className="stat-label">最多文章</span>
            <span className="stat-value">
              {allTags.reduce((max, t) => ((t.count || 0) > (max.count || 0)) ? t : max).name}
            </span>
            <span className="stat-count">
              ({Math.max(...allTags.map(t => t.count || 0))} 篇)
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* 标签页样式 */
        .tags-page {
          max-width: 1100px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 45px;
        }

        .page-title {
          font-size: 2.2em;
          font-weight: 800;
          color: var(--font-color);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .title-icon {
          color: var(--theme-color);
          font-size: 0.9em;
        }

        .page-description {
          font-size: 1.05em;
          color: var(--meta-theme-color);
        }

        /* 标签云容器 */
        .tag-cloud-container {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 36px 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        .tag-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          align-items: center;
          line-height: 2;
          min-height: 200px;
        }

        /* 单个标签 */
        .tag-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 25px;
          text-decoration: none;
          background: var(--tag-bg);
          border: 1.5px solid transparent;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          white-space: nowrap;
          line-height: 1.35;
          font-weight: 600;
          animation: fadeInScale 0.4s ease-out both;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.75);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .tag-name {
          color: var(--tag-color);
        }

        .tag-count {
          font-size: 0.72em;
          opacity: 0.7;
          background: rgba(0, 0, 0, 0.05);
          padding: 2px 7px;
          border-radius: 10px;
          color: inherit;
        }

        .tag-item:hover {
          background: var(--tag-hover-bg) !important;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.1);
          border-color: var(--tag-color);
        }

        .tag-item:hover .tag-name {
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }

        /* 统计区域 */
        .tags-stats {
          margin-top: 30px;
          padding-top: 24px;
          border-top: 1px solid #eee;
          text-align: center;
        }

        .stat-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95em;
          color: var(--meta-theme-color);
        }

        .stat-label::after {
          content: ':';
        }

        .stat-value {
          color: var(--theme-color);
          font-weight: 700;
          font-size: 1.05em;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .tags-page {
            padding: 20px 15px;
          }

          .page-title {
            font-size: 1.7em;
          }

          .tag-cloud-container {
            padding: 24px 18px;
          }

          .tag-cloud {
            gap: 10px;
          }

          .tag-item {
            padding: 6px 14px;
            font-size: 0.95em !important;
          }
        }
      `}</style>
    </div>
  );
}
