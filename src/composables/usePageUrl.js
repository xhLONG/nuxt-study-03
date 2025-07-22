// composables/useArticleLink.ts
export function usePageUrl() {
  const localePath = useLocalePath()

  const urls = {
    // 资讯详情页
    newsDetailUrl(news, locale) {
      const slug = `${news.slug}-${news.id}`
      return localePath({ name: 'news-slug', params: { slug } }, locale)
    },

    // 资讯页
    newsUrl(locale) {
      return localePath({ name: 'news' }, locale)
    },

    // 首页
    indexUrl(locale) {
      return localePath({ name: 'index' }, locale)
    },

    // 联系页
    contactUrl(locale) {
      return localePath({ path: 'contact' }, locale)
    },

    // 关于页
    aboutUrl(locale) {
      return localePath({ name: 'about' }, locale)
    },

    // 招聘页
    careersUrl(locale) {
      return localePath({ name: 'careers' }, locale)
    },

    // faq页
    faqUrl(locale) {
      return localePath({ name: 'faq' }, locale)
    },

    // 合作页
    partnershipUrl(locale) {
      return localePath({ name: 'partnership' }, locale)
    },

    // 隐私页
    privacyUrl(locale) {
      return localePath({ name: 'privacy' }, locale)
    },

    // 个人页
    profileUrl(locale) {
      return localePath({ name: 'profile' }, locale)
    },

    // 服务页
    serviceUrl(locale) {
      return localePath({ name: 'service' }, locale)
    },

    // 用户评价页
    testimonialsUrl(locale) {
      return localePath({ name: 'testimonials' }, locale)
    }
  }

  return urls
}
