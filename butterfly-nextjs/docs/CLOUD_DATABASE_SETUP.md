# ☁️ 云数据库配置指南（Supabase / Neon）

本文档指导您如何使用免费的云 PostgreSQL 数据库服务来运行 Butterfly Blog。

---

## 📋 快速选择

| 您的需求 | 推荐方案 | 耗时 |
|---------|----------|------|
| **功能全面、文档友好** | ✅ **Supabase** | 3 分钟 |
| **纯轻量数据库** | ✅ **Neon** | 2 分钟 |

---

## 方案一：Supabase（推荐）⭐

### 为什么选 Supabase？

- ✅ **免费额度大**: 500MB 存储 + 50,000 月活用户
- ✅ **功能丰富**: 内置 Auth（认证）、Storage（文件存储）、实时订阅
- ✅ **可视化面板**: 类似 Firebase 的管理界面
- ✅ **自动备份**: 每日备份免费
- ✅ **中文社区活跃**: 微信群、QQ 群支持

### 步骤 1: 注册账号 (1 分钟)

1. 打开 https://supabase.com
2. 点击右上角 **"Start your project"**
3. 选择登录方式：
   - GitHub 登录（⚡ 最快）
   - Google 登录
   - 邮箱注册

### 步骤 2: 创建项目 (1-2 分钟)

1. 点击 **"New Project"** 按钮
2. 填写表单：

   | 字段 | 填写内容 | 说明 |
   |------|----------|------|
   | **Name** | `butterfly-blog` | 项目名称（可自定义） |
   | **Database Password** | `YourStrongPassword123!` | ⚠️ **记住这个密码！** |
   | **Region** | `Northeast Asia (Tokyo)` | 选亚洲节点延迟更低 |
   | **Pricing Plan** | Free tier | 免费版足够用 |

3. 点击 **"Create new project"**
4. ⏳ 等待初始化完成（通常 1-2 分钟）
5. 看到 "Status: Active. Project is up and running." 即成功

### 步骤 3: 获取连接字符串 (30 秒)

1. 在左侧菜单点击 **"Settings"**（齿轮图标）⚙️
2. 点击子菜单 **"Database"**
3. 向下滚动找到 **"Connection string"** 区域
4. 点击切换到 **"URI"** 标签页
5. 复制连接字符串，格式如下：
   ```
   postgresql://postgres.[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### 步骤 4: 配置 .env 文件 (1 分钟)

编辑 `butterfly-nextjs/.env` 文件，将第 14 行替换为您的实际连接字符串：

```bash
# 找到这一行：
DATABASE_URL=postgresql://postgres:YOUR_STRONG_PASSWORD@db.abcdefghijklmnop.supabase.co:5432/postgres

# 替换为：
DATABASE_URL=postgresql://postgres.您在步骤2设置的密码@db.您的项目ID.supabase.co:5432/postgres
```

**示例**（假设密码是 `MyP@ss2024`，项目ID 是 `xyz123abc`）：
```
DATABASE_URL=postgresql://postgres.MyP%40ss2024@db.xyz123abc.supabase.co:5432/postgres
```

> 💡 **注意**: 如果密码包含特殊字符（如 `@`、`#`、`!`），需要进行 URL 编码：
> - `@` → `%40`
> - `#` → `%23`
> - `!` → `%21`
> - 或使用在线工具：https://www.urlencoder.org/

### 步骤 5: 测试连接 (10 秒)

```bash
cd butterfly-nextjs
npm run db:test
```

看到以下输出即成功：
```
✅ 数据库连接成功！
📊 PostgreSQL 版本信息: PostgreSQL 15.x.x ...
✅ 数据库读写权限正常
🎉 所有测试通过！可以开始使用 Payload CMS 了
```

### 步骤 6: 启动项目 🚀

```bash
npm run dev
```

访问 http://localhost:3000/admin 创建管理员账户！

---

## 方案二：Neon（Serverless PostgreSQL）

### 为什么选 Neon？

