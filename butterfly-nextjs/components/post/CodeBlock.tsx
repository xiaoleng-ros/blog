'use client';

/**
 * CodeBlock 代码块组件
 * 用于渲染语法高亮代码块，支持多种编程语言
 */

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = 'text',
  showLineNumbers = true,
}: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
        <button
          className="copy-button"
          onClick={handleCopy}
          aria-label="复制代码"
        >
          {isCopied ? '已复制' : '复制'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 8px 8px',
          fontSize: '0.9em',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
      <style jsx>{`
        .code-block-wrapper {
          position: relative;
          margin: 1.5em 0;
          border-radius: 8px;
          overflow: hidden;
          background: #282c34;
        }
        .code-block-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          background: #21252b;
          border-bottom: 1px solid #181a1f;
        }
        .code-language {
          color: #abb2bf;
          font-size: 0.85em;
          text-transform: uppercase;
        }
        .copy-button {
          padding: 4px 12px;
          background: #4c4c4c;
          color: #abb2bf;
          border: none;
          border-radius: 4px;
          font-size: 0.8em;
          cursor: pointer;
          transition: background 0.2s;
        }
        .copy-button:hover {
          background: #5c5c5c;
        }
      `}</style>
    </div>
  );
}
