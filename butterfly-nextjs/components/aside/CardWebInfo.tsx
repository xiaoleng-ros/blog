'use client';

/**
 * CardWebInfo 网站信息卡片
 * 显示总文章数、最后更新时间、网站运行时长
 */

import React, { useState, useEffect } from 'react';
import { posts } from '@/lib/data';

interface CardWebInfoProps {
  postCount?: boolean;
  lastPushDate?: boolean;
  runtimeDate?: string;
  enable?: boolean;
}

export default function CardWebInfo({
  postCount = true,
  lastPushDate = true,
  runtimeDate = '2025-01-01',
  enable = true,
}: CardWebInfoProps) {
  const [runtime, setRuntime] = useState({ days: 0, hours: 0, minutes: 0 });

  // 计算运行时长
  useEffect(() => {
    const calculateRuntime = () => {
      const startDate = new Date(runtimeDate);
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      
      setRuntime({ days, hours, minutes });
    };

    calculateRuntime();

    // 每分钟更新一次
    const interval = setInterval(calculateRuntime, 60000);
    return () => clearInterval(interval);
  }, [runtimeDate]);

  if (!enable) return null;

  // 获取最后更新日期
  const lastUpdateDate = posts.length > 0
    ? [...posts].sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())[0]?.updated
    : null;

  const formatLastUpdate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="card-widget card-webinfo">
      <div className="item-headline">
        <i className="fas fa-chart-bar"></i>
        <span>站点信息</span>
      </div>

      <div className="web-info-content">
        {/* 文章总数 */}
        {postCount && (
          <div className="info-item">
            <span className="info-label">文章数目</span>
            <span className="info-value">{posts.length} 篇</span>
          </div>
        )}

        {/* 最后更新时间 */}
        {lastPushDate && lastUpdateDate && (
          <div className="info-item">
            <span className="info-label">最后更新</span>
            <span className="info-value">{formatLastUpdate(lastUpdateDate)}</span>
          </div>
        )}

        {/* 运行时长 */}
        {runtimeDate && (
          <div className="info-item runtime">
            <span className="info-label">运行时间</span>
            <span className="info-value runtime-value">
              <span className="runtime-number">{runtime.days}</span>
              <span className="runtime-unit">天</span>
              <span className="runtime-sep">{runtime.hours}</span>
              <span className="runtime-unit">时</span>
              <span className="runtime-sep">{runtime.minutes}</span>
              <span className="runtime-unit">分</span>
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .card-webinfo {
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

        /* 信息内容 */
        .web-info-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.03), rgba(0, 196, 182, 0.03));
          border-radius: 8px;
          border-left: 3px solid var(--theme-color);
        }

        .info-label {
          font-size: 0.88em;
          color: var(--meta-theme-color);
          font-weight: 500;
        }

        .info-value {
          font-size: 0.92em;
          color: var(--font-black);
          font-weight: 600;
        }

        /* 运行时长特殊样式 */
        .runtime-value {
          display: flex;
          align-items: baseline;
          gap: 3px;
        }

        .runtime-number {
          font-size: 1.15em;
          font-weight: 700;
          color: var(--theme-color);
          min-width: 22px;
          text-align: right;
        }

        .runtime-unit {
          font-size: 0.82em;
          color: var(--meta-theme-color);
        }

        .runtime-sep {
          color: var(--meta-theme-color);
          opacity: 0.5;
          margin: 0 2px;
        }

        /* 运行时长动画效果 */
        .runtime .runtime-number {
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}
