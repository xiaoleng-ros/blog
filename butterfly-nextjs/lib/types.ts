/**
 * Butterfly 主题数据类型定义
 * 定义文章、分类、标签、友链等核心数据结构
 */

// 文章接口
export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO 格式日期字符串
  updated: string;
  cover?: string; // 封面图 URL 或颜色值
  cover_type?: 'img' | 'color'; // 封面类型
  content: string; // Markdown 内容
  excerpt?: string; // 摘要文本
  categories: Category[];
  tags: Tag[];
  top?: boolean; // 是否置顶
  sticky?: number; // 置顶权重
  wordcount?: number;
  min2read?: number; // 阅读时间（分钟）
  comments?: number; // 评论数
}

// 分类接口
export interface Category {
  name: string;
  path: string; // URL 路径
  count?: number; // 文章数量
}

// 标签接口
export interface Tag {
  name: string;
  path: string;
  count?: number;
}

// 友链接口
export interface FriendLink {
  name: string;
  link: string;
  avatar: string;
  description: string;
}

// 归档分组接口
export interface ArchiveGroup {
  year: number;
  months: {
    month: string; // "YYYY年MM月" 格式
    posts: Post[];
  }[];
}

// 导航菜单项接口
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

// 社交链接接口
export interface SocialLink {
  icon: string; // Font Awesome icon class
  url: string;
  color?: string;
}

// 站点配置接口（模拟 Hexo _config.yml）
export interface SiteConfig {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  avatar: string;
  nav: {
    logo?: string;
    displayTitle: boolean;
    fixed: boolean;
    menu: NavItem[];
  };
  social: SocialLink[];
  indexLayout: number;
  indexPostContent: {
    method: number;
    length: number;
  };
  aside: {
    enable: boolean;
    position: 'left' | 'right';
    mobile: boolean;
    cardAuthor: {
      enable: boolean;
      description: string;
      button: { enable: boolean; icon: string; text: string; link: string };
    };
    cardAnnouncement: { enable: boolean; content: string };
    cardRecentPost: { enable: boolean; limit: number; sort: string };
    cardCategories: { enable: boolean; limit: number; expand: string | null | undefined };
    cardTags: { enable: boolean; limit: number; color: boolean; orderby: string; order: number };
    cardArchives: { enable: boolean; type: string; format: string; order: number; limit: number };
    cardWebInfo: { enable: boolean; postCount: boolean; lastPushDate: boolean; runtimeDate?: string };
  };
  footer: {
    owner: { enable: boolean; since: number };
    copyright: { enable: boolean; version: boolean; customText: string };
  };
  darkmode: { enable: boolean; button: boolean; autoChangeMode: false | string };
  readmode: boolean;
}
