'use client';

/**
 * 文章详情页
 * 功能：展示完整文章内容、目录、版权信息、相关推荐等
 * 对接 Payload CMS 真实数据源
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PostContent from '@/components/post/PostContent';
import PostCopyright from '@/components/post/PostCopyright';
import PostNav from '@/components/post/PostNav';
import PostToc from '@/components/post/PostToc';
import {
  getPostBySlug,
  getAdjacentPosts,
} from '@/lib/actions';
import type { Post } from '@/lib/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faHistory,
  faInbox,
  faTag,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';

export default function PostDetail() {
  const params = useParams();
  const slug = params.slug as string;

  // 使用正确的 TypeScript 类型（修复之前的 any 类型问题）
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  /**
   * 从 CMS 加载文章详情数据
   */
  useEffect(() => {
    if (!slug) return;

    loadPostData(slug);
  }, [slug]);

  /**
   * 加载文章数据和上下文导航
   * @param postSlug 文章 slug
   */
  const loadPostData = async (postSlug: string) => {
    setLoading(true);
    setNotFound(false);
    setError(null);

    try {
      // 并行加载文章详情和上下篇文章（优化性能）
      const [postData, adjacentData] = await Promise.all([
        getPostBySlug(postSlug),
        getAdjacentPosts(postSlug),
      ]);

      if (!postData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setPost(postData);
      setPrevPost(adjacentData.prev);
      setNextPost(adjacentData.next);

      // 更新页面标题（SEO 优化）
      if (typeof document !== 'undefined') {
        document.title = `${postData.title} - Butterfly Blog`;
      }
    } catch (err) {
      console.error('❌ 加载文章失败:', err);
      setError('文章加载失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 加载状态
  if (loading) {
    return (
      <div className="post-page-loading">
        <div className="loading-banner"></div>
        <div className="loading-content">
          <div className="skeleton-line title"></div>
          <div className="skeleton-line meta"></div>
          <div className="skeleton-line content"></div>
          <div className="skeleton-line content short"></div>
          <div className="skeleton-line content"></div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error && !post) {
    return (
      <div className="post-error">
        <div className="error-icon">⚠️</div>
        <h2>加载失败</h2>
        <p>{error}</p>
        <button onClick={() => loadPostData(slug)} className="retry-btn">
          重试
        </button>
        <Link href="/" className="back-home-btn">返回首页</Link>
      </div>
    );
  }

  // 未找到文章
  if (notFound || !post) {
    return (
      <div className="post-not-found">
        <div className="not-found-icon">📄</div>
        <h2>文章未找到</h2>
        <p>抱歉，您访问的文章不存在或已被删除。</p>
        <Link href="/" className="back-home-btn">返回首页</Link>
      </div>
    );
  }

  return (
    <article className="post-page">
      {/* 顶部 Banner */}
      <header className="post-header">
        <div 
          className="post-bg" 
          style={{
            backgroundImage: post.cover && post.cover_type === 'img' 
              ? `url(${post.cover})` 
              : undefined,
            background: !post.cover || post.cover_type !== 'img'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : undefined,
          }}
        >
          <div className="post-bg-mask" />
          
          {/* 文章标题和元信息 */}
          <div className="post-info-wrapper">
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-meta-data">
              <span className="meta-item">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>

              <span className="meta-separator">|</span>

              <span className="meta-item">
                <FontAwesomeIcon icon={faHistory} />
                <time dateTime={post.updated}>
                  {new Date(post.updated).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </span>

              {post.categories.length > 0 && (
                <>
                  <span className="meta-separator">|</span>
                  <span className="meta-item categories">
                    <FontAwesomeIcon icon={faFolderOpen} />
                    {post.categories.map((cat, idx) => (
                      <React.Fragment key={cat.name}>
                        <Link href={cat.path}>{cat.name}</Link>
                        {idx < post.categories.length - 1 && <span>, </span>}
                      </React.Fragment>
                    ))}
                  </span>
                </>
              )}

              {post.tags.length > 0 && (
                <>
                  <span className="meta-separator">|</span>
                  <span className="meta-item tags">
                    <FontAwesomeIcon icon={faTag} />
                    {post.tags.map((tag, idx) => (
                      <React.Fragment key={tag.name}>
                        <Link href={tag.path}>#{tag.name}</Link>
                        {idx < post.tags.length - 1 && <span> </span>}
                      </React.Fragment>
                    ))}
                  </span>
                </>
              )}

              {(post.wordcount || post.min2read) && (
                <>
                  <span className="meta-separator">|</span>
                  <span className="meta-item word-count">
                    {post.wordcount && <span>{post.wordcount} 字</span>}
                    {post.min2read && <span>{post.min2read} 分钟</span>}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 文章主体内容 */}
      <div className="post-body-layout">
        {/* 左侧：文章内容 */}
        <main className="post-main-content">
          <PostContent content={post.content} />

          {/* 版权声明 */}
          <PostCopyright post={post} author="Butterfly Blog" />

          {/* 上下篇导航 */}
          <PostNav prevPost={prevPost} nextPost={nextPost} />

          {/* 评论区域占位 */}
          <section id="post-comment" className="comment-section">
            <h3 className="comment-title">💬 评论区</h3>
            <div className="comment-placeholder">
              <p>评论区加载中...</p>
              <p className="comment-hint">
                （评论系统待接入，可支持 Gitalk、Waline、Twikoo 等）
              </p>
            </div>
          </section>
        </main>

        {/* 右侧：文章目录 */}
        <aside className="post-aside">
          <PostToc content={post.content} show={true} />
        </aside>
      </div>

      <style jsx global>{`
        /* 文章详情页样式 */
        
        /* 加载状态 */
        .post-page-loading {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
        }

        .loading-banner {
          height: 300px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          margin-bottom: 20px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .loading-content {
          padding: 24px;
          background: var(--card-bg);
          border-radius: 12px;
        }

        .skeleton-line {
          height: 20px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 25%);
          background-size: 200% 100%;
          border-radius: 4px;
          animation: shimmer 1.5s infinite;
          margin-bottom: 16px;
        }

        .skeleton-line.title {
          height: 36px;
          width: 70%;
        }

        .skeleton-line.meta {
          height: 18px;
          width: 50%;
        }

        .skeleton-line.content {
          height: 16px;
          width: 100%;
        }

        .skeleton-line.content.short {
          width: 60%;
        }

        /* 错误状态 */
        .post-error {
          text-align: center;
          padding: 80px 20px;
        }

        .error-icon {
          font-size: 4em;
          margin-bottom: 20px;
        }

        .post-error h2 {
          font-size: 1.8em;
          color: var(--font-color);
          margin-bottom: 10px;
        }

        .post-error p {
          color: var(--light-red, #F47466);
          margin-bottom: 30px;
        }

        .retry-btn {
          display: inline-block;
          padding: 10px 28px;
          background: var(--theme-color, #49B1F5);
          color: #fff;
          border: none;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 15px;
        }

        .retry-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        /* 未找到 */
        .post-not-found {
          text-align: center;
          padding: 80px 20px;
        }

        .not-found-icon {
          font-size: 4em;
          margin-bottom: 20px;
        }

        .post-not-found h2 {
          font-size: 1.8em;
          color: var(--font-color);
          margin-bottom: 10px;
        }

        .post-not-found p {
          color: var(--meta-theme-color);
          margin-bottom: 30px;
        }

        .back-home-btn {
          display: inline-block;
          padding: 12px 32px;
          background: var(--theme-color);
          color: #fff;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-home-btn:hover {
          background: var(--btn-hover-color);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(73, 177, 245, 0.3);
        }

        /* 文章页面容器 */
        .post-page {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Banner 区域 */
        .post-header {
          margin-bottom: 30px;
        }

        .post-bg {
          position: relative;
          height: 400px;
          border-radius: 16px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .post-bg-mask {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.15),
            rgba(0, 0, 0, 0.55)
          );
        }

        .post-info-wrapper {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 40px 20px;
          max-width: 800px;
        }

        .post-title {
          font-size: 2.2em;
          font-weight: 800;
          color: #fff;
          line-height: 1.35;
          margin-bottom: 20px;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          letter-spacing: -0.5px;
        }

        .post-meta-data {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 0.92em;
          color: rgba(255, 255, 255, 0.9);
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        .meta-item a {
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          transition: all 0.3s ease;
          opacity: 0.95;
        }

        .meta-item a:hover {
          color: #fff;
          opacity: 1;
          text-decoration: underline;
        }

        .meta-separator {
          color: rgba(255, 255, 255, 0.4);
          margin: 0 4px;
        }

        /* 主体布局（双栏） */
        .post-body-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 30px;
          margin-top: 20px;
        }

        .post-main-content {
          min-width: 0;
          background: var(--card-bg);
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
        }

        .post-aside {
          position: relative;
        }

        /* 评论区 */
        .comment-section {
          margin-top: 3em;
          padding-top: 2em;
          border-top: 1px solid #eee;
        }

        .comment-title {
          font-size: 1.25em;
          font-weight: 700;
          color: var(--font-color);
          margin-bottom: 1em;
          padding-left: 12px;
          border-left: 4px solid var(--theme-color);
        }

        .comment-placeholder {
          text-align: center;
          padding: 60px 20px;
          color: var(--meta-theme-color);
          background: rgba(73, 177, 245, 0.03);
          border-radius: 12px;
          border: 2px dashed rgba(73, 177, 245, 0.15);
        }

        .comment-hint {
          margin-top: 10px;
          font-size: 0.88em;
          opacity: 0.75;
        }

        /* 响应式 */
        @media (max-width: 1024px) {
          .post-body-layout {
            grid-template-columns: 1fr 240px;
            gap: 20px;
          }
        }

        @media (max-width: 900px) {
          .post-body-layout {
            grid-template-columns: 1fr;
          }

          .post-aside {
            display: none; /* 移动端隐藏 TOC */
          }

          .post-bg {
            height: 320px;
          }

          .post-title {
            font-size: 1.65em;
          }

          .post-meta-data {
            font-size: 0.85em;
          }

          .post-main-content {
            padding: 24px 18px;
          }
        }

        @media (max-width: 480px) {
          .post-bg {
            height: 260px;
            border-radius: 12px;
          }

          .post-title {
            font-size: 1.4em;
          }

          .post-info-wrapper {
            padding: 30px 15px;
          }

          .post-meta-data {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .meta-separator {
            display: none;
          }
        }
      `}</style>
    </article>
  );
}
