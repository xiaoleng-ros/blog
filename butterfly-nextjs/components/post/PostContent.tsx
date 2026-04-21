'use client';

/**
 * PostContent 文章内容渲染组件
 * 将 Markdown 转换为 HTML 并应用 Butterfly 主题样式
 */

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import { generateHeadingId } from '@/lib/headingUtils';

interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="post-content markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 自定义 h1-h6 标题，添加 id 属性用于目录跳转
          h1({ node, children, ...props }) {
            const id = generateHeadingId(children);
            return <h1 id={id} {...props}>{children}</h1>;
          },
          h2({ node, children, ...props }) {
            const id = generateHeadingId(children);
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3({ node, children, ...props }) {
            const id = generateHeadingId(children);
            return <h3 id={id} {...props}>{children}</h3>;
          },
          h4({ node, children, ...props }) {
            const id = generateHeadingId(children);
            return <h4 id={id} {...props}>{children}</h4>;
          },
          h5({ node, children, ...props }) {
            const id = generateHeadingId(children);
            return <h5 id={id} {...props}>{children}</h5>;
          },
          h6({ node, children, ...props }) {
            const id = generateHeadingId(children);
            return <h6 id={id} {...props}>{children}</h6>;
          },

          // 自定义代码块渲染
          pre({ node, children, ...props }) {
            // 检查是否是代码块
            const isCodeBlock = (node?.children?.[0] as any)?.tagName === 'code';

            if (!isCodeBlock) {
              return <pre {...props}>{children}</pre>;
            }

            // 提取语言和代码内容
            const codeElement = node!.children[0] as any;
            const className = codeElement.properties?.className || '';
            // React Markdown v9 中 className 是数组，如 ['language-js']
            const language = Array.isArray(className)
              ? className[0]?.replace('language-', '') || 'text'
              : (className as string).replace('language-', '') || 'text';
            const codeString = codeElement.children?.[0]?.value || '';

            return <CodeBlock language={language} code={codeString} />;
          },
          
          // 行内代码
          code({ className, children, ...props }) {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="inline-code" {...props}>
                  {children}
                </code>
              );
            }
            return <>{children}</>;
          },

          // 图片
          img({ src, alt, ...props }) {
            return (
              <figure className="post-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || ''}
                  loading="lazy"
                  {...props}
                />
                {alt && <figcaption>{alt}</figcaption>}
              </figure>
            );
          },

          // 链接
          a({ href, children, ...props }) {
            const isExternal = href && (href.startsWith('http') || href.startsWith('//'));
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },

          // 表格
          table({ children, ...props }) {
            return (
              <div className="table-wrapper">
                <table {...props}>{children}</table>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>

      <style jsx global>{`
        /* Markdown 内容样式 - 基于 Butterfly 主题 */
        .markdown-body {
          font-size: 1.05em;
          line-height: 2;
          color: var(--font-color);
          word-wrap: break-word;
        }

        /* 标题样式 */
        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4,
        .markdown-body h5,
        .markdown-body h6 {
          margin-top: 2em;
          margin-bottom: 1em;
          line-height: 1.4;
          font-weight: 700;
          color: var(--font-color);
          position: relative;
        }

        .markdown-body h1 {
          font-size: 2em;
          padding-bottom: 0.3em;
          border-bottom: 2px solid var(--theme-color);
        }

        .markdown-body h2 {
          font-size: 1.65em;
          padding-bottom: 0.3em;
          border-bottom: 1px solid #e8e8e8;
        }

        .markdown-body h3 {
          font-size: 1.4em;
        }

        .markdown-body h4 {
          font-size: 1.2em;
        }

        .markdown-body h5 {
          font-size: 1.05em;
        }

        .markdown-body h6 {
          font-size: 0.95em;
          color: var(--meta-theme-color);
        }

        /* 段落 */
        .markdown-body p {
          margin-bottom: 1.2em;
        }

        /* 链接 */
        .markdown-body a {
          color: var(--theme-link-color);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .markdown-body a:hover {
          color: var(--text-hover);
          border-bottom-color: var(--text-hover);
        }

        /* 加粗和斜体 */
        .markdown-body strong,
        .markdown-body b {
          font-weight: 700;
          color: var(--font-black);
        }

        .markdown-body em,
        .markdown-body i {
          font-style: italic;
        }

        /* 行内代码 */
        .markdown-body .inline-code {
          display: inline;
          padding: 2px 6px;
          background: rgba(73, 177, 245, 0.08);
          color: var(--light-red);
          border-radius: 4px;
          font-family: var(--code-font-family);
          font-size: 0.9em;
          line-height: 1.8;
          word-break: break-word;
        }

        [data-theme="dark"] .markdown-body .inline-code {
          background: rgba(248, 113, 113, 0.15);
        }

        /* 引用块 */
        .markdown-body blockquote {
          margin: 1.5em 0;
          padding: 12px 20px;
          border-left: 4px solid var(--theme-color);
          background: linear-gradient(to right, rgba(73, 177, 245, 0.03), transparent);
          color: #6a737d;
          border-radius: 0 8px 8px 0;
        }

        .markdown-body blockquote p:last-child {
          margin-bottom: 0;
        }

        /* 列表 */
        .markdown-body ul,
        .markdown-body ol {
          margin: 1em 0;
          padding-left: 2em;
        }

        .markdown-body li {
          margin-bottom: 0.5em;
          line-height: 1.8;
        }

        .markdown-body ul {
          list-style-type: disc;
        }

        .markdown-body ol {
          list-style-type: decimal;
        }

        .markdown-body li > ul,
        .markdown-body li > ol {
          margin-top: 0.3em;
          margin-bottom: 0;
        }

        /* 任务列表 */
        .markdown-body input[type="checkbox"] {
          margin-right: 8px;
          accent-color: var(--theme-color);
        }

        /* 分隔线 */
        .markdown-body hr {
          height: 2px;
          border: none;
          background: linear-gradient(
            to right,
            transparent,
            var(--theme-hr-color),
            transparent
          );
          margin: 3em 0;
        }

        /* 表格 */
        .table-wrapper {
          overflow-x: auto;
          margin: 1.5em 0;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .markdown-body table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95em;
          background: var(--card-bg);
        }

        .markdown-body thead {
          background: var(--table-thead-bg, #99a9bf);
          color: #fff;
        }

        .markdown-body th,
        .markdown-body td {
          padding: 12px 16px;
          text-align: left;
          border: 1px solid #e8e8e8;
        }

        .markdown-body tbody tr:nth-child(even) {
          background: rgba(0, 0, 0, 0.02);
        }

        .markdown-body tbody tr:hover {
          background: rgba(73, 177, 245, 0.04);
        }

        /* 图片 */
        .post-image {
          margin: 2em 0;
          text-align: center;
        }

        .post-image img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .post-image:hover img {
          transform: scale(1.02);
        }

        .post-image figcaption {
          margin-top: 10px;
          font-size: 0.9em;
          color: var(--meta-theme-color);
          font-style: italic;
        }

        /* 删除线 */
        .markdown-body del,
        .markdown-body s {
          text-decoration: line-through;
          opacity: 0.7;
        }

        /* 上标和下标 */
        .markdown-body sup,
        .markdown-body sub {
          font-size: 0.75em;
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .markdown-body {
            font-size: 1em;
          }

          .markdown-body h1 {
            font-size: 1.7em;
          }

          .markdown-body h2 {
            font-size: 1.45em;
          }

          .markdown-body table {
            font-size: 0.85em;
          }

          .markdown-body th,
          .markdown-body td {
            padding: 8px 10px;
          }
        }
      `}</style>
    </div>
  );
}
