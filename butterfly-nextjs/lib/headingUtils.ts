/**
 * 标题 ID 生成工具函数
 * 统一用于 PostToc 和 PostContent，确保 ID 完全一致
 */

/**
 * 将标题文本转换为 slug 格式的 ID
 * @param text - 标题文本（可以是字符串或 ReactNode）
 * @returns 生成的 slug ID
 */
export function generateHeadingId(text: string | any): string {
  // 如果是 ReactNode，先转为纯文本
  let str = typeof text === 'string' ? text : String(text);

  // 清理 Markdown 语法符号
  str = str.replace(/[*_`#]/g, '').trim();

  // 生成 slug：小写 + 非字母数字替换为横线
  return str
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-|-$/g, '');
}
