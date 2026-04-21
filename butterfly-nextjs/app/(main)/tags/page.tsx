'use client';

/**
 * 标签总览页
 * 功能：以标签云形式展示所有标签（从 Payload CMS 获取）
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getTags } from '@/lib/actions';
import type { Tag } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags } from '@fortawesome/free-solid-svg-icons';

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // 从 CMS 加载标签数据
  useEffect(() => {
    loadTags();
  }, []);

  /**
   * 加载标签列表
   */
  const loadTags = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getTags();
      setTags(data);
    } catch (err) {
      console.error('❌ 加载标签失败:', err);
      setError('加载标签失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

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

  // 找出文章最多的标签
  const getMostPopularTag = (): Tag | null => {
    if (tags.length === 0) return null;
    return tags.reduce((max, t) => ((t.count || 0) > (max.count || 0)) ? t : max);
  };

  return (
    <div className="tags-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">
          <FontAwesomeIcon icon={faTags} className="title-icon" />
          标签云
        </h1>
        <p className="page-description">
          {isLoading ? '加载中...' : `共 ${tags.length} 个标签`}
        </p>
      </div>

      {/* 错误状态 */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadTags} className="retry-btn">重试</button>
        </div>
      )}

      {/* 标签云容器 */}
      {!error && (
        <div className="tag-cloud-container">
          {/* 加载状态 */}
          {isLoading ? (
            <div className="loading-cloud">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton-tag"></div>
              ))}
            </div>
          ) : tags.length > 0 ? (
            <>
              <div className="tag-cloud">
                {tags.map((tag, index) => {
                  const colorScheme = tagColors[index % tagColors.length];
                  const fontSize = getFontSize(tag.count);
                  
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
                  <span className="stat-value">{getMostPopularTag()?.name || '-'}</span>
                  <span className="stat-count">({getMostPopularTag()?.count || 0} 篇)</span>
                </div>
              </div>
            </>
          ) : (
            /* 空状态 */
            <div className="empty-state">
              <p>暂无标签</p>
              <span>快去后台创建第一个标签吧！🏷️</span>
            </div>
          )}
        </div>
      )}

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

        /* 错误提示 */
        .error-message {
          text-align: center;
          padding: 40px;
          color: var(--light-red, #F47466);
        }

        .retry-btn {
          margin-top: 15px;
          padding: 8px 24px;
          background: var(--theme-color, #49B1F5);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        /* 标签云容器 */
        .tag-cloud-container {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 36px 32px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
        }

        /* 骨架屏 */
        .loading-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          min-height: 200px;
          align-items: center;
        }

        .skeleton-tag {
          width: 80px;
          height: 36px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 25%);
          background-size: 200% 100%;
          border-radius: 25px;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* 空状态 */
        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--meta-theme-color, #999);
        }

        .empty-state p {
          font-size: 1.3em;
          font-weight: 600;
          margin-bottom: 10px;
          color: var(--font-color, #333);
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
