'use client';

/**
 * 归档页 - 按时间线展示所有文章
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { getArchiveData } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function ArchivesPage() {
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  
  const archiveData = getArchiveData();

  // 默认展开所有年份
  React.useEffect(() => {
    setExpandedYears(new Set(archiveData.map(g => g.year)));
  }, []);

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

  return (
    <div className="archive-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">
          <FontAwesomeIcon icon={faCalendarAlt} className="title-icon" />
          文章归档
        </h1>
        <p className="page-description">
          共计 {archiveData.reduce((sum, g) => sum + g.months.reduce((s, m) => s + m.posts.length, 0), 0)} 篇文章
        </p>
      </div>

      {/* 时间线容器 */}
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
