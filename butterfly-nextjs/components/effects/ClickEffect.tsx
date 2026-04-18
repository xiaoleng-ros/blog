'use client';

/**
 * ClickEffect 点击特效组件
 * 提供鼠标点击时的视觉反馈效果（烟花/爱心/文字）
 */

import React, { useEffect, useCallback } from 'react';

interface ClickEffectProps {
  type?: 'fireworks' | 'heart' | 'text';
  text?: string;
  enable?: boolean;
}

export default function ClickEffect({
  type = 'fireworks',
  text = '🦋',
  enable = true,
}: ClickEffectProps) {
  const createEffect = useCallback((e: MouseEvent) => {
    if (!enable) return;

    const effects = {
      fireworks: createFirework,
      heart: createHeart,
      text: createTextEffect,
    };

    effects[type]?.(e, text);
  }, [type, text, enable]);

  useEffect(() => {
    if (enable) {
      document.addEventListener('click', createEffect);
    }
    return () => {
      if (enable) {
        document.removeEventListener('click', createEffect);
      }
    };
  }, [createEffect, enable]);

  return null; // 不渲染任何可见元素
}

// 烟花特效
function createFirework(e: MouseEvent, _text?: string) {
  const colors = ['#49B1F5', '#00c4b6', '#FF7242', '#F47466', '#9b59b6'];
  
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'click-particle firework';
    
    const angle = (Math.PI * 2 / 8) * i + Math.random() * 0.5;
    const velocity = 80 + Math.random() * 60;
    
    Object.assign(particle.style, {
      position: 'fixed',
      left: `${e.clientX}px`,
      top: `${e.clientY}px`,
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: colors[Math.floor(Math.random() * colors.length)],
      pointerEvents: 'none',
      zIndex: '99999',
      boxShadow: `0 0 6px ${colors[0]}`,
      animation: `firework-explode 0.6s ease-out forwards`,
      '--tx': `${Math.cos(angle) * velocity}px`,
      '--ty': `${Math.sin(angle) * velocity}px`,
    });

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
  }

  // 添加动画样式（仅添加一次）
  addFireworkStyles();
}

// 爱心特效
function createHeart(e: MouseEvent, _text?: string) {
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  
  Object.assign(heart.style, {
    position: 'fixed',
    left: `${e.clientX - 12}px`,
    top: `${e.clientY - 12}px`,
    fontSize: '24px',
    pointerEvents: 'none',
    zIndex: '99999',
    animation: 'heart-float 1s ease-out forwards',
  });

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);

  addHeartStyles();
}

// 文字特效
function createTextEffect(e: MouseEvent, text: string = '🦋') {
  const textEl = document.createElement('span');
  textEl.textContent = text;
  
  Object.assign(textEl.style, {
    position: 'fixed',
    left: `${e.clientX}px`,
    top: `${e.clientY - 20}px`,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#49B1F5',
    pointerEvents: 'none',
    zIndex: '99999',
    animation: 'text-float 1.2s ease-out forwards',
    textShadow: '0 2px 8px rgba(73, 177, 245, 0.3)',
  });

  document.body.appendChild(textEl);
  setTimeout(() => textEl.remove(), 1200);

  addTextStyles();
}

// 添加动画样式
function addFireworkStyles() {
  if (document.getElementById('click-effect-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'click-effect-styles';
  style.textContent = `
    @keyframes firework-explode {
      0% { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

function addHeartStyles() {
  if (document.getElementById('heart-effect-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'heart-effect-styles';
  style.textContent = `
    @keyframes heart-float {
      0% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-60px) scale(1.4); }
    }
  `;
  document.head.appendChild(style);
}

function addTextStyles() {
  // 复用或扩展已有样式
  if (document.getElementById('text-effect-styles')) return;
  
  const style = document.createElement('style');
  style.id = 'text-effect-styles';
  style.textContent = `
    @keyframes text-float {
      0% { opacity: 1; transform: translateY(0) scale(1); }
      100% { opacity: 0; transform: translateY(-40px) scale(1.2); }
    }
  `;
  document.head.appendChild(style);
}
