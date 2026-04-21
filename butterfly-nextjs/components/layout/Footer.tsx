'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
  const [runtime, setRuntime] = useState('')

  useEffect(() => {
    const startDate = new Date('2025-01-01').getTime()
    const updateRuntime = () => {
      const now = new Date().getTime()
      const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
      setRuntime(`${days} 天`)
    }
    updateRuntime()
    const timer = setInterval(updateRuntime, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <footer id="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <p className="footer-copyright">
            © 2025 Butterfly Blog
          </p>
          <p className="footer-powered">
            Powered by Next.js & Butterfly Theme
          </p>
          {runtime && (
            <p className="footer-runtime">
              本站已运行 {runtime}
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        #footer {
          background: var(--card-bg);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding: 30px 20px;
          text-align: center;
        }

        .footer-inner {
          max-width: 1300px;
          margin: 0 auto;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: var(--meta-theme-color);
          font-size: 0.88em;
        }

        .footer-copyright {
          font-weight: 600;
          color: var(--font-color);
        }

        .footer-powered {
          opacity: 0.75;
        }

        .footer-runtime {
          opacity: 0.65;
          font-size: 0.92em;
        }

        @media (max-width: 768px) {
          #footer {
            padding: 24px 16px;
          }
        }
      `}</style>
    </footer>
  )
}
