// /api/sitemap/news
// 获取资讯列表url地址做sitemap
import { decodeString } from '@/utils/tool';
import { localeLangs, i18nConfig } from '~/nuxt-config/i18n.config.js';

function newsHref(news, lang) {
  const prefix = lang === 'en' ? i18nConfig.pages.news[lang] : `/${lang}${i18nConfig.pages.news[lang]}`
  return `${prefix}/${decodeString(news.slug)}-${news.id}`
}

// 设置_i18nTransform:true后会为该条链接生成对应语言的链接并加上语言前缀
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.wpApiBase
  const newsList = await serverRequest('/wp-json/wp/v2/posts', {
    baseURL
  })

  // 英语资讯
  const enNewsUrl = newsList.map(news => {
    return {
      loc: newsHref(news, 'en')
    }
  })
  // 中文资讯
  const zhNewsUrl = newsList.map(news => {
    return {
      loc: newsHref(news, 'zh')
    }
  })
  // 马来资讯
  const msNewsUrl = newsList.map(news => {
    return {
      loc: newsHref(news, 'ms')
    }
  })
  // 韩语资讯
  const koNewsUrl = newsList.map(news => {
    return {
      loc: newsHref(news, 'ko')
    }
  })

  return [...enNewsUrl, ...zhNewsUrl, ...msNewsUrl, ...koNewsUrl]
})

