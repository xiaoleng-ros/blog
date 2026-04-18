'use client';

/**
 * 404 错误页面
 * 精美的 404 设计，提供返回首页入口
 */

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-page">
      {/* 背景装饰 */}
      <div className="bg-decoration">
        <div className="circle circle-1" />
        <div className="circle circle-2" />
        <div className="circle circle-3" />
      </div>

      {/* 主内容 */}
      <div className="not-found-content">
        {/* 404 数字 */}
        <div className="error-code">
          <span className="digit digit-1">4</span>
          <span className="digit digit-0">0</span>
          <span className="digit digit-2">4</span>
          
          {/* 装饰元素 */}
          <div className="code-decoration">
            <span className="deco-item deco-1">🦋</span>
            <span className="deco-item deco-2">✨</span>
            <span className="deco-item deco-3">💫</span>
          </div>
        </div>

        {/* 标题 */}
        <h1 className="error-title">页面走丢了</h1>

        {/* 描述 */}
        <p className="error-description">
          抱歉，您访问的页面不存在或已被移除。
          <br />
          可能是输入了错误的地址，或者该页面已迁移。
        </p>

        {/* 建议操作 */}
        <div className="suggestions">
          <div className="suggestion-item">
            <span className="suggestion-icon">🔍</span>
            <span>检查网址是否正确</span>
          </div>
          <div className="suggestion-item">
            <span className="suggestion-icon">📋</span>
            <span>尝试使用搜索功能</span>
          </div>
          <div className="suggestion-item">
            <span className="suggestion-icon">🏠</span>
            <span>返回首页重新开始</span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="action-buttons">
          <Link href="/" className="btn-primary">
            <span>← 返回首页</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary"
          >
            <span>→ 返回上页</span>
          </button>
        </div>

        {/* 底部装饰文字 */}
        <p className="footer-text">
          Butterfly Blog © {new Date().getFullYear()}
        </p>
      </div>

      <style jsx global>{`
        /* 404 页面样式 */
        .not-found-page {
          min-height: calc(100vh - 120px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 40px 20px;
        }

        /* 背景装饰圆圈 */
        .bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.06;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          background: var(--theme-color);
          top: -100px;
          right: -100px;
          animation: float 8s ease-in-out infinite;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          background: var(--strong-cyan);
          bottom: -80px;
          left: -60px;
          animation: float 10s ease-in-out infinite reverse;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          background: var(--light-orange);
          top: 40%;
          right: 15%;
          animation: float 6s ease-in-out infinite 1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }

        /* 主内容区 */
        .not-found-content {
          text-align: center;
          position: relative;
          z-index: 10;
          max-width: 560px;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 404 数字 */
        .error-code {
          font-size: 9em;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 16px;
          position: relative;
          user-select: none;
          background: linear-gradient(135deg, var(--theme-color) 0%, var(--strong-cyan) 50%, var(--light-orange) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -12px;
        }

        .digit {
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }

        .digit-1 { animation-delay: 0s; }
        .digit-0 { animation-delay: 0.15s; }
        .digit-2 { animation-delay: 0.3s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          25% { transform: translateY(-18px); }
          50% { transform: translateY(0); }
          75% { transform: translateY(-8px); }
        }

        .code-decoration {
          position: absolute;
          top: 10px;
          right: 30px;
          font-size: 1.5em;
        }

        .deco-item {
          display: inline-block;
          margin: 0 6px;
          opacity: 0.7;
          animation: spin 4s linear infinite;
        }

        .deco-1 { animation-delay: 0s; }
        .deco-2 { animation-delay: 1.3s; }
        .deco-3 { animation-delay: 2.6s; }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* 标题和描述 */
        .error-title {
          font-size: 2em;
          font-weight: 800;
          color: var(--font-color);
          margin-bottom: 14px;
        }

        .error-description {
          font-size: 1.05em;
          color: var(--meta-theme-color);
          line-height: 1.75;
          margin-bottom: 28px;
        }

        /* 建议列表 */
        .suggestions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
          align-items: center;
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 18px;
          background: rgba(73, 177, 245, 0.04);
          border-radius: 25px;
          font-size: 0.92em;
          color: var(--font-black);
        }

        .suggestion-icon {
          font-size: 1.1em;
        }

        /* 按钮组 */
        .action-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 36px;
          border-radius: 30px;
          font-size: 1em;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--theme-color), var(--strong-cyan));
          color: #fff;
          box-shadow: 0 6px 22px rgba(73, 177, 245, 0.28);
        }

        .btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 30px rgba(73, 177, 245, 0.38);
        }

        .btn-secondary {
          background: transparent;
          color: var(--font-black);
          border: 2px solid #e0e0e0;
        }

        .btn-secondary:hover {
          border-color: var(--theme-color);
          color: var(--theme-color);
          background: rgba(73, 177, 245, 0.04);
          transform: translateY(-3px);
        }

        /* 底部文字 */
        .footer-text {
          font-size: 0.88em;
          color: var(--meta-theme-color);
          opacity: 0.65;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .not-found-page {
            min-height: auto;
            padding: 60px 20px;
          }

          .error-code {
            font-size: 6em;
            letter-spacing: -8px;
          }

          .error-title {
            font-size: 1.55em;
          }

          .error-description {
            font-size: 0.95em;
          }

          .action-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 260px;
            margin: 0 auto;
          }

          .circle-1 {
            width: 250px;
            height: 250px;
          }

          .circle-2 {
            width: 180px;
            height: 180px;
          }

          .circle-3 {
            width: 130px;
            height: 130px;
          }
        }
      `}</style>
    </div>
  );
}
