'use client';

/**
 * CardArchives 归档卡片
 * 按月度显示文章归档统计
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { getArchiveData } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CardArchivesProps {
  type?: string; // monthly | yearly
  format?: string;
  order?: number; // 1=asc, -1=desc
  limit?: number;
  enable?: boolean;
}

export default function CardArchives({
  type = 'monthly',
  format = 'MMMM YYYY',
  order = -1,
  limit = 8,
  enable = true,
}: CardArchivesProps) {
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());

  if (!enable) return null;

  const archiveData = getArchiveData();

  // 展平所有月份并限制数量
  let allMonths: Array<{ year: number; month: string; posts: any[] }> = [];
  
  archiveData.forEach(group => {
    group.months.forEach(m => {
      allMonths.push({ year: group.year, month: m.month, posts: m.posts });
    });
  });

  // 排序
  allMonths.sort((a, b) => {
    const dateA = new Date(a.month).getTime();
    const dateB = new Date(b.month).getTime();
    return (dateA - dateB) * order;
  });

  // 限制数量
  const displayedMonths = limit > 0 ? allMonths.slice(0, limit) : allMonths;

  // 切换展开/折叠
  const toggleMonth = (monthKey: string) => {
    setExpandedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(monthKey)) {
        newSet.delete(monthKey);
      } else {
        newSet.add(monthKey);
      }
      return newSet;
    });
  };

  return (
    <div className="card-widget card-archives">
      <div className="item-headline">
        <i className="fas fa-archive"></i>
        <span>归档</span>
      </div>

      <ul className="archive-list">
        {displayedMonths.map((item) => {
          const monthKey = `${item.year}-${item.month}`;
          const isExpanded = expandedMonths.has(monthKey);

          return (
            <li key={monthKey} className={`archive-month ${isExpanded ? 'expanded' : ''}`}>
              <button
                className="archive-header"
                onClick={() => toggleMonth(monthKey)}
              >
                <FontAwesomeIcon 
                  icon={isExpanded ? faChevronDown : faChevronRight} 
                  className="expand-icon" 
                />
                <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
                <span className="archive-label">{item.month}</span>
                <span className="archive-count">{item.posts.length} 篇</span>
              </button>

              {/* 文章列表 */}
              {isExpanded && (
                <ul className="archive-posts">
                  {item.posts.map(post => (
                    <li key={post.id}>
                      <Link href={`/post/${post.slug}`} className="archive-post-link">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {limit > 0 && allMonths.length > limit && (
        <div class="more-hint">更多归档...</div>
      )}

      <style jsx>{`
        .card-archives {
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

        /* 归档列表 */
        .archive-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .archive-month {
          margin-bottom: 4px;
          border-radius: 8px;
          overflow: hidden;
          transition: background 0.25s ease;
        }

        .archive-month:hover {
          background: rgba(73, 177, 245, 0.03);
        }

        .archive-header {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--font-black);
          font-size: 0.92em;
          font-weight: 500;
          transition: all 0.25s ease;
          border-radius: 8px;
          text-align: left;
        }

        .archive-header:hover {
          background: rgba(73, 177, 245, 0.06);
          color: var(--theme-color);
        }

        .expand-icon {
          width: 16px;
          height: 16px;
          font-size: 0.78em;
          color: var(--meta-theme-color);
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .calendar-icon {
          color: var(--strong-cyan);
          font-size: 0.9em;
          flex-shrink: 0;
        }

        .archive-label {
          flex: 1;
          font-weight: 600;
        }

        .archive-count {
          flex-shrink: 0;
          font-size: 0.82em;
          color: var(--meta-theme-color);
          background: rgba(0, 196, 182, 0.08);
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 600;
        }

        /* 文章列表 */
        .archive-posts {
          list-style: none;
          padding: 0 12px 12px 36px;
          margin: 0;
          animation: slideDown 0.25s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }

        .archive-posts li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 6px;

          &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 11px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--theme-color);
            opacity: 0.5;
          }
        }

        .archive-post-link {
          color: var(--font-black);
          text-decoration: none;
          font-size: 0.87em;
          line-height: 1.7;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all 0.25s ease;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .archive-post-link:hover {
          color: var(--theme-color);
          background: rgba(73, 177, 245, 0.04);
          padding-left: 10px;
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
