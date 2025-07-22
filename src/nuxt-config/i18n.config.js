const localeLangs = [
  { "code": "en", "iso": "en-US", "name": "English", "flag": "us", "file": "en.json" },
  { "code": "zh", "iso": "zh-CN", "name": "简体中文", "flag": "cn", "file": "zh.json" },
  { "code": "ms", "iso": "ms-MY", "name": "Bahasa Malaysia", "flag": "my", "file": "ms.json" },
  { "code": "ko", "iso": "ko-KR", "name": "한국어", "flag": "kr", "file": "ko.json" }
]

// 重写路由名称 路径要写ASCII字符，不然会被双重解码导致404。需要静态化的路由也要改写。打包生成的sitemap会自动改写路径url。
const routeMap = {
  news: {
    en: '/news',
    zh: '/zixun',
    ms: '/berita',
    ko: '/news'
  },
  'news-slug': {
    en: '/news/[slug]',
    zh: '/zixun/[slug]',
    ms: '/berita/[slug]',
    ko: '/news/[slug]'
  },
  about: {
    en: '/about',
    zh: '/guanyu',
    ms: '/tentang',
    ko: '/about'
  },
  // 招聘
  careers: {
    en: '/careers',
    zh: '/zhaopin',
    ms: '/kerjaya',
    ko: '/careers'
  },
  contact: {
    en: '/contact',
    zh: '/lianxi',
    ms: '/contact',
    ko: '/contact' // 문의 = inquiry
  },
  // 商务合作
  partnership: {
    en: '/partnership',
    zh: '/hezuo',
    ms: '/kerjasama',
    ko: '/partnership'
  },
  // 隐私条款
  privacy: {
    en: '/privacy-policy',
    zh: '/yinsizhengce',
    ms: '/dasar-privasi',
    ko: '/privacy-policy'
  },
  profile: {
    en: '/profile',
    zh: '/gerenziliao',
    ms: '/profile',
    ko: '/profile'
  },
  // 服务条款
  service: {
    en: '/terms-of-service',
    zh: '/fuwutiaokuan',
    ms: '/terma-perkhidmatan',
    ko: '/terms-of-service'
  },
  // 用户评价
  testimonials: {
    en: '/testimonials',
    zh: '/yonghupingjia',
    ms: '/testimonials',
    ko: '/testimonials'
  },
}

const i18nConfig = {
  locales: localeLangs,
  defaultLocale: 'en',
  strategy: 'prefix_except_default',
  lazy: true,
  langDir: 'locales/',
  detectBrowserLanguage: {
    useCookie: true,
    fallbackLocale: 'en'
  },
  seo: true, // 自动添加 hreflang 链接
  customRoutes: 'config', // disable custom route with page components
  pages: routeMap
}


/** d
 * 现在你是一名精通全球语言的翻译家
 * 这是我i18n重写路由名称的配置，对应国家的值是错误，现在需要你将路由翻译成当地国家语言的值，要符合ascii字符，例如中文可以翻译成对应的拼音，如果没有合适的值可以用英语，要有利于seo。
  */

export {
  localeLangs,
  routeMap,
  i18nConfig
}
