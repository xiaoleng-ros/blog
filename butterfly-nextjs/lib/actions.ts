/**
 * Payload CMS 数据获取 Server Actions
 * 功能：提供从前端组件调用的服务端数据查询函数
 * 
 * 使用方式：
 * - 在 Client Component 中 import 并调用这些函数
 * - 函数自动在服务端执行，返回序列化后的数据
 */

'use server'

import getPayloadClient from './payload-client'
import type { Post, Category, Tag, ArchiveGroup } from './types'

/**
 * 获取文章列表（支持分页、排序、筛选）
 * @param options 查询选项
 * @returns 格式化的文章列表数据
 */
export async function getPosts(options?: {
  page?: number
  pageSize?: number
  category?: string
  tag?: string
  sortBy?: 'createdAt' | 'publishedAt' | 'title'
  sortOrder?: 'asc' | 'desc'
}): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  try {
    const payload = await getPayloadClient()
    
    const page = options?.page || 1
    const pageSize = options?.pageSize || 6
    const sortBy = options?.sortBy || 'createdAt'
    const sortOrder = options?.sortOrder || 'desc'

    // 构建查询条件
    const where: Record<string, any> = {
      status: { equals: 'published' }, // 只查询已发布的文章
    }

    // 按分类筛选
    if (options?.category) {
      where.categories = {
        in: await getCategoryIdsByName(options.category)
      }
    }

    // 按标签筛选
    if (options?.tag) {
      where.tags = {
        in: await getTagIdsByName(options.tag)
      }
    }

    // 执行查询
    const result = await payload.find({
      collection: 'posts',
      page,
      limit: pageSize,
      sort: `${sortOrder === 'desc' ? '-' : ''}${sortBy}`,
      where,
      depth: 2, // 关联查询（作者、分类、标签）
    })

    // 转换 Payload 数据格式为前端 Post 类型
    const posts: Post[] = result.docs.map((doc: any) => transformPostData(doc))

    return {
      posts,
      total: result.totalDocs,
      totalPages: result.totalPages,
    }
  } catch (error) {
    console.error('❌ 获取文章列表失败:', error)
    // 出错时返回空数据（保持 UI 稳定）
    return { posts: [], total: 0, totalPages: 0 }
  }
}

/**
 * 根据 slug 获取单篇文章详情
 * @param slug 文章 URL 别名
 * @returns 文章数据或 null
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayloadClient()

    const doc = await payload.find({
      collection: 'posts',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 2,
      limit: 1,
    })

    if (!doc.docs || doc.docs.length === 0) {
      return null
    }

    // 增加阅读次数（异步，不阻塞返回）
    incrementViewCount(doc.docs[0].id).catch(console.error)

    return transformPostData(doc.docs[0])
  } catch (error) {
    console.error('❌ 获取文章详情失败:', error)
    return null
  }
}

/**
 * 获取最新文章列表
 * @param limit 数量限制
 * @returns 文章数组
 */
export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'posts',
      limit,
      sort: '-createdAt',
      where: { status: { equals: 'published' } },
      depth: 1,
    })

    return result.docs.map((doc: any) => transformPostData(doc))
  } catch (error) {
    console.error('❌ 获取最新文章失败:', error)
    return []
  }
}

/**
 * 获取置顶文章
 * @param limit 数量限制
 * @returns 置顶文章数组
 */
export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'posts',
      limit,
      sort: '-createdAt',
      where: {
        status: { equals: 'published' },
        featured: { equals: true },
      },
      depth: 1,
    })

    return result.docs.map((doc: any) => transformPostData(doc))
  } catch (error) {
    console.error('❌ 获取置顶文章失败:', error)
    return []
  }
}

/**
 * 获取所有分类
 * @returns 分类列表（包含文章数量）
 */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'categories',
      limit: 100,
      sort: 'name',
      depth: 0,
    })

    // 统计每个分类的文章数量
    const categoriesWithCount = await Promise.all(
      result.docs.map(async (cat: any) => {
        const countResult = await payload.count({
          collection: 'posts',
          where: {
            categories: { in: [cat.id] },
            status: { equals: 'published' },
          },
        })

        return {
          name: cat.name,
          path: `/categories/${encodeURIComponent(cat.name)}`,
          count: countResult.totalDocs,
        }
      })
    )

    return categoriesWithCount
  } catch (error) {
    console.error('❌ 获取分类失败:', error)
    return []
  }
}

/**
 * 获取所有标签
 * @returns 标签列表（包含文章数量）
 */
