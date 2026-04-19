'use client';

/**
 * 归档页 - 按时间线展示所有文章
 * 功能：从 Payload CMS 获取真实归档数据
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getArchiveData as getArchiveFromCMS } from '@/lib/actions'; // 使用 CMS 数据
import type { ArchiveGroup } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function ArchivesPage() {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [archiveData, setArchiveData] = useState<ArchiveGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 从 CMS 加载归档数据
  useEffect(() => {
    loadArchiveData();
  }, []);

  /**
   * 加载归档数据
   */
  const loadArchiveData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getArchiveFromCMS();
      setArchiveData(data);

      // 默认展开所有年份
      setExpandedYears(new Set(data.map(g => g.year)));
    } catch (err) {
      console.error('❌ 加载归档失败:', err);
      setError('加载归档失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 切换年份展开/折叠状态
   * @param year 年份
   */
  const toggleYear = (year: number) => {
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  // 计算总文章数
  const getTotalPosts = (): number => {
    return archiveData.reduce(
      (sum, g) => sum + g.months.reduce((s, m) => s + m.posts.length, 0),
      0
    );
  };

  return (
    <div className="archive-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">
          <FontAwesomeIcon icon={faCalendarAlt} className="title-icon" />
          文章归档
        </h1>
        <p className="page-description">
          {isLoading ? '加载中...' : `共计 ${getTotalPosts()} 篇文章`}
        </p>
      </div>

      {/* 错误状态 */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadArchiveData} className="retry-btn">重试</button>
        </div>
      )}

      {/* 加载状态 */}
      {isLoading && !error ? (
        <div className="loading-timeline">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton-year"></div>
          ))}
        </div>
      ) : !error ? (
        /* 时间线容器 */
        archiveData.length > 0 ? (
          <div className="timeline-container">
            {archiveData.map((group) => {
              const isExpanded = expandedYears.has(group.year);
              const totalPosts = group.months.reduce((sum, m) => sum + m.posts.length, 0);

              return (
                <div key={group.year} className={`timeline-year ${isExpanded ? 'expanded' : ''}`}>
                  {/* 年份头部 */}
                  <button className="year-header" onClick={() => toggleYear(group.year)}>
                    <span className="year-toggle">
                      <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />
                    </span>
                    <span className="year-label">{group.year} 年</span>
                    <span className="year-count">{totalPosts} 篇</span>
                  </button>

                  {/* 月份列表 */}
                  {isExpanded && (
                    <div className="months-container">
                      {group.months.map((monthData) => (
                        <div key={monthData.month} className="month-group">
                          <div className="month-label">
                            <span className="month-dot" />
                            <span>{monthData.month}</span>
                            <span className="month-count">({monthData.posts.length})</span>
                          </div>

                          <ul className="post-list">
                            {monthData.posts.map(post => (
                              <li key={post.id}>
                                <Link href={`/post/${post.slug}`} className="archive-post-link">
                                  <span className="post-date">
                                    {new Date(post.date).toLocaleDateString('zh-CN', {
                                      month: '2-digit',
                                      day: '2-digit',
                                    })}
                                  </span>
                                  <span className="post-title">{post.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* 空状态 */
          <div className="empty-state">
            <p>暂无文章归档</p>
            <span>发布第一篇文章后这里会显示时间线！📅</span>
          </div>
        )
      ) : null}

      <style jsx global>{`
        /* 归档页样式 */
        .archive-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 40px;
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

        /* 骨架屏 */
        .loading-timeline {
          padding-left: 24px;
        }

        .skeleton-year {
          height: 80px;
          margin-bottom: 28px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 25%);
          background-size: 200% 100%;
          border-radius: 12px;
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

        /* 时间线 */
        .timeline-container {
          position: relative;
          padding-left: 24px;
        }

        /* 时间线竖线 */
        .timeline-container::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 8px;
          bottom: 8px;
          width: 3px;
          background: linear-gradient(to bottom, var(--theme-color), var(--strong-cyan));
          border-radius: 3px;
          opacity: 0.4;
        }

        /* 年份区块 */
        .timeline-year {
          margin-bottom: 28px;
          position: relative;
        }

        /* 年份圆点 */
        .timeline-year::before {
          content: '';
          position: absolute;
          left: -21px;
          top: 14px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--theme-color);
          border: 3px solid var(--card-bg);
          box-shadow: 0 0 10px rgba(73, 177, 245, 0.25);
          z-index: 2;
        }

        .year-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.06), rgba(0, 196, 182, 0.04));
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          width: 100%;
          text-align: left;
          color: var(--font-color);
          font-size: 1.15em;
          font-weight: 700;
        }

        .year-header:hover {
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.12), rgba(0, 196, 182, 0.08));
          transform: translateX(5px);
        }

        .year-toggle {
          font-size: 0.85em;
          color: var(--meta-theme-color);
          transition: transform 0.3s ease;
        }

        .year-label {
          flex: 1;
        }

        .year-count {
          font-size: 0.85em;
          color: var(--theme-color);
          background: rgba(73, 177, 245, 0.1);
          padding: 3px 12px;
          border-radius: 15px;
          font-weight: 600;
        }

        /* 月份容器 */
        .months-container {
          margin-top: 12px;
          animation: slideDown 0.35s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .month-group {
          margin-bottom: 20px;
          padding-left: 16px;
          border-left: 2px dashed rgba(73, 177, 245, 0.2);
          margin-left: 8px;
        }

        .month-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1em;
          font-weight: 600;
          color: var(--font-color);
          margin-bottom: 10px;
        }

        .month-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--strong-cyan);
          flex-shrink: 0;
        }

        .month-count {
          font-size: 0.85em;
          color: var(--meta-theme-color);
          font-weight: 400;
        }

        /* 文章列表 */
        .post-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .post-list li {
          margin-bottom: 6px;
        }

        .archive-post-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 14px;
          text-decoration: none;
          color: var(--font-black);
          border-radius: 8px;
          transition: all 0.25s ease;
          font-size: 0.92em;
        }

        .archive-post-link:hover {
          background: rgba(73, 177, 245, 0.06);
          color: var(--theme-color);
          transform: translateX(6px);
        }

        .post-date {
          flex-shrink: 0;
          font-size: 0.85em;
          color: var(--meta-theme-color);
          min-width: 48px;
        }

        .post-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .archive-page {
            padding: 20px 15px;
          }

          .page-title {
            font-size: 1.7em;
          }

          .timeline-container {
            padding-left: 18px;
          }

          .year-header {
            font-size: 1.05em;
            padding: 10px 14px;
          }

          .archive-post-link {
            font-size: 0.87em;
            padding: 7px 10px;
          }
        }
      `}</style>
    </div>
  );
}