- ✅ **真正的 Serverless**: 自动扩缩容、按使用计费
- ✅ **启动极快**: 1 分钟创建完成
- ✅ **无连接数限制**: 不像传统 PostgreSQL 有 max_connections 问题
- ✅ **Branch 功能**: 开发/测试/生产环境分支管理（类似 Git）
- ✅ **免费额度**: 0.5GB 存储 + 无限读取

### 步骤 1: 注册账号 (30 秒)

1. 访问 https://neon.tech
2. 点击 **"Sign up with GitHub"**（最快）
3. 授权 GitHub 账号登录

### 步骤 2: 创建项目 (1 分钟)

1. 点击 **"Create a project"** 按钮
2. 填写信息：
   - **Project name**: `butterfly-blog`
   - **PostgreSQL version**: 16（默认最新）
   - **Region**: `AWS Asia Pacific (Tokyo)` 或 `Asia Pacific (Mumbai)`
3. 点击 **"Create project"**

### 步骤 3: 获取连接字符串 (30 秒)

创建完成后会显示 **Dashboard** 页面：

1. 点击 **"Connection string"** 标签
2. 选择 **"Prisma"** 或 **"Node.js"** 格式
3. 复制连接字符串，格式：
   ```
   postgresql://butterfly_user:YOUR_PASSWORD@ep-cool-dark-123456.us-east-2.aws.neon.tech/butterfly_blog?sslmode=require
   ```

> ⚠️ **重要**: Neon 的连接字符串末尾必须带 `?sslmode=require` 参数！

### 步骤 4: 配置 .env 文件

编辑 `.env` 文件，取消注释第 19 行并替换：

```bash
DATABASE_URL=postgresql://butterfly_user:您的密码@ep-xxx.region.neon.tech/butterfly_blog?sslmode=require
```

### 步骤 5: 测试 & 启动

同 Supabase 的步骤 5 和步骤 6。

---

## 🔧 高级配置（可选）

### A. 重置数据库（清空所有数据）

**Supabase**:
1. 进入项目 Dashboard
2. 左侧菜单 **"Database"** → **"Tables"**
3. 右上角 **"Reset project"**（⚠️ 会删除所有数据！）

**Neon**:
1. 进入 Dashboard
2. 点击 **"Settings"** → **"Delete database"**
3. 重新创建即可

### B. 数据库备份

**Supabase（自动）**:
- 免费版每日自动备份一次
- 手动备份：左侧 **"Backups"** → **"Create new backup"**

**Neon（手动）**:
- 使用命令行工具：
  ```bash
  pg_dump -d "您的连接字符串" > backup_$(date +%Y%m%d).sql
  ```

### C. 性能监控

**Supabase**:
- 左侧 **"Logs"** → 查看 SQL 查询日志
- 左侧 **"Metrics"** → 监控数据库性能指标

**Neon**:
- Dashboard 显示实时查询统计
- 支持 **Explain Analyze** 分析慢查询

### D. 连接池配置（高并发场景）

如果遇到 "too many connections" 错误：

**Supabase**:
1. Settings → Database → Connection Pooling
2. 启用 **Transaction mode** 或 **Session mode**
3. 使用连接池的连接字符串（端口改为 `6543`）

**Neon**:
- 默认已启用连接池（PgBouncer）
- 直接使用提供的连接池 URL 即可

---

## ❓ 常见问题排查

### Q1: 连接超时或拒绝连接

**原因分析**:
- 云数据库 IP 白名单限制
- 网络防火墙阻止
- 连接字符串格式错误

**解决方案**:
1. **Supabase**: 
   - Settings → Database → Connection pooler → Mode 设为 Transaction
   - 检查是否启用了 IP 限制（免费版无限制）

2. **Neon**:
   - 确认连接字符串末尾有 `?sslmode=require`
   - 检查密码是否正确（区分大小写）

### Q2: 密码包含特殊字符导致连接失败

**错误信息**: `invalid connection format`

**解决方法**: 对特殊字符进行 URL 编码：
```javascript
// Node.js 中编码
const encodedPassword = encodeURIComponent('P@ssw0rd!')
// 输出: P%40ssw0rd!
```

