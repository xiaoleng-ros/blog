'use client';

/**
 * 首页 - Butterfly 主题
 * 功能：展示文章列表、分页功能，对接 Payload CMS 真实数据
 */

import React, { useState, useEffect } from 'react';
import PostCard from '@/components/post/PostCard';
import Pagination from '@/components/ui/Pagination';
import { getPosts as getPostsFromCMS } from '@/lib/actions'; // 使用 CMS 数据获取函数
import type { Post } from '@/lib/types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<{ posts: Post[]; total: number; totalPages: number }>({ posts: [], total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载文章数据（从 CMS 获取）
  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  /**
   * 从 CMS 加载文章列表数据
   * @param page 页码
   */
  const loadData = async (page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      // 调用 Server Action 获取真实数据
      const data = await getPostsFromCMS({
        page,
        pageSize: 6, // 每页显示 6 篇
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });

      setPostsData(data);
    } catch (err) {
      console.error('❌ 加载文章失败:', err);
      setError('加载文章失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 处理分页切换
   * @param page 目标页码
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <div id="recent-posts" className="recent-posts nc">
            <div className="recent-post-items">
              {/* 错误状态 */}
              {error && (
                <div className="error-message">
                  <p>{error}</p>
                  <button onClick={() => loadData(currentPage)} className="retry-btn">
                    重试
                  </button>
                </div>
              )}

              {/* 加载状态 */}
              {isLoading && !error ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="skeleton-card">
                    <div className="skeleton-cover"></div>
                    <div className="skeleton-info">
                      <div className="skeleton-title"></div>
                      <div className="skeleton-meta"></div>
                      <div className="skeleton-text"></div>
                    </div>
                  </div>
                ))
              ) : !error ? (
                /* 文章卡片列表 */
                postsData.posts.length > 0 ? (
                  postsData.posts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={index}
                      layout={3} // 左右交替布局
                    />
                  ))
                ) : (
                  /* 空状态 */
                  <div className="empty-state">
                    <p>暂无文章</p>
                    <span>快去后台发布第一篇文章吧！📝</span>
                  </div>
                )
              ) : null}
            </div>

            {/* 分页组件 */}
            {!isLoading && !error && postsData.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={postsData.totalPages}
                onPageChange={handlePageChange}
              />
            )}
      </div>

      <style jsx global>{`
        /* 首页样式 */
        .home-page {
          min-height: 100vh;
          padding-top: 80px;
        }

        .recent-posts.nc {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .recent-post-items {
          display: flex;
          flex-direction: column;
        }

        /* 错误提示 */
        .error-message {
          text-align: center;
          padding: 40px 20px;
          color: var(--light-red, #F47466);
        }

        .error-message p {
          font-size: 1.1em;
          margin-bottom: 15px;
        }

        .retry-btn {
          padding: 8px 24px;
          background: var(--theme-color, #49B1F5);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.95em;
          transition: all 0.3s ease;
        }

        .retry-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
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

        .empty-state span {
          font-size: 0.95em;
        }

        /* 骨架屏 */
        .skeleton-card {
          display: flex;
          gap: 20px;
          padding: 20px;
          background: var(--card-bg);
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .skeleton-cover {
          width: 45%;
          height: 220px;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 25%
          );
          background-size: 200% 100%;
          border-radius: 12px;
          animation: shimmer 1.5s infinite;
        }

        .skeleton-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .skeleton-title {
          height: 28px;
          width: 80%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 25%
          );
          background-size: 200% 100%;
          border-radius: 6px;
          animation: shimmer 1.5s infinite;
        }

        .skeleton-meta {
          height: 18px;
          width: 60%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 25%
          );
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s infinite;
        }

        .skeleton-text {
          height: 16px;
          width: 100%;
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 25%
          );
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* 响应式 */
        @media (max-width: 900px) {
          .recent-posts.nc {
            padding: 16px;
          }

          .skeleton-card {
            flex-direction: column;
          }

          .skeleton-cover {
            width: 100%;
            height: 200px;
          }
        }

        @media (max-width: 480px) {
        }
      `}</style>
    </div>
  );
}
