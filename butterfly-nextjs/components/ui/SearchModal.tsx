'use client';

/**
 * SearchModal 搜索弹窗组件
 * 提供本地搜索功能，支持关键词高亮
 */

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { searchPosts } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faTimes,
  faArrowRight,
  faFileAlt,
} from '@fortawesome/free-solid-svg-icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 打开时聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    // ESC 键关闭
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  // 搜索处理
  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // 防抖搜索
    const timer = setTimeout(() => {
      const searchResults = searchPosts(keyword);
      setResults(searchResults.slice(0, 10)); // 最多显示 10 条
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  // 高亮关键词
  const highlightKeyword = (text: string): string => {
    if (!keyword.trim()) return text;
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  };

  // 处理键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      // 跳转到第一个结果
      window.location.href = `/post/${results[0].slug}`;
      onClose();
    }
  };

  return (
    <>
      {/* 搜索遮罩 */}
      <div
        className={`search-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />

      {/* 搜索弹窗 */}
      <div className={`search-modal ${isOpen ? 'open' : ''}`}>
        {/* 搜索头部 */}
        <div className="search-header">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              ref={inputRef}
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="搜索文章、标签、分类..."
              className="search-input"
            />
            {keyword && (
              <button
                onClick={() => setKeyword('')}
                className="clear-btn"
                aria-label="清除"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="close-search-btn"
            aria-label="关闭搜索"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* 搜索结果 */}
        <div className="search-results">
          {keyword && !isSearching && results.length === 0 && (
            <div className="no-results">
              <FontAwesomeIcon icon={faSearch} className="no-results-icon" />
              <p>未找到与 "<strong>{keyword}</strong>" 相关的内容</p>
              <p className="hint">试试其他关键词？</p>
            </div>
          )}

          {isSearching && (
            <div className="searching-state">
              <div className="loading-spinner" />
              <span>搜索中...</span>
            </div>
          )}

          {!isSearching && results.length > 0 && (
            <ul className="result-list">
              {results.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/post/${post.slug}`}
                    onClick={onClose}
                    className="result-item"
                  >
                    <FontAwesomeIcon icon={faFileAlt} className="result-icon" />
                    <span
                      className="result-title"
                      dangerouslySetInnerHTML={{
                        __html: highlightKeyword(post.title),
                      }}
                    />
                    <span className="result-arrow">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </span>
                  </Link>
                  </li>
              ))}
            </ul>
          )}

          {!keyword && (
            <div className="search-hint">
              <p>💡 输入关键词开始搜索</p>
              <p className="shortcut-hint">快捷键：<kbd>Ctrl</kbd> + <kbd>K</kbd></p>
            </div>
          )}
        </div>

        <style jsx global>{`
          /* 搜索遮罩 */
          .search-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 9998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
          }

          .search-overlay.show {
            opacity: 1;
            visibility: visible;
          }

          /* 搜索弹窗 */
          .search-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            width: 90%;
            max-width: 620px;
            max-height: 70vh;
            background: var(--card-bg);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .search-modal.open {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1);
          }

          /* 搜索头部 */
          .search-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 22px;
            border-bottom: 2px solid #f0f0f0;
          }

          .search-input-wrapper {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 16px;
            background: rgba(73, 177, 245, 0.04);
            border-radius: 10px;
            border: 2px solid transparent;
            transition: all 0.25s ease;
          }

          .search-input-wrapper:focus-within {
            border-color: var(--theme-color);
            background: rgba(73, 177, 245, 0.06);
          }

          .search-icon {
            color: var(--meta-theme-color);
            font-size: 1em;
            flex-shrink: 0;
          }

          .search-input {
            flex: 1;
            border: none;
            background: transparent;
            font-size: 1em;
            color: var(--font-color);
            outline: none;
            font-family: inherit;
          }

          .search-input::placeholder {
            color: var(--meta-theme-color);
          }

          .clear-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--meta-theme-color);
            font-size: 0.85em;
            padding: 4px;
            border-radius: 4px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
          }

          .clear-btn:hover {
            color: var(--light-red);
            background: rgba(244, 116, 102, 0.08);
          }

          .close-search-btn {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--meta-theme-color);
            font-size: 1.15em;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.25s ease;
            flex-shrink: 0;
          }

          .close-search-btn:hover {
            color: var(--light-red);
            background: rgba(244, 116, 102, 0.08);
          }

          /* 搜索结果 */
          .search-results {
            flex: 1;
            overflow-y: auto;
            padding: 16px 22px;
          }

          /* 无结果 */
          .no-results {
            text-align: center;
            padding: 40px 20px;
            color: var(--meta-theme-color);
          }

          .no-results-icon {
            font-size: 2.5em;
            margin-bottom: 14px;
            opacity: 0.4;
          }

          .no-results p {
            margin: 6px 0;
          }

          .no-results strong {
            color: var(--theme-color);
          }

          .hint {
            font-size: 0.88em;
            opacity: 0.7;
          }

          /* 加载状态 */
          .searching-state {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 30px;
            color: var(--meta-theme-color);
          }

          .loading-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(73, 177, 245, 0.15);
            border-top-color: var(--theme-color);
            border-radius: 50%;
            animation: spin 0.7s linear infinite;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          /* 结果列表 */
          .result-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .result-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 14px;
            text-decoration: none;
            color: var(--font-black);
            border-radius: 10px;
            transition: all 0.25s ease;
            margin-bottom: 6px;
          }

          .result-item:hover {
            background: rgba(73, 177, 245, 0.05);
            transform: translateX(5px);
          }

          .result-item:hover .result-title {
            color: var(--theme-color);
          }

          .result-icon {
            color: var(--theme-color);
            font-size: 0.88em;
            flex-shrink: 0;
          }

          .result-title {
            flex: 1;
            font-size: 0.95em;
            line-height: 1.45;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: color 0.25s ease;
          }

          :global(.search-highlight) {
            background: linear-gradient(120deg, rgba(255, 214, 0, 0.3), rgba(255, 214, 0, 0.1));
            color: var(--light-orange);
            padding: 1px 3px;
            border-radius: 3px;
            font-weight: 600;
          }

          .result-arrow {
            color: var(--meta-theme-color);
            font-size: 0.78em;
            opacity: 0;
            transform: translateX(-5px);
            transition: all 0.25s ease;
            flex-shrink: 0;
          }

          .result-item:hover .result-arrow {
            opacity: 1;
            transform: translateX(0);
            color: var(--theme-color);
          }

          /* 搜索提示 */
          .search-hint {
            text-align: center;
            padding: 40px 20px;
            color: var(--meta-theme-color);
          }

          .search-hint p {
            margin: 6px 0;
          }

          .shortcut-hint {
            font-size: 0.88em;
            opacity: 0.65;
          }

          .shortcut-hint kbd {
            background: rgba(0, 0, 0, 0.06);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.92em;
            margin: 0 2px;
          }
        `}</style>
      </div>
    </>
  );
}