常用编码对照表：
| 字符 | 编码后 |
|------|--------|
| `@` | `%40` |
| `#` | `%23` |
| `$` | `%24` |
| `!` | `%21` |
| `&` | `%26` |
| `+` | `%2B` |
| `=` | `%3D` |

### Q3: SSL/TLS 证书错误（仅 Neon）

**错误信息**: `self-signed certificate`

**解决方法**: 确保连接字符串包含：
```
?sslmode=require
```

或在代码中添加：
```typescript
// payload.config.ts
db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // 仅开发环境
  },
}),
```

### Q4: 免费额度用完了怎么办？

**Supabase 免费版限制**:
- 存储：500MB
- 数据库大小：500MB
- 文件存储：1GB
- 月活用户：50,000
- 带宽：2GB/月

**升级方案**:
- Pro 版：$25/月（8GB 存储 + 100K 用户）
- 团队版：$599/月（企业级功能）

**Neon 免费版限制**:
- 存储：0.5GB
- 计算时间：194 小时/月（Serverless Auto-suspend 后不计算）
- 数据库数量：10 个

**省钱技巧**:
- 定期清理无用数据
- 使用压缩图片（TinyPNG）
- 启用 Serverless 自动休眠（Neon 默认开启）

### Q5: 如何迁移到其他数据库？

**从 Supabase 导出数据**:
1. 左侧 **"SQL Editor"**
2. 运行导出脚本：
   ```sql
   -- 导出所有表结构
   \dt
   -- 导出数据为 CSV
   COPY (SELECT * FROM posts) TO STDOUT WITH CSV HEADER;
   ```

**导入到新数据库**:
```bash
psql -d "新数据库连接串" < dump_file.sql
```

---

## 🛡️ 安全建议

### 1. 强密码策略

生成强密码的命令：
```bash
# Windows PowerShell
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# 输出示例：Xy7#mN9$pQ2@vL5&wR8
```

**密码要求**:
- 长度 ≥ 12 个字符
- 包含大小写字母 + 数字 + 特殊字符
- 不要使用生日、手机号等易猜信息

### 2. 环境变量安全

❌ **禁止操作**:
- 将 .env 文件提交到 Git 仓库
- 在前端代码中硬编码数据库密码
- 使用公开的 Pastebin 分享连接字符串

✅ **正确做法**:
- 确保 `.gitignore` 包含 `.env`
- 生产环境通过平台环境变量注入（Vercel/ Railway/Docker Secrets）
- 定期轮换密码（每 90 天）

### 3. 网络安全

**Supabase**:
- 免费版默认允许所有 IP 访问（适合开发）
- 生产版可设置 IP 白名单

**Neon**:
- 支持密码认证和 TLS 加密
- 可配置 VPC 私有网络（付费版）

---

## 📊 对比总结

| 特性 | Supabase | Neon |
|------|----------|------|
| **注册速度** | 1 分钟 | 30 秒 |
| **创建项目** | 2 分钟 | 1 分钟 |
| **免费存储** | 500MB | 0.5GB |
| **免费带宽** | 2GB/月 | 无限读取 |
| **额外功能** | Auth/Storage/Realtime | Branch/Scale-to-zero |
| **管理界面** | ✅ 完整 Dashboard | ✅ 简洁控制台 |
| **中文文档** | ✅ 有 | ❌ 英文为主 |
| **适合场景** | 全栈应用 | 纯 API/数据库 |
| **学习曲线** | 低 | 中等 |

---

## 🎯 推荐决策树

```
开始选择云数据库
    │
    ├─ 需要完整后端功能（Auth/文件存储/实时推送）？
    │   └─ YES → 选择 **Supabase** ✅
    │
    ├─ 只需要一个轻量的 PostgreSQL？
    │   └─ YES → 选择 **Neon** ✅
    │
    └─ 不确定？先试 **Supabase**（功能更全面）
```

---

## 📞 获取帮助

- **Supabase 文档**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Neon 文档**: https://neon.tech/docs
- **GitHub Issues**: https://github.com/xiaoleng-ros/blog/issues

---

**💡 提示**: 无论选择哪个方案，只需 3-5 分钟即可完成配置并启动项目！祝您使用愉快！🚀
