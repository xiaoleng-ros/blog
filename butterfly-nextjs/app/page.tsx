'use client';

/**
 * 首页 - Butterfly 主题
 * 展示文章列表、Banner 区域、分页功能
 */

import React, { useState, useEffect } from 'react';
import PostCard from '@/components/post/PostCard';
import Pagination from '@/components/ui/Pagination';
import { getPosts } from '@/lib/utils';
import type { Post } from '@/lib/types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<{ posts: Post[]; total: number; totalPages: number }>({ posts: [], total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 加载文章数据
  useEffect(() => {
    loadData(currentPage);
  }, [currentPage]);

  // 加载数据函数
  const loadData = (page: number) => {
    setIsLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      const data = getPosts({
        page,
        pageSize: 6, // 每页显示 6 篇
        sortBy: 'date',
        sortOrder: 'desc',
      });
      setPostsData(data);
      setIsLoading(false);
    }, 300);
  };

  // 处理分页切换
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      {/* 文章列表区域 */}
      <main id="content-inner" className="layout">
        <div className="main-content">
          <div id="recent-posts" className="recent-posts nc">
            <div className="recent-post-items">
              {/* 加载状态 */}
              {isLoading ? (
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
              ) : (
                /* 文章卡片列表 */
                postsData.posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    index={index}
                    layout={3} // 左右交替布局
                  />
                ))
              )}
            </div>

            {/* 分页组件 */}
            {!isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={postsData.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>

      <style jsx global>{`
        /* 首页样式 */
        .home-page {
          min-height: 100vh;
          padding-top: 80px;
        }

        /* 内容区域 */
        #content-inner.layout {
          max-width: 1300px;
          margin: 0 auto 40px;
          padding: 0 20px;
          position: relative;
          z-index: 20;
        }

        .main-content {
          background: transparent;
          border-radius: 16px;
          overflow: hidden;
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
            #f0f0f0 75%
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
            #f0f0f0 75%
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
            #f0f0f0 75%
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
            #f0f0f0 75%
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
          #content-inner.layout {
            margin-top: 0;
          }

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
