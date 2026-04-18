'use client';

/**
 * Pagination 分页组件
 * 提供页码导航功能
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // 如果只有一页，不显示分页
  if (totalPages <= 1) return null;

  // 生成页码数组（显示当前页前后各2页）
  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    const showPages = 5; // 最多显示的页码数

    if (totalPages <= showPages + 2) {
      // 总页数不多，全部显示
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总页数较多，智能省略
      if (currentPage <= 3) {
        // 当前页在前面
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 当前页在后面
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        // 当前页在中间
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number | '...') => {
    if (typeof page === 'number' && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      // 滚动到顶部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="pagination" role="navigation" aria-label="分页导航">
      {/* 上一页按钮 */}
      <button
        className="page-link prev"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="上一页"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* 页码列表 */}
      <div className="page-number">
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
          ) : (
            <button
              key={page}
              className={`page-link ${page === currentPage ? 'current' : ''}`}
              onClick={() => handlePageClick(page)}
              aria-label={`第 ${page} 页`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>

      {/* 下一页按钮 */}
      <button
        className="page-link next"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="下一页"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      <style jsx>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin-top: 30px;
          padding: 20px 0;
        }

        .page-number {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .page-link {
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e0e0e0;
          background: var(--card-bg);
          color: var(--font-color);
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.9em;
          font-weight: 500;
          transition: all 0.3s ease;
          text-decoration: none;
          padding: 0 12px;
        }

        .page-link:hover:not(:disabled) {
          border-color: var(--theme-color);
          color: var(--theme-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(73, 177, 245, 0.15);
        }

        .page-link.current {
          background: var(--theme-color);
          border-color: var(--theme-color);
          color: #fff;
          box-shadow: 0 4px 12px rgba(73, 177, 245, 0.25);
        }

        .page-link:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .page-link:disabled:hover {
          transform: none;
          border-color: #e0e0e0;
          color: var(--font-color);
        }

        .prev,
        .next {
          font-size: 1em;
        }

        .page-ellipsis {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          color: var(--meta-theme-color);
          user-select: none;
        }

        @media (max-width: 768px) {
          .pagination {
            gap: 5px;
          }

          .page-link {
            min-width: 32px;
            height: 32px;
            font-size: 0.85em;
            padding: 0 10px;
          }
        }
      `}</style>
    </nav>
  );
}
