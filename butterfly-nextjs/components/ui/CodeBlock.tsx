'use client';

/**
 * CodeBlock 代码块增强组件
 * 提供 PrismJS 语法高亮、复制功能、折叠/展开、全屏模式
 */

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopy,
  faCheck,
  faAngleDown,
  faAngleUp,
  faMaximize,
  faMinimize,
} from '@fortawesome/free-solid-svg-icons';

interface CodeBlockProps {
  language: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState(code);
  const [isLongCode, setIsLongCode] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  // 检测是否是长代码
  useEffect(() => {
    // 大约估算行数（每行约 80 字符）
    const estimatedLines = code.split('\n').length;
    if (estimatedLines > 15) {
      setIsLongCode(true);
    }
  }, [code]);

  // PrismJS 高亮
  useEffect(() => {
    async function highlight() {
      // 动态导入 PrismJS
      if (typeof window !== 'undefined') {
        try {
          const Prism = (await import('prismjs')).default;
          
          // 导入语言支持
          const lang = language.toLowerCase();
          const langMap: Record<string, string> = {
            js: 'javascript',
            ts: 'typescript',
            jsx: 'jsx',
            tsx: 'tsx',
            py: 'python',
            bash: 'bash',
            sh: 'bash',
            shell: 'bash',
            yml: 'yaml',
            md: 'markdown',
            css: 'css',
            scss: 'scss',
            less: 'less',
            html: 'markup',
            vue: 'markup',
            xml: 'markup',
            svg: 'markup',
            json: 'javascript',
            sql: 'sql',
            go: 'go',
            rust: 'rust',
            java: 'java',
            c: 'c',
            cpp: 'cpp',
            csharp: 'csharp',
          };

          const prismLang = langMap[lang] || lang;
          
          try {
            await import(`prismjs/components/prism-${prismLang}`);
          } catch (e) {
            // 语言不支持，使用纯文本
          }

          if (Prism.highlight) {
            setHighlightedCode(Prism.highlight(code, Prism.languages[prismLang] || Prism.languages.plaintext, prismLang));
          }
        } catch (error) {
          console.warn('PrismJS 加载失败:', error);
          setHighlightedCode(code);
        }
      }
    }

    highlight();
  }, [code, language]);