export async function getAllTags(): Promise<Tag[]> {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'tags',
      limit: 100,
      sort: 'name',
      depth: 0,
    })

    // 统计每个标签的文章数量
    const tagsWithCount = await Promise.all(
      result.docs.map(async (tag: any) => {
        const countResult = await payload.count({
          collection: 'posts',
          where: {
            tags: { in: [tag.id] },
            status: { equals: 'published' },
          },
        })

        return {
          name: tag.name,
          path: `/tags/${encodeURIComponent(tag.name)}`,
          count: countResult.totalDocs,
        }
      })
    )

    return tagsWithCount
  } catch (error) {
    console.error('❌ 获取标签失败:', error)
    return []
  }
}

/**
 * 根据分类名获取文章
 * @param categoryName 分类名称
 * @returns 文章数组
 */
export async function getPostsByCategory(categoryName: string): Promise<Post[]> {
  return getPosts({ category: categoryName }).then(result => result.posts)
}

/**
 * 根据标签名获取文章
 * @param tagName 标签名称
 * @returns 文章数组
 */
export async function getPostsByTag(tagName: string): Promise<Post[]> {
  return getPosts({ tag: tagName }).then(result => result.posts)
}

/**
 * 获取归档数据（按年月分组）
 * @returns 归档分组数据
 */
export async function getArchiveData(): Promise<ArchiveGroup[]> {
  try {
    const payload = await getPayloadClient()

    // 获取所有已发布文章的日期和基本信息
    const result = await payload.find({
      collection: 'posts',
      limit: 1000, // 获取足够多的文章用于归档
      sort: '-publishedAt',
      where: { status: { equals: 'published' } },
      depth: 0,
      select: {
        id: true,
        slug: true,
        title: true,
        publishedAt: true,
      },
    })

    // 按年月分组
    const archiveMap = new Map<number, Map<string, Post[]>>()

    result.docs.forEach((doc: any) => {
      const date = new Date(doc.publishedAt || doc.createdAt)
      const year = date.getFullYear()
      const month = `${year}年${String(date.getMonth() + 1).padStart(2, '0')}月`

      if (!archiveMap.has(year)) {
        archiveMap.set(year, new Map())
      }

      const yearMap = archiveMap.get(year)!
      if (!yearMap.has(month)) {
        yearMap.set(month, [])
      }

      yearMap.get(month)!.push(transformPostData(doc))
    })

    // 转换为目标格式并按时间倒序排列
    const resultArray: ArchiveGroup[] = []
    const sortedYears = Array.from(archiveMap.keys()).sort((a, b) => b - a)

    sortedYears.forEach(year => {
      const months = archiveMap.get(year)!
      const monthEntries: ArchiveGroup['months'] = []

      const sortedMonths = Array.from(months.keys()).sort((a, b) => {
        const monthA = parseInt(a.match(/(\d+)月/)?.[1] || '0')
        const monthB = parseInt(b.match(/(\d+)月/)?.[1] || '0')
        return monthB - monthA
      })

      sortedMonths.forEach(month => {
        const monthPosts = months.get(month)!
        monthEntries.push({ month, posts: monthPosts })
      })

      resultArray.push({ year, months: monthEntries })
    })

    return resultArray
  } catch (error) {
    console.error('❌ 获取归档数据失败:', error)
    return []
  }
}

/**
 * 获取相关文章（基于共同标签）
 * @param postId 当前文章 ID
 * @param limit 数量限制
 * @returns 相关文章数组
 */
export async function getRelatedPosts(postId: string, limit: number = 6): Promise<Post[]> {
  try {
    const payload = await getPayloadClient()

    // 获取当前文章的标签
    const currentPost = await payload.findByID({
      collection: 'posts',
      id: postId,
      depth: 0,
      select: { tags: true },
    })

    if (!currentPost?.tags || currentPost.tags.length === 0) {
      // 如果没有标签，返回最新的文章
      return getRecentPosts(limit)
    }

    // 查找有相同标签的其他文章
    const tagIds = currentPost.tags.map((tag: any) =>
      typeof tag === 'string' ? tag : tag.id
    ).filter(Boolean)

    const result = await payload.find({
      collection: 'posts',
      limit: limit + 1, // 多取一条排除自身
      sort: '-createdAt',
      where: {
        and: [
          { id: { not_equals: postId } }, // 排除当前文章
          { status: { equals: 'published' } },
          { tags: { in: tagIds } }, // 有相同标签
        ],
      },
      depth: 1,
    })

    return result.docs.slice(0, limit).map((doc: any) => transformPostData(doc))
  } catch (error) {
    console.error('❌ 获取相关文章失败:', error)
    return []
  }
}

/**
 * 获取上一篇/下一篇文章
 * @param currentSlug 当前文章 slug
 * @returns 上下篇文章对象
 */
