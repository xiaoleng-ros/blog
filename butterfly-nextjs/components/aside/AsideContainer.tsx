'use client';

/**
 * AsideContainer 侧边栏容器
 * 右侧所有小卡片自上而下排列
 */

import React from 'react';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import CardAuthor from './CardAuthor';
import CardAnnouncement from './CardAnnouncement';
import CardRecentPost from './CardRecentPost';
import CardCategories from './CardCategories';
import CardTags from './CardTags';
import CardArchives from './CardArchives';
import CardWebInfo from './CardWebInfo';

interface AsideContainerProps {
  show?: boolean;
}

export default function AsideContainer({ show = true }: AsideContainerProps) {
  if (!show) return null;

  return (
    <aside id="aside-content" className="aside-content">
      {/* 所有卡片在右侧，自上而下排列 */}
      <div className="aside-right">
        {/* 作者卡片 */}
        <CardAuthor
          avatar="/img/butterfly-icon.svg"
          name="Butterfly Blog"
          description="热爱前端开发，追求极致用户体验 ✨"
          postCount={12}
          categoryCount={5}
          tagCount={15}
          followButton={{
            enable: true,
            icon: faGithub,
            text: 'Follow Me',
            link: 'https://github.com',
          }}
        />

        {/* 公告 */}
        <CardAnnouncement
          content={
            <>
              👋 欢迎来到我的博客！<br />
              这里记录着技术探索的点点滴滴 🦋<br />
              <span style={{ color: 'var(--theme-color)', fontWeight: 600 }}>
                持续更新中...
              </span>
            </>
          }
        />

        {/* 最新文章 */}
        <CardRecentPost limit={5} sortBy="date" />

        {/* 分类列表 */}
        <CardCategories limit={8} expand={null} />

        {/* 标签云 */}
        <CardTags limit={40} color={true} orderby="random" />

        {/* 归档 */}
        <CardArchives type="monthly" format="MMMM YYYY" order={-1} limit={8} />

        {/* 网站信息 */}
        <CardWebInfo
          postCount={true}
          lastPushDate={true}
          runtimeDate="2025-01-01"
        />
      </div>

      <style jsx global>{`
        /* 侧边栏容器 */
        #aside-content {
          width: 260px;
          flex-shrink: 0;
        }

        /* 右侧栏 - 所有卡片垂直排列 */
        .aside-right {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 80px;
        }

        /* 所有卡片通用样式 - 紧凑版 */
        .card-widget {
          position: relative;
          overflow: hidden;
          margin-bottom: 0;
          padding: 12px 14px;
          background: var(--card-bg);
          border-radius: 8px;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
          transition: all 0.25s ease;
          border: 1px solid rgba(0, 0, 0, 0.04);
        }

        .card-widget:hover {
          transform: translateY(-1px);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
        }

        /* 卡片标题行样式 */
        .card-widget .item-headline {
          font-size: 0.95em;
          padding-bottom: 8px;
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .card-widget .item-headline i {
          font-size: 0.9em;
        }

        /* 响应式布局 */
        @media (max-width: 1200px) {
          #aside-content {
            width: 220px;
          }
        }

        @media (max-width: 900px) {
          #aside-content {
            width: 100%;
            margin-top: 30px;
            padding-top: 25px;
            border-top: 1px solid #eee;
          }

          .aside-right {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 12px;
          }
        }

        @media (max-width: 600px) {
          .aside-right {
            grid-template-columns: 1fr;
          }
        }

        /* 隐藏侧边栏时的状态 */
        body.hide-aside #aside-content {
          display: none !important;
        }
      `}</style>
    </aside>
  );
}
