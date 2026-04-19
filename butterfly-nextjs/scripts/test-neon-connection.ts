/**
 * Neon 数据库连接测试脚本
 * 功能：验证 .env 配置是否正确，能否成功连接 Neon 数据库
 * 
 * 使用：npx tsx scripts/test-neon-connection.ts
 */

import postgres from 'postgres'
import dotenv from 'dotenv'
import path from 'path'

// 加载环境变量
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ 错误：未找到 DATABASE_URL 环境变量')
  console.error('   请检查 .env 文件是否已创建')
  process.exit(1)
}

async function testConnection() {
  console.log('🔗 开始测试 Neon 数据库连接...\n')
  
  // 显示连接信息（隐藏密码）
  const safeUrl = DATABASE_URL.replace(/:(.*?)@/, ':***@')
  console.log(`📡 连接地址: ${safeUrl}\n`)

  const sql = postgres(DATABASE_URL, {
    max: 1,
  })

  try {
    // 测试基本连接
    console.log('⏳ 正在连接...')
    const result = await sql`SELECT version()`
    console.log('✅ 数据库连接成功！\n')
    
    // 显示 PostgreSQL 版本
    console.log(`📊 数据库版本: ${result[0].version}\n`)
    
    // 检查是否已有 Payload 表
    console.log('🔍 检查现有表结构...')
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `
    
    if (tables.length > 0) {
      console.log(`✅ 发现 ${tables.length} 个现有表:`)
      tables.forEach((table: any) => {
        console.log(`   - ${table.table_name}`)
      })
      console.log('\n💡 提示: Payload CMS 表已存在，将复用现有数据')
    } else {
      console.log('✅ 数据库为空（正常）')
      console.log('\n💡 提示: 首次启动时 Payload 将自动创建所有表结构')
    }

    console.log('\n' + '='.repeat(50))
    console.log('🎉 Neon 数据库配置验证通过！')
    console.log('='.repeat(50))
    console.log('\n下一步操作:')
    console.log('  运行 npm run dev 启动开发服务器')
    console.log('  访问 http://localhost:4444/admin 进入管理后台\n')

  } catch (error: any) {
    console.error('\n❌ 数据库连接失败！')
    console.error('错误信息:', error.message)
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 可能的原因:')
      console.error('   1. Neon 数据库服务器暂时不可用')
      console.error('   2. 网络连接问题')
      console.error('   3. 防火墙阻止了连接')
    } else if (error.message.includes('password')) {
      console.error('\n💡 请检查 .env 文件中的密码是否正确')
    } else if (error.message.includes('SSL')) {
      console.error('\n💡 SSL 连接问题，请确保 DATABASE_URL 包含 ?sslmode=require')
    }
    
    process.exit(1)
  } finally {
    await sql.end()
  }
}

// 执行测试
testConnection()
