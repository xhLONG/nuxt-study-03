// scripts/generate-prerender-routes.js
const fs = require('fs-extra')
const path = require('path')
const axios = require('axios')

const WP_API_BASE = 'http://127.0.0.1:10024'
const NEWS_URL = WP_API_BASE + '/wp-json/wp/v2/posts'
const OUTPUT = path.resolve(__dirname, '../nuxt-config/prerender-routes.json')

function newsHref(news) {
  return `/news/${decodeString(news.slug)}-${news.id}`
}
function decodeString(str){
  try {
    return decodeURIComponent(decodeURIComponent(str));
  } catch (e) {
    console.error('string 解码错误:', str, e);
    return str;
  }
};

const routeRules = {
  '/about': { prerender: true },
  '/careers': { prerender: true },
  '/contact': { prerender: true },
  '/faq': { prerender: true },
  '/partnership': { prerender: true },
  '/privacy-policy': { prerender: true },
  '/profile': { prerender: true },
  '/terms-of-service': { prerender: true },
  '/testimonials': { prerender: true },
}

async function generatePrerenderRoutes() {
  try {
    const res = await axios.get(NEWS_URL)
    const articles = res.data || []

    // 构建 routeRules 对象
    articles.forEach(article => {
      routeRules[`${newsHref(article)}`] = { prerender: true }
    });
    // console.log("-----> routeRules: ", routeRules)

    // 写入 JSON
    fs.writeFileSync(OUTPUT, JSON.stringify(routeRules, null, 2), 'utf-8')
    console.log(`✅ 生成成功，共 ${Object.keys(routeRules).length} 条路由 → ../nuxt-config/prerender-routes.json`)
  } catch (error) {
    console.error('❌ 生成失败:', error.message)
    process.exit(1)
  }
}


generatePrerenderRoutes()
