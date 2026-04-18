'use client';

/**
 * CardAnnouncement 公告卡片
 * 显示站点公告信息
 */

import React from 'react';

interface CardAnnouncementProps {
  content?: React.ReactNode;
  enable?: boolean;
}

export default function CardAnnouncement({
  content = '👋 欢迎来到我的博客！这里记录着技术探索的点点滴滴。',
  enable = true,
}: CardAnnouncementProps) {
  if (!enable) return null;

  return (
    <div className="card-widget card-announcement">
      <div className="item-headline">
        <i className="fas fa-bullhorn"></i>
        <span>公告</span>
      </div>
      <div className="announcement-content">{content}</div>

      <style jsx>{`
        .card-announcement {
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

        .announcement-content {
          font-size: 0.92em;
          line-height: 1.75;
          color: var(--font-black);
          word-break: break-word;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
