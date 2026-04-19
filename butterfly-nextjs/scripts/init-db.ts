/**
 * 数据库初始化脚本
 * 功能：自动创建 butterfly_blog 数据库（如果不存在）
 * 使用：npx tsx scripts/init-db.ts
 * 
 * 注意：此脚本仅用于开发环境快速初始化
 * 生产环境建议使用 PostgreSQL 管理工具手动创建
 */

import postgres from 'postgres'
import dotenv from 'dotenv'
import path from 'path'

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ 错误：未找到 DATABASE_URL')
  process.exit(1)
}

/**
 * 从连接 URL 中提取基础连接信息（不含数据库名）
 * 用于连接到默认的 postgres 数据库
 */
function getBaseConnectionUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    // 替换路径为 postgres（默认数据库）
    urlObj.pathname = '/postgres'
    return urlObj.toString()
  } catch {
    return url.replace(/\/[^/]*$/, '/postgres')
  }
}

async function initializeDatabase() {
  console.log('🚀 开始初始化数据库...\n')

  // 连接到默认 postgres 数据库（用于创建新数据库）
  const baseSql = postgres(getBaseConnectionUrl(DATABASE_URL), {
    max: 1,
  })

  try {
    // 检查数据库是否已存在
    const existingDb = await baseSql`
      SELECT 1 FROM pg_database WHERE datname = 'butterfly_blog'
    `

    if (existingDb.length > 0) {
      console.log('✅ 数据库 "butterfly_blog" 已存在，无需重复创建')
      
      // 测试能否正常连接
      const testSql = postgres(DATABASE_URL)
      await testSql`SELECT 1`
      await testSql.end()
      console.log('✅ 连接测试通过\n')
      
    } else {
      console.log('📝 正在创建数据库 "butterfly_blog"...')
      
      // 创建数据库（使用标准 UTF-8 locale，兼容 Neon 云数据库）
      await baseSql`CREATE DATABASE butterfly_blog 
        WITH ENCODING='UTF8' 
        CONNECTION LIMIT=-1
        LC_COLLATE='C.UTF-8'
        LC_CTYPE='C.UTF-8'
      `
      
      console.log('✅ 数据库创建成功！\n')
      
      // 验证新数据库可访问
      const testSql = postgres(DATABASE_URL)
      await testSql`SELECT NOW() AS current_time`
      await testSql.end()
      console.log('✅ 新数据库连接验证通过\n')
    }

    console.log('🎉 数据库初始化完成！')
    console.log('\n下一步操作:')
    console.log('  1. 运行 npm run dev 启动开发服务器')
    console.log('  2. 访问 http://localhost:3000/admin 进入管理后台')
    console.log('  3. 首次启动会自动创建表结构\n')

  } catch (error: any) {
    console.error('\n❌ 数据库初始化失败！')
    console.error('错误信息:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 请确认:')
      console.error('   ✓ PostgreSQL 服务已启动')
      console.error('   ✓ 端口 5432 可访问')
      console.error('   ✓ 防火墙允许本地连接')
    } else if (error.message.includes('password')) {
      console.error('\n💡 请检查 .env 文件中的密码是否正确')
    }
    
    process.exit(1)
  } finally {
    await baseSql.end()
  }
}

// 执行初始化
initializeDatabase()
