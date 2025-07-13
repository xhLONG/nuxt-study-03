// /api/sitemap/news
// 获取资讯列表url地址做sitemap
import { decodeString } from '@/utils/tool';

function newsHref(news) {
  return `/news/${decodeString(news.slug)}-${news.id}`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.wpApiBase
  const result = await serverRequest('/wp-json/wp/v2/posts', {
    baseURL
  })
  return result.map(item => newsHref(item))
})
