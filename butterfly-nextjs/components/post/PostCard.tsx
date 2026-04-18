'use client';

/**
 * PostCard 文章卡片组件
 * 用于首页文章列表展示，支持多种布局模式
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faCalendarAlt, faHistory, faInbox, faTag } from '@fortawesome/free-solid-svg-icons';
import { Post } from '@/lib/types';
import { formatDate, generateExcerpt } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  index?: number; // 用于交替布局判断
  layout?: number; // 布局模式: 1=左图右文, 2=右图左文, 3=左右交替, 4=上图下文
}

export default function PostCard({ post, index = 0, layout = 3 }: PostCardProps) {
  const router = useRouter();

  // 处理文章卡片点击事件，导航到详情页
  const handlePostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/post/${post.slug}`);
  };

  // 确定封面位置（基于布局模式和索引）
  const getCoverPosition = () => {
    if (!post.cover || layout === 4) return 'full-width';
    if (layout === 1) return 'left';
    if (layout === 2) return 'right';
    // layout=3: 左右交替
    return index % 2 === 0 ? 'left' : 'right';
  };

  const coverPosition = getCoverPosition();
  const hasCover = post.cover && post.cover_type === 'img';
  const excerpt = post.excerpt || generateExcerpt(post.content, 200);

  return (
    <article className={`recent-post-item ${!hasCover ? 'no-cover' : ''}`} data-cover={coverPosition}>
      {/* 封面图区域 */}
      {hasCover && (
        <div className={`post_cover ${coverPosition}`}>
          <div onClick={handlePostClick} title={post.title} style={{ cursor: 'pointer' }}>
            <Image
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 45vw"
              className="post-bg"
            />
          </div>
        </div>
      )}

      {/* 文章信息区域 */}
      <div className="recent-post-info">
        {/* 标题 */}
        <div onClick={handlePostClick} className="article-title" title={post.title} style={{ cursor: 'pointer' }}>
          {(post.top || post.sticky && post.sticky > 0) && (
            <FontAwesomeIcon icon={faThumbtack} className="sticky" />
          )}
          {post.title}
        </div>

        {/* 元信息 */}
        <div className="article-meta-wrap">
          {/* 日期 */}
          <span className="post-meta-date">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span className="article-meta-label">发布于</span>
            <time dateTime={post.date} title={formatDate(post.date)}>
              {formatDate(post.date)}
            </time>
          </span>

          <span className="article-meta-separator">|</span>

          <span className="post-meta-date">
            <FontAwesomeIcon icon={faHistory} />
            <span className="article-meta-label">更新于</span>
            <time dateTime={post.updated} title={formatDate(post.updated)}>
              {formatDate(post.updated)}
            </time>
          </span>

          {/* 分类 */}
          {post.categories.length > 0 && (
            <>
              <span className="article-meta-separator">|</span>
              <span className="article-meta">
                <FontAwesomeIcon icon={faInbox} />
                {post.categories.map((cat, idx) => (
                  <React.Fragment key={cat.name}>
                    <Link href={cat.path} className="article-meta__categories">
                      {cat.name}
                    </Link>
                    {idx < post.categories.length - 1 && (
                      <span className="article-meta-link"> / </span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            </>
          )}

          {/* 标签 */}
          {post.tags.length > 0 && (
            <>
              <span className="article-meta-separator">|</span>
              <span className="article-meta tags">
                <FontAwesomeIcon icon={faTag} />
                {post.tags.map((tag, idx) => (
                  <React.Fragment key={tag.name}>
                    <Link href={tag.path} className="article-meta__tags">
                      {tag.name}
                    </Link>
                    {idx < post.tags.length - 1 && (
                      <span className="article-meta-link"> • </span>
                    )}
                  </React.Fragment>
                ))}
              </span>
            </>
          )}
        </div>

        {/* 摘要内容 */}
        {excerpt && (
          <div className="content" dangerouslySetInnerHTML={{ __html: excerpt }} />
        )}
      </div>

      <style jsx>{`
        .recent-post-item {
          display: flex;
          gap: 20px;
          padding: 20px;
          background: var(--card-bg);
          border-radius: 12px;
          margin-bottom: 20px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
        }

        .recent-post-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        /* 封面图样式 */
        .post_cover {
          flex-shrink: 0;
          width: 45%;
          height: 220px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
        }

        .post_cover a {
          display: block;
          width: 100%;
          height: 100%;
        }

        .post_cover .post-bg {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .recent-post-item:hover .post_cover .post-bg {
          transform: scale(1.08);
        }

        /* 布局方向控制 */
        .recent-post-item[data-cover="right"] {
          flex-direction: row-reverse;
        }

        .recent-post-item[data-cover="full-width"] {
          flex-direction: column;
        }

        .recent-post-item[data-cover="full-width"] .post_cover {
          width: 100%;
          height: 300px;
          margin-bottom: 15px;
        }

        /* 信息区域 */
        .recent-post-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-width: 0;
        }

        /* 标题样式 */
        .article-title {
          font-size: 1.35em;
          font-weight: 700;
          color: var(--font-color);
          text-decoration: none;
          line-height: 1.4;
          margin-bottom: 10px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .article-title:hover {
          color: var(--theme-color);
        }

        .article-title .sticky {
          color: var(--light-orange);
          margin-right: 5px;
          font-size: 0.85em;
        }

        /* 元信息样式 */
        .article-meta-wrap {
          font-size: 0.85em;
          color: var(--meta-theme-color);
          margin-bottom: 12px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 4px;
        }

        .post-meta-date,
        .article-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .article-meta-label {
          margin-left: 2px;
        }

        .article-meta-separator {
          margin: 0 8px;
          color: #d0d0d0;
        }

        .article-meta__categories,
        .article-meta__tags {
          color: var(--meta-theme-color);
          text-decoration: none;
          transition: color 0.3s ease;
          margin: 0 2px;
        }

        .article-meta__categories:hover,
        .article-meta__tags:hover {
          color: var(--theme-color);
        }

        .article-meta-link {
          color: #ccc;
        }

        /* 摘要内容 */
        .content {
          font-size: 0.92em;
          color: var(--font-black);
          line-height: 1.8;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          opacity: 0.85;
        }

        /* 无封面时的样式 */
        .no-cover .recent-post-info {
          width: 100%;
        }

        /* 移动端响应式 */
        @media (max-width: 768px) {
          .recent-post-item {
            flex-direction: column !important;
            padding: 15px;
          }

          .post_cover {
            width: 100% !important;
            height: 200px !important;
          }

          .article-title {
            font-size: 1.15em;
          }

          .article-meta-wrap {
            font-size: 0.82em;
            flex-wrap: wrap;
          }
        }
      `}</style>
    </article>
  );
}
