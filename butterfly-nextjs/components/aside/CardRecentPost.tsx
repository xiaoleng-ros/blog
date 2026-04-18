'use client';

/**
 * CardRecentPost 最新文章卡片
 * 显示最近发布的文章列表
 */

import React from 'react';
import Link from 'next/link';
import { getRecentPosts } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

interface CardRecentPostProps {
  limit?: number;
  sortBy?: string;
  enable?: boolean;
}

export default function CardRecentPost({
  limit = 5,
  sortBy = 'date',
  enable = true,
}: CardRecentPostProps) {
  const posts = getRecentPosts(limit);

  if (!enable) return null;

  // 格式化日期显示
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return '今天';
    if (diffDays === 1) return '昨天';
    if (diffDays < 7) return `${diffDays}天前`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`;
    
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="card-widget card-recent-post">
      <div className="item-headline">
        <i className="fas fa-newspaper"></i>
        <span>最新文章</span>
      </div>
      
      <div className="recent-post-list">
        {posts.map((post) => (
          <Link key={post.id} href={`/post/${post.slug}`} className="recent-post-item">
            <div className="recent-post-info">
              <h4 className="recent-post-title" title={post.title}>
                {post.title}
              </h4>
              <time dateTime={post.date}>
                <FontAwesomeIcon icon={faClock} />
                {formatDisplayDate(post.date)}
              </time>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .card-recent-post {
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

        /* 文章列表 */
        .recent-post-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .recent-post-item {
          display: block;
          padding: 10px 12px;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.25s ease;
          border-left: 3px solid transparent;
        }

        .recent-post-item:hover {
          background: rgba(73, 177, 245, 0.04);
          border-left-color: var(--theme-color);
          transform: translateX(4px);
        }

        .recent-post-info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .recent-post-title {
          font-size: 0.92em;
          font-weight: 600;
          color: var(--font-color);
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.25s ease;
        }

        .recent-post-item:hover .recent-post-title {
          color: var(--theme-color);
        }

        .recent-post-item time {
          font-size: 0.82em;
          color: var(--meta-theme-color);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .recent-post-item time svg,
        .recent-post-item time :global(svg) {
          width: 12px;
          height: 12px;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
