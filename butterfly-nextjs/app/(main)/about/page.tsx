'use client'

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1 className="page-title">关于我</h1>
        <p className="page-description">一个热爱技术的开发者</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <div className="about-avatar">
            <img src="/img/favicon.ico" alt="头像" />
          </div>
          <h2 className="about-name">Butterfly</h2>
          <p className="about-bio">
            基于 Butterfly 主题的 Next.js 博客系统，专注于前端技术分享与记录。
          </p>
        </div>

        <div className="about-info">
          <div className="info-item">
            <span className="info-label">技术栈</span>
            <span className="info-value">Next.js / React / TypeScript</span>
          </div>
          <div className="info-item">
            <span className="info-label">主题</span>
            <span className="info-value">Butterfly</span>
          </div>
          <div className="info-item">
            <span className="info-label">框架</span>
            <span className="info-value">Next.js 14+</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-page {
          max-width: 800px;
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
        }

        .page-description {
          font-size: 1.05em;
          color: var(--meta-theme-color);
        }

        .about-content {
          background: var(--card-bg);
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
        }

        .about-card {
          text-align: center;
          margin-bottom: 30px;
        }

        .about-avatar {
          width: 100px;
          height: 100px;
          margin: 0 auto 20px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--theme-color);
        }

        .about-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .about-name {
          font-size: 1.5em;
          font-weight: 700;
          color: var(--font-color);
          margin-bottom: 10px;
        }

        .about-bio {
          color: var(--meta-theme-color);
          line-height: 1.8;
        }

        .about-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 16px;
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .info-item:hover {
          background: rgba(73, 177, 245, 0.04);
        }

        .info-label {
          min-width: 80px;
          font-weight: 600;
          color: var(--font-color);
          font-size: 0.95em;
        }

        .info-value {
          color: var(--meta-theme-color);
          font-size: 0.92em;
        }

        @media (max-width: 768px) {
          .about-content {
            padding: 24px 16px;
          }

          .page-title {
            font-size: 1.7em;
          }
        }
      `}</style>
    </div>
  )
}
