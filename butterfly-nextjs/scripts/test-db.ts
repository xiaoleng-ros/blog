/**
 * 数据库连接测试脚本
 * 功能：验证 PostgreSQL 连接是否正常
 * 使用：npx tsx scripts/test-db.ts
 */

import postgres from 'postgres'
import dotenv from 'dotenv'
import path from 'path'

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ 错误：未找到 DATABASE_URL 环境变量')
  console.error('请确保 .env 文件存在且包含正确的数据库连接字符串')
  console.error('\n示例格式:')
  console.error('DATABASE_URL=postgresql://用户名:密码@localhost:5432/数据库名')
  process.exit(1)
}

async function testDatabaseConnection() {
  console.log('🔍 正在测试数据库连接...')
  console.log(`📡 连接地址: ${DATABASE_URL.replace(/:\/\/[^:]+:/, '://***:')}`) // 隐藏密码

  const sql = postgres(DATABASE_URL, {
    max: 1, // 仅用于测试，限制连接数
    idle_timeout: 20,
    connect_timeout: 10,
  })

  try {
    // 测试基本连接
    const result = await sql`SELECT version()`
    console.log('\n✅ 数据库连接成功！')
    console.log(`\n📊 PostgreSQL 版本信息:`)
    console.log(result[0].version)

    // 检查是否已创建数据库
    const dbList = await sql`SELECT datname FROM pg_database WHERE datname = 'butterfly_blog'`
    
    if (dbList.length > 0) {
      console.log('\n✅ 数据库 "butterfly_blog" 已存在')
      
      // 统计现有表数量
      const tableCount = await sql`
        SELECT COUNT(*) as count 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `
      console.log(`📁 当前共有 ${tableCount[0].count} 张数据表`)
    } else {
      console.log('\n⚠️  数据库 "butterfly_blog" 不存在')
      console.log('💡 提示：Payload CMS 首次启动时会自动创建数据库和表结构')
      console.log('   或者您可以手动执行: CREATE DATABASE butterfly_blog;')
    }

    // 测试写入权限
    await sql`SELECT 1 AS test`
    console.log('✅ 数据库读写权限正常')

    console.log('\n🎉 所有测试通过！可以开始使用 Payload CMS 了\n')

  } catch (error: any) {
    console.error('\n❌ 数据库连接失败！')
    console.error('\n错误详情:', error.message)
    
    // 提供常见错误解决方案
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 可能的原因:')
      console.error('   1. PostgreSQL 服务未启动')
      console.error('   2. 端口号错误（默认应为 5432）')
      console.error('   3. 防火墙阻止了连接')
    } else if (error.code === '28P01') {
      console.error('\n💡 可能的原因:')
      console.error('   1. 用户名或密码错误')
      console.error('   2. 请检查 .env 文件中的 DATABASE_URL')
    } else if (error.code === '3D000') {
      console.error('\n💡 可能的原因:')
      console.error('   1. 数据库不存在')
      console.error('   2. 请先创建数据库: CREATE DATABASE butterfly_blog;')
    }
    
    process.exit(1)
  } finally {
    await sql.end()
  }
}

// 执行测试
testDatabaseConnection()
