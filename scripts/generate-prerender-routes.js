// scripts/generate-prerender-routes.js
import fs from 'fs-extra'
import path from 'path'
import axios from 'axios'
import { fileURLToPath } from 'url'
import { localeLangs, i18nConfig } from '../nuxt-config/i18n.env.js'

// __dirname 兼容处理（ESM 中没有默认的 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const WP_API_BASE = 'http://127.0.0.1:10030'
const NEWS_URL = `${WP_API_BASE}/wp-json/wp/v2/posts`
const OUTPUT = path.resolve(__dirname, '../nuxt-config/prerender-routes.json')

function decodeString(str) {
  try {
    return decodeURIComponent(decodeURIComponent(str))
  } catch (e) {
    console.error('string 解码错误:', str, e)
    return str
  }
}

function newsHref(news, lang) {
  const prefix = lang === 'en' ? i18nConfig.pages.news[lang] : `/${lang}${ i18nConfig.pages.news[lang] }`
  return `${prefix}/${decodeString(news.slug)}-${news.id}`
}


// 页面路由
const pageRoutes = [
  'about',
  'careers',
  'contact',
  'faq',
  'partnership',
  'privacy',
  'profile',
  'service',
  'testimonials'
]

async function generatePrerenderRoutes() {
  try {
    const res = await axios.get(NEWS_URL)
    const articles = res.data || []
    const routeRules = {}

    localeLangs.forEach(lang => {
      // 处理页面路由
      pageRoutes.forEach(route => {
        const prefix = lang.code === 'en' ? '' : `/${lang.code}`
        const localPath = i18nConfig.pages[route] ? i18nConfig.pages[route][lang.code] : `/${route}`
        routeRules[prefix+localPath] = { prerender: true }
      })
      // 处理咨询详情页路由
      articles.forEach(article => {
        const path = newsHref(article, lang.code)
        routeRules[path] = { prerender: true }
      })
    })


    await fs.writeJSON(OUTPUT, routeRules, { spaces: 2 })
    console.log(`✅ 生成成功，共 ${Object.keys(routeRules).length} 条路由 → ${OUTPUT}`)
  } catch (error) {
    console.error('❌ 生成失败:', error.message)
    process.exit(1)
  }
}

generatePrerenderRoutes()
