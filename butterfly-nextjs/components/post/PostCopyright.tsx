'use client';

/**
 * PostCopyright 文章版权声明组件
 */

import React from 'react';
import Link from 'next/link';

interface PostCopyrightProps {
  post: {
    title: string;
    slug: string;
    date: string;
  };
  author?: string;
  license?: string;
  licenseUrl?: string;
}

export default function PostCopyright({
  post,
  author = 'Butterfly Blog',
  license = 'CC BY-NC-SA 4.0',
  licenseUrl = 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
}: PostCopyrightProps) {
  const postUrl = typeof window !== 'undefined' ? `${window.location.origin}/post/${post.slug}` : '';

  return (
    <div className="post-copyright">
      <div className="copyright-content">
        <div className="copyright-item">
          <strong>📝 本文作者：</strong>
          <span>{author}</span>
        </div>

        <div className="copyright-item">
          <strong>📌 本文链接：</strong>
          <Link href={`/post/${post.slug}`} className="copyright-link">
            {postUrl || `/post/${post.slug}`}
          </Link>
        </div>

        <div className="copyright-item">
          <strong>📅 发布时间：</strong>
          <time dateTime={post.date}>{post.date.split('T')[0]}</time>
        </div>

        <div className="copyright-item">
          <strong>© 版权声明：</strong>
          <span>本文采用 </span>
          <a
            href={licenseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="license-link"
          >
            {license}
          </a>
          <span> 许可协议。转载请注明出处！</span>
        </div>
      </div>

      <style jsx>{`
        .post-copyright {
          margin: 2.5em 0;
          padding: 20px 24px;
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.04), rgba(0, 196, 182, 0.04));
          border-left: 4px solid var(--theme-color);
          border-radius: 0 12px 12px 0;
          position: relative;
          overflow: hidden;
        }

        [data-theme="dark"] .post-copyright {
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.08), rgba(0, 196, 182, 0.08));
        }

        .post-copyright::before {
          content: '©';
          position: absolute;
          top: -10px;
          right: -5px;
          font-size: 80px;
          color: var(--theme-color);
          opacity: 0.06;
          font-weight: bold;
          pointer-events: none;
        }

        .copyright-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .copyright-item {
          font-size: 0.9em;
          line-height: 1.6;
          color: var(--font-black);
        }

        .copyright-item strong {
          color: var(--font-color);
          margin-right: 6px;
        }

        .copyright-link,
        .license-link {
          color: var(--theme-color);
          text-decoration: none;
          border-bottom: 1px dashed var(--theme-color);
          transition: all 0.3s ease;
          word-break: break-all;
        }

        .copyright-link:hover,
        .license-link:hover {
          color: var(--light-orange);
          border-bottom-color: var(--light-orange);
        }

        @media (max-width: 768px) {
          .post-copyright {
            padding: 16px 18px;
            margin: 2em 0;
          }

          .copyright-item {
            font-size: 0.85em;
          }
        }
      `}</style>
    </div>
  );
}
