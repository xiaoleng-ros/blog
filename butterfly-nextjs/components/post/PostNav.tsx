'use client';

/**
 * PostNav 上下篇导航组件
 */

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/lib/types';

interface PostNavProps {
  prevPost: Post | null;
  nextPost: Post | null;
}

export default function PostNav({ prevPost, nextPost }: PostNavProps) {
  return (
    <nav className="post-nav" role="navigation" aria-label="文章导航">
      {/* 上一篇（左侧） */}
      <div className={`nav-item nav-prev ${!prevPost ? 'disabled' : ''}`}>
        {prevPost ? (
          <Link href={`/post/${prevPost.slug}`} className="nav-link">
            <FontAwesomeIcon icon={faAngleLeft} className="nav-icon" />
            <div className="nav-info">
              <span className="nav-label">上一篇</span>
              <span className="nav-title">{prevPost.title}</span>
            </div>
          </Link>
        ) : (
          <div className="nav-link">
            <FontAwesomeIcon icon={faAngleLeft} className="nav-icon" />
            <div className="nav-info">
              <span className="nav-label">上一篇</span>
              <span className="nav-title empty">已经是第一篇了</span>
            </div>
          </div>
        )}
      </div>

      {/* 下一篇（右侧） */}
      <div className={`nav-item nav-next ${!nextPost ? 'disabled' : ''}`}>
        {nextPost ? (
          <Link href={`/post/${nextPost.slug}`} className="nav-link">
            <div className="nav-info">
              <span className="nav-label">下一篇</span>
              <span className="nav-title">{nextPost.title}</span>
            </div>
            <FontAwesomeIcon icon={faAngleRight} className="nav-icon" />
          </Link>
        ) : (
          <div className="nav-link">
            <div className="nav-info">
              <span className="nav-label">下一篇</span>
              <span className="nav-title empty">已经是最后一篇了</span>
            </div>
            <FontAwesomeIcon icon={faAngleRight} className="nav-icon" />
          </div>
        )}
      </div>

      <style jsx>{`
        .post-nav {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 3em;
          padding-top: 2em;
          border-top: 1px solid #eee;
        }

        .nav-item {
          flex: 1;
          max-width: 48%;
        }

        .nav-item.disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          background: var(--card-bg);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid transparent;
        }

        .nav-link:hover:not(.disabled > .nav-link) {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          border-color: var(--theme-color);
        }

        /* 下一篇右对齐 */
        .nav-next .nav-link {
          flex-direction: row-reverse;
          text-align: right;
        }

        .nav-icon {
          font-size: 1.3em;
          color: var(--theme-color);
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .nav-prev:hover .nav-icon {
          transform: translateX(-4px);
        }

        .nav-next:hover .nav-icon {
          transform: translateX(4px);
        }

        .nav-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-label {
          font-size: 0.82em;
          color: var(--meta-theme-color);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .nav-title {
          font-size: 0.95em;
          font-weight: 600;
          color: var(--font-color);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .nav-title.empty {
          color: #ccc !important;
          font-style: italic;
        }

        .nav-prev:hover .nav-title:not(.empty),
        .nav-next:hover .nav-title:not(.empty) {
          color: var(--theme-color);
        }

        @media (max-width: 768px) {
          .post-nav {
            flex-direction: column;
            gap: 12px;
          }

          .nav-item {
            max-width: 100%;
          }

          .nav-link {
            padding: 14px 16px;
          }

          .nav-title {
            -webkit-line-clamp: 1;
          }
        }
      `}</style>
    </nav>
  );
}
