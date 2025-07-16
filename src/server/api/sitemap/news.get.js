// /api/sitemap/news
// 获取资讯列表url地址做sitemap
import { decodeString } from '@/utils/tool';

function newsHref(news) {
  return `/news/${decodeString(news.slug)}-${news.id}`
}
const locale = 'en'
const locales = ['en', 'zh', 'ko']

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.wpApiBase
  const result = await serverRequest('/wp-json/wp/v2/posts', {
    baseURL
  })
  return result.map(item => ({
    loc: newsHref(item),
    _i18nTransform: true,
    lastmod: item.updatedAt
  }))
})
 // return result.map(item => newsHref(item))
  // return result.map(item => ({
  //     url: `/${locale}${newsHref(item)}`,
  //     links: locales.map((altLocale) => ({
  //       lang: altLocale,
  //       url: `/${altLocale}${newsHref(item)}`
  //     }))
  // }))
