import { routeMap } from '@/nuxt-config/i18n.config'
import { decodeString } from '@/utils/tool';

// 如果是获取其他语言的路由
const COMMON = {
  // 首页
  index(lang = 'en') {
    if (lang === 'en') return '/'
    return `/${lang}`
  },
  // 资讯列表页
  news(lang = 'en') {
    return routeMap.news[lang]
  },
  // 资讯详情页
  newsDetail(slug, id, lang = 'en') {
    const prefix = lang === 'en' ? routeMap.news[lang] : `/${lang}${ routeMap.news[lang] }`
    return `${prefix}/${decodeString(slug)}-${id}`
  }
}

export {
  COMMON as url
}
