/**
 * 全局错误边界组件
 * 功能：捕获并优雅处理应用中的错误，特别是 React/Next.js 的已知兼容性问题
 * 
 * 使用方式：
 * - 自动捕获子组件树中的 JavaScript 错误
 * - 显示友好的错误提示界面
 * - 提供"重试"按钮让用户恢复
 */

'use client'

import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

/**
 * 全局错误边界类组件
 * 用于捕获 React 渲染过程中的错误
 */
class GlobalErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  /**
   * 捕获子组件抛出的错误
   * @param error 错误对象
   * @returns 新的状态
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  /**
   * 错误日志记录
   * @param error 错误对象
   * @param info 错误信息
   */
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // 过滤掉已知的兼容性警告（不影响功能的）
    const knownIssues = [
      'mounting a new html component',
      'multiple html',
      'singletonInstance',
    ]
    
    const isKnownIssue = knownIssues.some(issue => 
      error.message.toLowerCase().includes(issue)
    )
    
    if (!isKnownIssue) {
      // 只记录未知错误到控制台
      console.error('❌ 应用错误:', error)
      console.error('错误堆栈:', info.componentStack)
    } else {
      // 已知问题：降低日志级别为警告
      console.warn('⚠️ 已知的兼容性问题 (可安全忽略):', error.message)
    }
  }

  /**
   * 重置错误状态
   */
  handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      // 检查是否是已知的 HTML 冲突问题
      const isHtmlConflict = this.state.error?.message?.includes('html component')
      
      if (isHtmlConflict && process.env.NODE_ENV === 'development') {
        // 开发环境：显示简化的警告信息
        return (
          <div style={{
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}>
            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
            }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#856404' }}>
                ⚠️ 开发环境警告
              </h3>
              <p style={{ margin: 0, color: '#856404', fontSize: '14px' }}>
                检测到多个 HTML 根组件（Payload Admin 与前台布局）。
                这在开发环境中是正常的，不影响功能。
                生产构建时会自动优化。
              </p>
            </div>
            
            {/* 尝试渲染 children，因为通常功能仍然正常 */}
            {this.props.children}
            
            <button
              onClick={this.handleRetry}
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              刷新页面
            </button>
          </div>
        )
      }
      
      // 其他错误或生产环境：显示完整错误界面
      return this.props.fallback || (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
          }}>
            😅
          </div>
          
          <h1 style={{
            fontSize: '24px',
            color: '#333',
            marginBottom: '12px',
            fontWeight: 600,
          }}>
            出现了一些问题
          </h1>
          
          <p style={{
            color: '#666',
            marginBottom: '24px',
            textAlign: 'center',
            maxWidth: '400px',
          }}>
            {this.state.error?.message || '页面加载时发生未知错误'}
          </p>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '10px 24px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              重试
            </button>
            
            <button
              onClick={() => window.location.href = '/'}
              style={{
                padding: '10px 24px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              返回首页
            </button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details style={{
              marginTop: '24px',
              width: '100%',
              maxWidth: '600px',
            }}>
              <summary style={{
                cursor: 'pointer',
                color: '#dc3545',
                fontWeight: 500,
                marginBottom: '8px',
              }}>
                错误详情 (仅开发环境可见)
              </summary>
              <pre style={{
                background: '#f1f1f1',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                color: '#333',
                maxHeight: '200px',
              }}>
                {this.state.error?.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }

export default GlobalErrorBoundary
