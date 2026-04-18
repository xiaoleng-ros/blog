'use client';

/**
 * PostRelated 相关文章推荐组件
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/types';

interface PostRelatedProps {
  posts: Post[];
}

export default function PostRelated({ posts }: PostRelatedProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="post-related">
      <h3 className="related-title">📚 相关文章推荐</h3>
      <div className="related-grid">
        {posts.map(post => (
          <Link key={post.id} href={`/post/${post.slug}`} className="related-card">
            {/* 封面图 */}
            {post.cover && post.cover_type === 'img' && (
              <div className="related-cover">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 280px"
                  className="cover-img"
                />
              </div>
            )}
            
            {/* 标题 */}
            <div className="related-info">
              <h4 className="related-post-title">{post.title}</h4>
              <time className="related-date" dateTime={post.date}>
                {post.date.split('T')[0]}
              </time>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .post-related {
          margin-top: 3em;
          padding-top: 2em;
          border-top: 1px solid #eee;
        }

        .related-title {
          font-size: 1.25em;
          font-weight: 700;
          color: var(--font-color);
          margin-bottom: 1.5em;
          padding-left: 12px;
          border-left: 4px solid var(--theme-color);
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .related-card {
          display: flex;
          gap: 14px;
          padding: 16px;
          background: var(--card-bg);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
          border: 1px solid transparent;
        }

        .related-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
          border-color: var(--theme-color);
        }

        /* 封面图 */
        .related-cover {
          width: 120px;
          height: 90px;
          flex-shrink: 0;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
        }

        .cover-img {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .related-card:hover .cover-img {
          transform: scale(1.08);
        }

        /* 信息区域 */
        .related-info {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .related-post-title {
          font-size: 0.95em;
          font-weight: 600;
          color: var(--font-color);
          line-height: 1.45;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .related-card:hover .related-post-title {
          color: var(--theme-color);
        }

        .related-date {
          font-size: 0.82em;
          color: var(--meta-theme-color);
        }

        @media (max-width: 768px) {
          .related-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .related-cover {
            width: 100px;
            height: 75px;
          }
        }
      `}</style>
    </section>
  );
}
