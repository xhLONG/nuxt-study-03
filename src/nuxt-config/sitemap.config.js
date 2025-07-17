// changefreq: 'weekly' 'daily' 'hourly'

// 获取打包时的时间戳（构建时只执行一次）
const buildTime = new Date().toISOString()

const sitemap = {
  xsl: import.meta.dev,
  xslTips: import.meta.dev,
  debug: import.meta.dev,
  autoI18n: true,
  i18n: true,
  hostname: process.env.DOMAIN,
  xslColumns: [
    // URL column must always be set, no value needed
    { label: 'URL', width: '50%' },
    { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
    { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
    { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' },
    { label: 'Hreflangs', select: 'count(xhtml:link)', width: '25%' },
  ],
  sitemaps: {
    pages: {
      // extend the nuxt:pages app source
      includeAppSources: true,
      exclude: ['/news/**','!/news','/zixun/**','/berita/**','/saeob/**'],
      defaults: { priority: 1, changefreq: 'daily', lastmod: buildTime},
    },
    news: {
      sources: ['/api/sitemap/news'],
      defaults: { priority: 0.9, changefreq: 'hourly', lastmod: buildTime},
      chunks: true,
      chunkSize: 2000, // Alternative way to specify chunk size
    },
    products: {
      // sources: ['/api/products'],
      urls() {
        // resolved when the sitemap is shown
        return ['/foo', '/bar']
      },
    },
  },
}

export {
  sitemap
}
