const localeLangs = [
  { "code": "en", "iso": "en-US", "name": "English", "file": "en.json" },
  { "code": "zh", "iso": "zh-CN", "name": "简体中文", "file": "zh.json" },
  { "code": "ms", "iso": "ms-MY", "name": "Bahasa Malaysia", "file": "ms.json" },
  { "code": "ko", "iso": "ko-KR", "name": "한국어", "file": "ko.json" }
]

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
  customRoutes: 'config', // disable custom route with page components
  // 重写路由名称 路径要写ASCII字符，不然会被双重解码导致404。需要静态化的路由也要改写。打包生成的sitemap会自动改写路径url。
  pages: {
    news: {
      en: '/news',
      zh: '/zixun',
      ms: '/berita',
      ko: '/saeob' // 'news' -> '사업' (saeob = business/news context)
    },
    'news-slug': {
      en: '/news/[slug]',
      zh: '/zixun/[slug]',
      ms: '/berita/[slug]',
      ko: '/saeob/[slug]'
    },
    about: {
      en: '/about',
      zh: '/guanyu',
      ms: '/tentang',
      ko: '/about' // 常用拼写
    },
    careers: {
      en: '/careers',
      zh: '/zhaopin',
      ms: '/kerjaya',
      ko: '/goyong' // '고용' goyong = employment
    },
    contact: {
      en: '/contact',
      zh: '/lianxi',
      ms: '/hubungi',
      ko: '/munui' // 문의 = inquiry
    },
    partnership: {
      en: '/partnership',
      zh: '/hezuo',
      ms: '/kerjasama',
      ko: '/hyeobryeok' // 협력 = cooperation
    },
    privacy: {
      en: '/privacy-policy',
      zh: '/yinsizhengce',
      ms: '/dasar-privasi',
      ko: '/geuninsi' // 개인정보 처리방침 = personal info policy
    },
    profile: {
      en: '/profile',
      zh: '/gerenziliao',
      ms: '/profil',
      ko: '/jeongbo' // 정보 = profile/info
    },
    service: {
      en: '/terms-of-service',
      zh: '/fuwutiaokuan',
      ms: '/terma-perkhidmatan',
      ko: '/yonghyeong-gwon' // 이용약관 = terms of use
    },
    testimonials: {
      en: '/testimonials',
      zh: '/yonghupingjia',
      ms: '/testimoni',
      ko: '/hyeonpyeong' // 사용자 평가 = 평가(pyeongga), 현평(hyeonpyeong)
    },
  }
}


/** d
 * 现在你是一名精通全球语言的翻译家
 * 这是我i18n重写路由名称的配置，对应国家的值是错误，现在需要你将路由翻译成当地国家语言的值，要符合ascii字符，例如中文可以翻译成对应的拼音，要有利于seo。
  */

export {
  localeLangs,
  i18nConfig
}
