'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const navItems = [
  { label: '首页', href: '/' },
  { label: '归档', href: '/archives' },
  { label: '分类', href: '/categories' },
  { label: '标签', href: '/tags' },
  { label: '关于', href: '/about' },
]

const socialLinks = [
  { icon: 'fa-github', href: 'https://github.com', label: 'GitHub' },
  { icon: 'fa-weibo', href: '#', label: '微博' },
  { icon: 'fa-envelope', href: 'mailto:test@example.com', label: '邮箱' },
]

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            id="menu-mask"
            className="menu-mask show"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          <motion.aside
            id="sidebar-menus"
            className="sidebar-menus open"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.5,
            }}
          >
            <button className="sidebar-close-btn" onClick={onClose} aria-label="关闭侧边栏">
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <div className="sidebar-site-info">
              <div className="sidebar-avatar">
                <img src="/img/favicon.ico" alt="站点头像" />
              </div>
              <h1 className="sidebar-title">Butterfly</h1>
              <p className="sidebar-subtitle">A beautiful Hexo theme</p>
            </div>

            <nav className="sidebar-nav">
              <ul className="sidebar-menu-list">
                {navItems.map((item) => (
                  <li key={item.href} className="sidebar-menu-item">
                    <Link href={item.href} onClick={onClose}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="sidebar-social">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <i className={`fab ${link.icon}`} />
                </a>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
