'use client';

/**
 * CardAuthor 作者信息卡片
 * 显示头像、名称、描述、统计数据、社交链接、Follow 按钮
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface CardAuthorProps {
  avatar?: string;
  name?: string;
  description?: string;
  postCount?: number;
  categoryCount?: number;
  tagCount?: number;
  socialLinks?: Array<{
    icon: any;
    url: string;
    color?: string;
  }>;
  followButton?: {
    enable: boolean;
    icon: any;
    text: string;
    link: string;
  };
}

export default function CardAuthor({
  avatar = '/img/butterfly-icon.svg',
  name = 'Butterfly',
  description = '热爱前端开发，追求极致用户体验',
  postCount = 12,
  categoryCount = 5,
  tagCount = 15,
  socialLinks = [
    { icon: faGithub, url: 'https://github.com', color: '#24292e' },
    { icon: faEnvelope, url: 'mailto:hello@butterfly.dev', color: '#4a7dbe' },
  ],
  followButton = { enable: true, icon: faGithub, text: 'Follow Me', link: 'https://github.com' },
}: CardAuthorProps) {
  return (
    <div className="card-widget card-author">
      {/* 头像区域 */}
      <div className="author-avatar-wrapper">
        <Link href="/" className="avatar-link" title={name}>
          <Image
            src={avatar}
            alt={name}
            width={100}
            height={100}
            className="author-avatar"
          />
        </Link>
      </div>

      {/* 作者信息 */}
      <h3 className="author-name">{name}</h3>
      <p className="author-description">{description}</p>

      {/* 统计数据 */}
      <div className="site-data">
        <div className="data-item">
          <span className="data-count">{postCount}</span>
          <span className="data-label">文章</span>
        </div>
        <div className="data-separator">|</div>
        <div className="data-item">
          <span className="data-count">{categoryCount}</span>
          <span className="data-label">分类</span>
        </div>
        <div className="data-separator">|</div>
        <div className="data-item">
          <span className="data-count">{tagCount}</span>
          <span className="data-label">标签</span>
        </div>
      </div>

      {/* 社交图标 */}
      <div className="card-info-social-icons">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            title=""
            style={{ '--hover-color': social.color || 'var(--theme-color)' } as React.CSSProperties}
          >
            <FontAwesomeIcon icon={social.icon} />
          </a>
        ))}
      </div>

      {/* Follow 按钮 */}
      {followButton.enable && (
        <a
          href={followButton.link}
          target="_blank"
          rel="noopener noreferrer"
          id="card-info-btn"
          className="follow-btn"
        >
          <FontAwesomeIcon icon={followButton.icon} />
          <span>{followButton.text}</span>
        </a>
      )}

      <style jsx>{`
        .card-author {
          text-align: center;
        }

        /* 头像 */
        .author-avatar-wrapper {
          margin-bottom: 12px;
        }

        .avatar-link {
          display: inline-block;
          position: relative;
        }

        .author-avatar {
          width: 100px !important;
          height: 100px !important;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--theme-color);
          padding: 4px;
          transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          box-shadow: 0 4px 15px rgba(73, 177, 245, 0.2);
        }

        .avatar-link:hover .author-avatar {
          transform: rotate(360deg) scale(1.08);
          box-shadow: 0 6px 25px rgba(73, 177, 245, 0.35);
        }

        /* 名称 */
        .author-name {
          font-size: 1.57em;
          font-weight: 600;
          color: var(--font-color);
          margin-bottom: 8px;
          line-height: 1.25;
        }

        /* 描述 */
        .author-description {
          font-size: 0.9em;
          color: var(--meta-theme-color);
          line-height: 1.6;
          margin-bottom: 16px;
          padding: 0 10px;
        }

        /* 统计数据 */
        .site-data {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-bottom: 18px;
          padding: 14px 0;
          background: linear-gradient(135deg, rgba(73, 177, 245, 0.04), rgba(0, 196, 182, 0.04));
          border-radius: 10px;
        }

        .data-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .data-count {
          font-size: 1.35em;
          font-weight: 700;
          color: var(--theme-color);
          line-height: 1.15;
        }

        .data-label {
          font-size: 0.82em;
          color: var(--meta-theme-color);
        }

        .data-separator {
          color: #d0d0d0;
          font-weight: 300;
        }

        /* 社交图标 */
        .card-info-social-icons {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 18px;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--font-color);
          font-size: 1.35em;
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .social-icon:hover {
          transform: rotate(360deg) scale(1.12);
          color: var(--hover-color);
          background: rgba(73, 177, 245, 0.08);
        }

        /* Follow 按钮 */
        #card-info-btn {
          display: block;
          width: calc(100% - 10px);
          margin: 0 auto;
          padding: 0;
          background: var(--btn-bg);
          color: var(--btn-color);
          text-align: center;
          line-height: 2.45;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95em;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(73, 177, 245, 0.2);
        }

        #card-info-btn span {
          padding-left: 10px;
        }

        #card-info-btn:hover {
          background: var(--btn-hover-color);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 114, 66, 0.3);
        }
      `}</style>
    </div>
  );
}
