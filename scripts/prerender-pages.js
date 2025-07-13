// scripts/prerender-pages.js (ESM写法)
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname 替代方案（因为 ES 模块没有 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取路由参数
const routes = process.argv.slice(2)

if (routes.length === 0) {
  console.error('❌ 请传入一个或多个路由路径，例如：/blog/123 /about')
  process.exit(1)
}

// 检查 .output 是否存在
if (!fs.existsSync('.output')) {
  console.error('❌ 未发现 .output 文件夹，请先运行 `nuxi build`')
  process.exit(1)
}

for (const route of routes) {
  try {
    console.log(`📦 开始生成静态页面：${route}`)
    console.log(`执行命令：nuxi prerender ${route}`)
    execSync(`nuxi prerender ${route}`, { stdio: 'inherit' })

    // 可选复制到 dist/
    const publicPath = path.join('.output/public', route)
    const distPath = path.join('dist', route)

    if (fs.existsSync(publicPath)) {
      fs.mkdirSync(distPath, { recursive: true })
      fs.cpSync(publicPath, distPath, { recursive: true })
      console.log(`✅ 页面已写入：${distPath}/index.html`)
    } else {
      console.warn(`⚠️ 未找到 .output/public 对应目录：${publicPath}`)
    }
  } catch (e) {
    console.error(`❌ 生成失败: ${route}`)
    console.error(e.message)
  }
}
