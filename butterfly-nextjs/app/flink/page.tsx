'use client';

/**
 * 友链页面
 * 以卡片网格形式展示所有友链
 */

import React from 'react';
import Image from 'next/image';
import { friendLinks } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export default function FlinkPage() {
  return (
    <div className="flink-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">
          <FontAwesomeIcon icon={faLink} className="title-icon" />
          友情链接
        </h1>
        <p className="page-description">与优秀的人同行，遇见更好的自己 ✨</p>
      </div>

      {/* 友链网格 */}
      <div className="flink-grid">
        {friendLinks.map((flink, index) => (
          <a
            key={flink.name}
            href={flink.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flink-card"
            style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
          >
            {/* 头像区域 */}
            <div className="flink-avatar-wrapper">
              <Image
                src={flink.avatar}
                alt={flink.name}
                width={80}
                height={80}
                className="flink-avatar"
              />
              {/* 在线状态指示 */}
              <span className="online-indicator" />
            </div>

            {/* 信息区域 */}
            <div className="flink-info">
              <h3 className="flink-name">{flink.name}</h3>
              <p className="flink-description">{flink.description}</p>
              <span className="flink-visit-btn">访问网站 →</span>
            </div>

            {/* 背景装饰 */}
            <div className="card-decoration" />
          </a>
        ))}
      </div>

      {/* 申请友链提示 */}
      <div className="apply-hint">
        <p>💡 想要交换友链？</p>
        <p>欢迎通过邮件或 GitHub Issues 联系我！</p>
      </div>

      <style jsx global>{`
        /* 友链页样式 */
        .flink-page {
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

        /* 友链网格 */
        .flink-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        /* 单个友链卡片 */
        .flink-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px 26px;
          background: var(--card-bg);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          border: 2px solid transparent;
          animation: fadeInUp 0.5s ease-out both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 头像 */
        .flink-avatar-wrapper {
          position: relative;
          flex-shrink: 0;
        }

        .flink-avatar {
          width: 80px !important;
          height: 80px !important;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid rgba(73, 177, 245, 0.15);
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        /* 在线状态指示 */
        .online-indicator {
          position: absolute;
          bottom: 3px;
          right: 3px;
          width: 14px;
          height: 14px;
          background: #27c93f;
          border: 2px solid var(--card-bg);
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(39, 201, 63, 0.35);
          animation: pulse-online 2s infinite;
        }

        @keyframes pulse-online {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }

        /* 信息区 */
        .flink-info {
          flex: 1;
          min-width: 0;
        }

        .flink-name {
          font-size: 1.2em;
          font-weight: 700;
          color: var(--font-color);
          margin-bottom: 8px;
          transition: color 0.3s ease;
        }

        .flink-description {
          font-size: 0.9em;
          color: var(--meta-theme-color);
          line-height: 1.5;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .flink-visit-btn {
          display: inline-block;
          font-size: 0.85em;
          color: var(--theme-color);
          font-weight: 600;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        /* 背景装饰 */
        .card-decoration {
          position: absolute;
          top: -40%;
          right: -10%;
          width: 160px;
          height: 160px;
          background: linear-gradient(135deg, var(--theme-color), var(--strong-cyan));
          border-radius: 50%;
          opacity: 0.04;
          pointer-events: none;
          transition: all 0.5s ease;
        }

        /* Hover 效果 */
        .flink-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 14px 36px rgba(73, 177, 245, 0.15);
          border-color: rgba(73, 177, 245, 0.2);
        }

        .flink-card:hover .flink-avatar {
          transform: rotate(360deg) scale(1.08);
          border-color: var(--theme-color);
          box-shadow: 0 6px 22px rgba(73, 177, 245, 0.25);
        }

        .flink-card:hover .flink-name {
          color: var(--theme-color);
        }

        .flink-card:hover .flink-visit-btn {
          opacity: 1;
          transform: translateX(0);
        }

        .flink-card:hover .card-decoration {
          transform: scale(1.4) translate(-8px, -8px);
          opacity: 0.07;
        }

        /* 申请提示 */
        .apply-hint {
          text-align: center;
          margin-top: 40px;
          padding: 24px;
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.04), rgba(0, 196, 182, 0.03));
          border-radius: 12px;
          border: 1px dashed rgba(73, 177, 245, 0.2);
        }

        .apply-hint p {
          margin: 6px 0;
          color: var(--meta-theme-color);
          font-size: 0.95em;
        }

        .apply-hint p:first-child {
          font-weight: 600;
          color: var(--font-black);
          font-size: 1.05em;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .flink-page {
            padding: 20px 15px;
          }

          .page-title {
            font-size: 1.7em;
          }

          .flink-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .flink-card {
            padding: 22px 20px;
          }

          .flink-avatar {
            width: 64px !important;
            height: 64px !important;
          }
        }
      `}</style>
    </div>
  );
}
