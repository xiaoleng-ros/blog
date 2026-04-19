# PostgreSQL 安装与配置指南（Windows）

## 一、安装 PostgreSQL

### 方案 A: 官方安装包（推荐）

1. **下载地址**: https://www.postgresql.org/download/windows/
2. **选择版本**: PostgreSQL 16 或 17（LTS 版本）
3. **安装步骤**:
   - 运行安装程序
   - 设置超级用户密码（记住这个密码！）
   - 端口保持默认 `5432`
   - 勾选 "Install Stack Builder"（可选）
   - ✅ **重要**: 勾选 "Add to PATH" 环境变量

4. **验证安装**:
```bash
# 打开新的 PowerShell 终端
psql --version
# 应输出: psql (PostgreSQL) 16.x
```

### 方案 B: 使用 Docker（开发环境推荐）

如果您已安装 Docker，可以快速启动：

```bash
# 创建并运行 PostgreSQL 容器
docker run --name butterfly-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=butterfly_blog \
  -p 5432:5432 \
  -d postgres:16-alpine

# 验证容器运行状态
docker ps | grep postgres
```

### 方案 C: 使用云数据库（生产环境）

- **Supabase** (免费额度): https://supabase.com
- **Neon** (免费 Serverless): https://neon.tech
- **Railway**: https://railway.app

## 二、创建数据库

### 方法 1: 使用 pgAdmin（图形界面）

安装 PostgreSQL 时会自带 pgAdmin：
1. 打开 pgAdmin 4
2. 连接到本地服务器（密码为安装时设置的）
3. 右键 "Databases" → Create → Database
4. 数据库名称输入: `butterfly_blog`
5. 点击 Save

### 方法 2: 使用命令行

```bash
# 连接到 PostgreSQL（使用超级用户）
psql -U postgres

# 在 psql 提示符下执行：
CREATE DATABASE butterfly_blog;
\q  # 退出
```

## 三、更新 .env 配置

根据您的实际安装情况，编辑 `butterfly-nextjs/.env` 文件：

### 本地安装场景
```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/butterfly_blog
```

### Docker 场景
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/butterfly_blog
```

### Supabase 场景
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

## 四、测试连接

创建测试脚本验证数据库连接：

```typescript
// scripts/test-db.ts
import { postgresAdapter } from '@payloadcms/db-postgres'

const adapter = postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
  },
})

async function testConnection() {
  try {
    const pool = adapter.pool
    const client = await pool.connect()
    const result = await client.query('SELECT NOW()')
    console.log('✅ 数据库连接成功！当前时间:', result.rows[0].now)
    client.release()
    process.exit(0)
  } catch (error) {
    console.error('❌ 数据库连接失败:', error.message)
    process.exit(1)
  }
}

testConnection()
```

运行测试：
```bash
npx tsx scripts/test-db.ts
```

## 五、常见问题排查

### 问题 1: `could not connect to server`
**原因**: PostgreSQL 服务未启动或端口错误
**解决**:
```bash
# Windows 服务管理
net start postgresql-x64-16  # 版本号可能不同

# 或通过服务管理器手动启动
services.msc → 找到 PostgreSQL → 启动
```

### 问题 2: `password authentication failed`
**原因**: 密码错误或用户不存在
**解决**: 检查 .env 中的密码是否正确，确保用户 `postgres` 存在

### 问题 3: `database "butterfly_blog" does not exist`
**原因**: 未创建数据库
**解决**: 按照"第二步"创建数据库

### 问题 4: Docker 容器无法访问
**原因**: 容器未运行或端口映射错误
**解决**:
```bash
docker ps -a  # 查看所有容器
docker start butterfly-postgres  # 启动容器
```

## 六、性能优化建议（可选）

对于生产环境，建议在 `postgresql.conf` 中调整：

```ini
# 内存优化
shared_buffers = 256MB          # 根据服务器内存调整
effective_cache_size = 1GB
work_mem = 16MB

# 连接优化
max_connections = 100

# 查询优化
random_page_cost = 1.1          # SSD 优化
effective_io_concurrency = 200  # SSD 优化
```

## 七、备份策略（生产环境）

```bash
# 手动备份
pg_dump -U postgres butterfly_blog > backup_$(date +%Y%m%d).sql

# 自动备份脚本（添加到 crontab/Windows 计划任务）
# 0 2 * * * /usr/bin/pg_dump -U postgres butterfly_blog > /backups/daily_$(date +\%Y\%m\%d).sql
```

---

**完成以上步骤后，请通知我继续下一步：搭建 NextAuth 认证系统！**
