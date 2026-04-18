/**
 * Butterfly 主题工具函数
 * 提供数据查询、格式化等通用功能
 */

import { Post, Category, Tag, ArchiveGroup } from './types';
import posts from './data';

/**
 * 获取所有文章（支持分页、排序、筛选）
 */
export function getPosts(options?: {
  page?: number;
  pageSize?: number;
  category?: string;
  tag?: string;
  sortBy?: 'date' | 'updated';
  sortOrder?: 'asc' | 'desc';
}): { posts: Post[]; total: number; totalPages: number } {
  let filtered = [...posts];

  // 按分类筛选
  if (options?.category) {
    filtered = filtered.filter(post =>
      post.categories.some(cat => cat.name === options.category)
    );
  }

  // 按标签筛选
  if (options?.tag) {
    filtered = filtered.filter(post =>
      post.tags.some(tag => tag.name === options.tag)
    );
  }

  // 排序
  const sortBy = options?.sortBy || 'date';
  const sortOrder = options?.sortOrder || 'desc';
  filtered.sort((a, b) => {
    const dateA = new Date(a[sortBy]).getTime();
    const dateB = new Date(b[sortBy]).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const total = filtered.length;
  const pageSize = options?.pageSize || 10;
  const totalPages = Math.ceil(total / pageSize);
  const page = options?.page || 1;
  const start = (page - 1) * pageSize;
  const pagedPosts = filtered.slice(start, start + pageSize);

  return {
    posts: pagedPosts,
    total,
    totalPages,
  };
}

/**
 * 根据 slug 获取单篇文章
 */
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

/**
 * 获取所有分类
 */
export function getAllCategories(): Category[] {
  return categories;
}

/**
 * 获取所有标签
 */
export function getAllTags(): Tag[] {
  return tags;
}

/**
 * 根据分类名获取文章
 */
export function getPostsByCategory(categoryName: string): Post[] {
  return posts.filter(post =>
    post.categories.some(cat => cat.name === categoryName)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 根据标签名获取文章
 */
export function getPostsByTag(tagName: string): Post[] {
  return posts.filter(post =>
    post.tags.some(tag => tag.name === tagName)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * 获取归档数据（按年月分组）
 */
export function getArchiveData(): ArchiveGroup[] {
  const archiveMap = new Map<number, Map<string, Post[]>>();

  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = `${year}年${String(date.getMonth() + 1).padStart(2, '0')}月`;

    if (!archiveMap.has(year)) {
      archiveMap.set(year, new Map());
    }
    
    const yearMap = archiveMap.get(year)!;
    if (!yearMap.has(month)) {
      yearMap.set(month, []);
    }
    
    yearMap.get(month)!.push(post);
  });

  const result: ArchiveGroup[] = [];
  
  // 按年份降序排列
  const sortedYears = Array.from(archiveMap.keys()).sort((a, b) => b - a);
  
  sortedYears.forEach(year => {
    const months = archiveMap.get(year)!;
    const monthEntries: ArchiveGroup['months'] = [];
    
    // 按月份降序排列
    const sortedMonths = Array.from(months.keys()).sort((a, b) => {
      const monthA = parseInt(a.match(/(\d+)月/)?.[1] || '0');
      const monthB = parseInt(b.match(/(\d+)月/)?.[1] || '0');
      return monthB - monthA;
    });
    
    sortedMonths.forEach(month => {
      const monthPosts = months.get(month)!
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      monthEntries.push({ month, posts: monthPosts });
    });
    
    result.push({ year, months: monthEntries });
  });

  return result;
}

/**
 * 获取最新文章
 */
export function getRecentPosts(limit: number = 5): Post[] {
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * 获取相关文章（基于共同标签）
 */
export function getRelatedPosts(postId: string, limit: number = 6): Post[] {
  const currentPost = posts.find(p => p.id === postId);
  if (!currentPost) return [];

  const scored = posts
    .filter(p => p.id !== postId)
    .map(post => {
      const commonTags = currentPost.tags.filter(ct =>
        post.tags.some(pt => pt.name === ct.name)
      ).length;
      return { ...post, score: commonTags };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored;
}

/**
 * 获取上一篇/下一篇文章
 */
export function getAdjacentPosts(currentSlug: string): { prev: Post | null; next: Post | null } {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const currentIndex = sorted.findIndex(p => p.slug === currentSlug);
  
  return {
    prev: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
    next: currentIndex > 0 ? sorted[currentIndex - 1] : null,
  };
}

/**
 * 搜索文章（标题 + 内容匹配）
 */
export function searchPosts(keyword: string): Post[] {
  const lowerKeyword = keyword.toLowerCase();
  
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerKeyword) ||
    post.content.toLowerCase().includes(lowerKeyword) ||
    post.excerpt?.toLowerCase().includes(lowerKeyword) ||
    post.categories.some(cat => cat.name.toLowerCase().includes(lowerKeyword)) ||
    post.tags.some(tag => tag.name.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * 格式化日期
 */
export function formatDate(dateString: string, format: string = 'YYYY-MM-DD'): string {
  const date = new Date(dateString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes);
}

/**
 * 计算阅读时间（基于中文字符数）
 */
export function calculateReadTime(content: string): number {
  // 移除 Markdown 语法标记
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`[^`]+`/g, '') // 移除行内代码
    .replace(/[#*_~\[\]()]/g, '') // 移除 Markdown 符号
    .replace(/\s+/g, ''); // 移除空白字符
  
  // 中文字符数
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 英文单词数
  const englishWords = (plainText.match(/[a-zA-Z]+/g) || []).length;
  
  // 阅读速度：中文 300 字/分钟，英文 160 词/分钟
  const readTimeMinutes = Math.ceil(chineseChars / 300 + englishWords / 160);
  
  return Math.max(1, readTimeMinutes);
}

/**
 * 生成文章摘要（从内容中截取或提取 description）
 */
export function generateExcerpt(content: string, maxLength: number = 200): string {
  // 先移除代码块
  const withoutCode = content.replace(/```[\s\S]*?```/g, '');
  
  // 移除 Markdown 标记
  const plainText = withoutCode
    .replace(/[#*_~\[\]>|`\-\n]/g, '')
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.slice(0, maxLength) + '...';
}