  // 复制功能
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      
      // 显示复制成功提示
      showCopyNotification();

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 复制成功提示
  const showCopyNotification = () => {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = '✓ 复制成功';
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%) translateY(-20px)',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      padding: '8px 24px',
      borderRadius: '6px',
      fontSize: '14px',
      zIndex: '10000',
      opacity: '0',
      transition: 'all 0.3s ease',
      pointerEvents: 'none' as const,
    });

    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(-50%) translateY(-20px)';
      setTimeout(() => notification.remove(), 300);
    }, 1500);
  };

  // 全屏切换
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // 获取显示的语言名称
  const getLanguageLabel = (lang: string): string => {
    const labelMap: Record<string, string> = {
      js: 'JavaScript',
      ts: 'TypeScript',
      jsx: 'JSX',
      tsx: 'TSX',
      py: 'Python',
      bash: 'Bash',
      sh: 'Shell',
      yml: 'YAML',
      yaml: 'YAML',
      md: 'Markdown',
      css: 'CSS',
      scss: 'SCSS',
      html: 'HTML',
      vue: 'Vue',
      json: 'JSON',
      sql: 'SQL',
      go: 'Go',
      rust: 'Rust',
      java: 'Java',
      c: 'C',
      cpp: 'C++',
      csharp: 'C#',
      text: 'Text',
    };
    return labelMap[lang.toLowerCase()] || lang.toUpperCase();
  };

  return (
    <div className={`highlight-container ${isFullscreen ? 'code-fullscreen' : ''}`}>
      {/* Mac 风格窗口控制按钮 */}
      {!isFullscreen && (
        <div className="mac-style-header">
          <div className="mac-dot close" />
          <div className="mac-dot minimize" />
          <div className="mac-dot maximize" />
        </div>
      )}

      {/* 工具栏 */}
      <div className="code-toolbar">
        {/* 语言标签 */}
        <span className="language-label">{getLanguageLabel(language)}</span>

        {/* 操作按钮 */}
        <div className="toolbar-buttons">
          {/* 折叠/展开按钮 */}
          {isLongCode && !isFullscreen && (
            <button
              className={`toolbar-button expand-btn ${!expanded ? 'closed' : ''}`}
              onClick={() => setExpanded(!expanded)}
              title={expanded ? '收起' : '展开'}
              aria-label={expanded ? '收起代码' : '展开代码'}
            >
              <FontAwesomeIcon icon={expanded ? faAngleUp : faAngleDown} />
            </button>
          )}

          {/* 全屏按钮 */}
          <button
            className="toolbar-button fullscreen-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? '退出全屏' : '全屏查看'}
            aria-label={isFullscreen ? '退出全屏' : '全屏查看'}
          >
            <FontAwesomeIcon icon={isFullscreen ? faMinimize : faMaximize} />
          </button>

          {/* 复制按钮 */}
          <button
            className={`toolbar-button copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="复制代码"
            aria-label="复制代码"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
          </button>
        </div>
      </div>

      {/* 代码内容 */}
      <pre
        ref={codeRef}
        className={`code-content ${isLongCode && !expanded && !isFullscreen ? 'closed' : ''}`}
      >
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>

      {/* 全屏关闭提示 */}
      {isFullscreen && (
        <div className="fullscreen-hint">
          按 <kbd>Esc</kbd> 或点击退出按钮退出全屏
        </div>
      )}

      <style jsx>{`
        .highlight-container {
          position: relative;
          margin: 1.5em 0;
          border-radius: 10px;
          overflow: hidden;
          background: #fafafa;
          border: 1px solid #e5e5e5;
          font-size: 0.9em;
          transition: all 0.3s ease;
        }

        [data-theme="dark"] .highlight-container {
          background: #282c34;
          border-color: #3e4451;
        }

        .highlight-container:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        /* Mac 风格三点 */
        .mac-style-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: #f5f5f5;
          gap: 8px;
          user-select: none;
        }

        [data-theme="dark"] .mac-style-header {
          background: #21252b;
        }

        .mac-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .mac-dot.close {
          background: #ff5f56;
        }

        .mac-dot.minimize {
          background: #ffbd2e;
        }

        .mac-dot.maximize {
          background: #27c93f;
        }

        /* 工具栏 */
        .code-toolbar {
          position: absolute;
          top: 10px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 10;
        }

        .language-label {
          font-size: 0.82em;
          color: var(--meta-theme-color);
          background: rgba(0, 0, 0, 0.06);
          padding: 2px 10px;
          border-radius: 4px;
          margin-right: 8px;
          font-family: var(--code-font-family);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        [data-theme="dark"] .language-label {
          background: rgba(255, 255, 255, 0.08);
          color: #8b949e;
        }

        .toolbar-buttons {
          display: flex;
          gap: 4px;
        }

        .toolbar-button {
          cursor: pointer;
          padding: 5px 8px;
          font-size: 0.85em;
          color: #999;
          border: none;
          background: transparent;
          border-radius: 4px;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .toolbar-button:hover {
          color: var(--theme-color);
          background: rgba(73, 177, 245, 0.1);
        }

        .toolbar-button.copied {
          color: #27c93f;
        }

        /* 代码区域 */
        .code-content {
          padding: 18px 20px;
          overflow-x: auto;
          overflow-y: hidden;
          font-family: var(--code-font-family);
          line-height: 1.65;
          margin: 0;
          background: transparent;
          border: none;
          tab-size: 2;
          transition: max-height 0.35s ease;
        }

        .code-content code {
          font-family: inherit;
          font-size: inherit;
          background: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
        }

        /* 折叠状态 */
        .code-content.closed {
          max-height: 200px;
          overflow: hidden;
          position: relative;
        }

        .code-content.closed::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to bottom, transparent, var(--card-bg));
          pointer-events: none;
        }

        [data-theme="dark"] .code-content.closed::after {
          background: linear-gradient(to bottom, transparent, #282c34);
        }

        /* 全屏模式 */
        .code-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 9999 !important;
          margin: 0 !important;
          border-radius: 0 !important;
          display: flex;
          flex-direction: column;
          background: #fafafa !important;
        }

        [data-theme="dark"] .code-fullscreen {
          background: #1a1d23 !important;
        }

        .code-fullscreen .code-content {
          flex: 1;
          overflow: auto;
          max-height: none !important;
        }

        .fullscreen-hint {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85em;
          opacity: 0.8;
          animation: fadeInOut 3s ease forwards;
          pointer-events: none;
          z-index: 100;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, 10px); }
          20% { opacity: 0.8; transform: translate(-50%, 0); }
          80% { opacity: 0.8; }
          100% { opacity: 0; }
        }

        .fullscreen-hint kbd {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
          margin: 0 3px;
        }

        /* 滚动条美化 */
        .code-content::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        .code-content::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }

        .code-content::-webkit-scrollbar-track {
          background: transparent;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .highlight-container {
            font-size: 0.85em;
            border-radius: 8px;
          }

          .code-toolbar {
            top: 6px;
            right: 10px;
          }

          .language-label {
            display: none; /* 移动端隐藏语言标签节省空间 */
          }

          .toolbar-button {
            padding: 6px;
          }

          .code-content {
            padding: 14px 12px;
          }
        }
      `}</style>
    </div>
  );
}
