// composables/useArticleLink.ts
export function usePageUrl() {
  const localePath = useLocalePath()

  /**
   * 获取资讯详情页的本地化链接
   * @param news - 文章 {slug:　＂＂, id:　２}
   * @returns {string} - 生成的本地化路径
   */
  function getArticleUrl(news) {
    const slug = `${news.slug}-${news.id}`
    return localePath({ name: 'news-slug', params: { slug } })
  }
  function getNewsUrl() {
    return localePath({ name: 'news'})
  }
  function getHomeUrl() {
    return localePath({ path: '/'})
  }

  return {
    getArticleUrl,
    getNewsUrl,
    getHomeUrl
  }
}