export async function getAdjacentPosts(currentSlug: string): Promise<{ prev: Post | null; next: Post | null }> {
  try {
    const payload = await getPayloadClient()

    // 获取当前文章
    const currentPost = await payload.find({
      collection: 'posts',
      where: { slug: { equals: currentSlug } },
      limit: 1,
      depth: 0,
      select: { publishedAt: true, createdAt: true },
    })

    if (!currentPost.docs || currentPost.docs.length === 0) {
      return { prev: null, next: null }
    }

    const publishDate = currentPost.docs[0].publishedAt || currentPost.docs[0].createdAt

    // 获取上一篇（发布时间更早的最新一篇）
    const prevResult = await payload.find({
      collection: 'posts',
      limit: 1,
      sort: '-publishedAt',
      where: {
        and: [
          { slug: { not_equals: currentSlug } },
          { status: { equals: 'published' } },
          { publishedAt: { less_than_equal: publishDate } },
        ],
      },
      depth: 1,
    })

    // 获取下一篇（发布时间更晚的最早一篇）
    const nextResult = await payload.find({
      collection: 'posts',
      limit: 1,
      sort: 'publishedAt',
      where: {
        and: [
          { slug: { not_equals: currentSlug } },
          { status: { equals: 'published' } },
          { publishedAt: { greater_than_equal: publishDate } },
        ],
      },
      depth: 1,
    })

    return {
      prev: prevResult.docs.length > 0 ? transformPostData(prevResult.docs[0]) : null,
      next: nextResult.docs.length > 0 ? transformPostData(nextResult.docs[0]) : null,
    }
  } catch (error) {
    console.error('❌ 获取上下篇文章失败:', error)
    return { prev: null, next: null }
  }
}

/**
 * 搜索文章（标题 + 内容匹配）
 * @param keyword 搜索关键词
 * @returns 匹配的文章数组
 */
export async function searchPosts(keyword: string): Promise<Post[]> {
  try {
    const payload = await getPayloadClient()

    const result = await payload.find({
      collection: 'posts',
      limit: 20,
      sort: '-createdAt',
      where: {
        and: [
          { status: { equals: 'published' } },
          {
            or: [
              { title: { like: keyword } },
              { excerpt: { like: keyword } },
            ],
          },
        ],
      },
      depth: 1,
    })

    return result.docs.map((doc: any) => transformPostData(doc))
  } catch (error) {
    console.error('❌ 搜索文章失败:', error)
    return []
  }
}

// ==================== 辅助函数 ====================

/**
 * 将 Payload CMS 的文档转换为前端 Post 类型
 * @param doc Payload 文档对象
 * @returns 标准 Post 对象
 */
function transformPostData(doc: any): Post {
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    date: doc.publishedAt || doc.createdAt,
    updated: doc.updatedAt,
    cover: doc.coverImage?.url || doc.coverImage?.filename || undefined,
    cover_type: doc.coverImage ? 'img' : undefined,
    content: doc.content || '',
    excerpt: doc.excerpt || undefined,
    categories: (doc.categories || []).map((cat: any) => ({
      name: typeof cat === 'string' ? cat : cat.name,
      path: `/categories/${encodeURIComponent(typeof cat === 'string' ? cat : cat.name)}`,
    })),
    tags: (doc.tags || []).map((tag: any) => ({
      name: typeof tag === 'string' ? tag : tag.name,
      path: `/tags/${encodeURIComponent(typeof tag === 'string' ? tag : tag.name)}`,
    })),
    top: doc.featured || false,
    sticky: doc.featured ? 99 : 0,
    wordcount: doc.wordCount || undefined,
    min2read: doc.readTime || undefined,
    comments: 0, // TODO: 接入评论系统后更新
  }
}

/**
 * 根据分类名获取分类 ID 列表
 * @param name 分类名称
 * @returns ID 数组
 */
async function getCategoryIdsByName(name: string): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'categories',
      where: { name: { equals: name } },
      limit: 1,
      depth: 0,
    })
    return result.docs.map((doc: any) => doc.id)
  } catch {
    return []
  }
}

/**
 * 根据标签名获取标签 ID 列表
 * @param name 标签名称
 * @returns ID 数组
 */
async function getTagIdsByName(name: string): Promise<string[]> {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'tags',
      where: { name: { equals: name } },
      limit: 1,
      depth: 0,
    })
    return result.docs.map((doc: any) => doc.id)
  } catch {
    return []
  }
}

/**
 * 增加文章阅读次数（异步执行）
 * @param postId 文章 ID
 */
async function incrementViewCount(postId: string): Promise<void> {
  try {
    const payload = await getPayloadClient()
    
    // 调用自定义端点增加阅读计数
    await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL || ''}/api/posts/increment-view/${postId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    // 静默失败，不影响主流程
    console.warn('⚠️ 更新阅读计数失败:', error)
  }
}
