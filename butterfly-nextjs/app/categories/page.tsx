'use client';

/**
 * 分类总览页
 * 以卡片网格形式展示所有分类
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

export default function CategoriesPage() {
  return (
    <div className="categories-page">
      {/* 页面标题 */}
      <div className="page-header">
        <h1 className="page-title">
          <FontAwesomeIcon icon={faFolderOpen} className="title-icon" />
          文章分类
        </h1>
        <p className="page-description">按分类浏览所有文章</p>
      </div>

      {/* 分类网格 */}
      <div className="category-grid">
        {categories.map((cat, index) => {
          // 为每个分类生成不同的渐变色
          const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
          ];
          
          return (
            <Link
              key={cat.name}
              href={cat.path}
              className="category-card"
              style={{
                '--card-gradient': gradients[index % gradients.length],
                animationDelay: `${index * 80}ms`,
              } as React.CSSProperties}
            >
              {/* 卡片背景装饰 */}
              <div className="card-bg-decoration" />
              
              {/* 图标区域 */}
              <div className="card-icon-wrapper">
                <FontAwesomeIcon icon={faFolderOpen} className="card-icon" />
              </div>

              {/* 信息区域 */}
              <div className="card-info">
                <h3 className="card-name">{cat.name}</h3>
                <p className="card-count">{cat.count || 0} 篇文章</p>
              </div>

              {/* 箭头指示 */}
              <span className="card-arrow">→</span>
            </Link>
          );
        })}
      </div>

      <style jsx global>{`
        /* 分类页样式 */
        .categories-page {
          max-width: 1100px;
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

        /* 分类网格 */
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* 单个分类卡片 */
        .category-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 28px 26px;
          border-radius: 16px;
          background: var(--card-bg);
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 背景装饰 */
        .card-bg-decoration {
          position: absolute;
          top: -30%;
          right: -15%;
          width: 140px;
          height: 140px;
          background: var(--card-gradient);
          border-radius: 50%;
          opacity: 0.08;
          transition: all 0.5s ease;
        }

        .category-card:hover .card-bg-decoration {
          transform: scale(1.3) translate(-10px, -10px);
          opacity: 0.15;
        }

        /* 图标 */
        .card-icon-wrapper {
          width: 56px;
          height: 56px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.08), rgba(0, 196, 182, 0.06));
          position: relative;
          z-index: 1;
          transition: all 0.35s ease;
        }

        .card-icon {
          font-size: 1.5em;
          color: var(--light-orange);
          transition: all 0.35s ease;
        }

        .category-card:hover .card-icon-wrapper {
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.15), rgba(0, 196, 182, 0.1));
          transform: scale(1.08) rotate(-5deg);
        }

        .category-card:hover .card-icon {
          color: #fff;
          text-shadow: 0 2px 8px rgba(73, 177, 245, 0.3);
        }

        /* 信息 */
        .card-info {
          flex: 1;
          z-index: 1;
        }

        .card-name {
          font-size: 1.25em;
          font-weight: 700;
          color: var(--font-color);
          margin-bottom: 6px;
          transition: color 0.3s ease;
        }

        .card-count {
          font-size: 0.92em;
          color: var(--meta-theme-color);
          margin: 0;
        }

        /* 箭头 */
        .card-arrow {
          font-size: 1.5em;
          color: var(--meta-theme-color);
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          z-index: 1;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
          border-color: transparent;
        }

        .category-card:hover .card-name {
          color: var(--theme-color);
        }

        .category-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--theme-color);
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .categories-page {
            padding: 20px 15px;
          }

          .page-title {
            font-size: 1.7em;
          }

          .category-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 16px;
          }

          .category-card {
            padding: 22px 20px;
          }

          .card-icon-wrapper {
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </div>
  );
}
