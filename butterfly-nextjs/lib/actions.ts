/**
 * 数据获取 Server Actions
 * 功能：提供文章列表、文章详情等数据获取函数
 * 数据源：本地模拟数据 (lib/data.ts)
 */

'use server';

import { posts, categories, tags, friendLinks } from './data';
import type { Post, ArchiveGroup } from './types';

/**
 * 获取文章列表（支持分页、排序、筛选）
 * @param options 查询选项
 * @returns 文章列表及分页信息
 */
export async function getPosts(options?: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
  tag?: string;
  search?: string;
}): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const {
    page = 1,
    pageSize = 6,
    sortBy = 'date',
    sortOrder = 'desc',
    category,
    tag,
    search,
  } = options || {};

  // 过滤已发布的文章
  let filteredPosts = [...posts];

  // 按分类筛选
  if (category) {
    filteredPosts = filteredPosts.filter((post) =>
      post.categories?.some((c) => c.path === `/categories/${category}`)
    );
  }

  // 按标签筛选
  if (tag) {
    filteredPosts = filteredPosts.filter((post) =>
      post.tags?.some((t) => t.path === `/tags/${tag}`)
    );
  }

  // 搜索筛选
  if (search) {
    const lowerSearch = search.toLowerCase();
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerSearch) ||
        post.content.toLowerCase().includes(lowerSearch)
    );
  }

  // 排序
  filteredPosts.sort((a, b) => {
    const aValue = a[sortBy as keyof Post] || '';
    const bValue = b[sortBy as keyof Post] || '';
    if (sortOrder === 'asc') {
      return String(aValue).localeCompare(String(bValue));
    }
    return String(bValue).localeCompare(String(aValue));
  });

  // 分页
  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginatedPosts = filteredPosts.slice(start, start + pageSize);

  return {
    posts: paginatedPosts,
    total,
    totalPages,
  };
}

/**
 * 根据 slug 获取单篇文章
 * @param slug 文章 slug
 * @returns 文章数据
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * 获取分类列表
 * @returns 分类数组
 */
export async function getCategories() {
  return categories;
}

/**
 * 获取标签列表
 * @returns 标签数组
 */
export async function getTags() {
  return tags;
}

/**
 * 获取友链列表
 * @returns 友链数组
 */
export async function getFriendLinks() {
  return friendLinks;
}

/**
 * 获取归档数据
 * @returns 按年月分组的文章归档
 */
export async function getArchiveData(): Promise<ArchiveGroup[]> {
  const { posts: allPosts } = await getPosts({ pageSize: 1000 });

  const archiveMap = new Map<number, Map<string, Post[]>>();

  allPosts.forEach((post) => {
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
  const sortedYears = Array.from(archiveMap.keys()).sort((a, b) => b - a);

  sortedYears.forEach((year) => {
    const months = archiveMap.get(year)!;
    const monthEntries: ArchiveGroup['months'] = [];

    const sortedMonths = Array.from(months.keys()).sort((a, b) => {
      const monthA = parseInt(a.match(/(\d+)月/)?.[1] || '0');
      const monthB = parseInt(b.match(/(\d+)月/)?.[1] || '0');
      return monthB - monthA;
    });

    sortedMonths.forEach((month) => {
      const monthPosts = months.get(month)!
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      monthEntries.push({ month, posts: monthPosts });
    });

    result.push({ year, months: monthEntries });
  });

  return result;
}

/**
 * 获取相邻文章（上一篇、下一篇）
 * @param currentSlug 当前文章 slug
 * @returns 包含上一篇和下一篇文章的对象
 */
export async function getAdjacentPosts(
  currentSlug: string
): Promise<{ prev: Post | null; next: Post | null }> {
  const { posts: allPosts } = await getPosts({ pageSize: 1000 });
  const currentIndex = allPosts.findIndex((p) => p.slug === currentSlug);

  return {
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null,
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : null,
  };
}
