// composables/useStructuredData.js
export function useStructuredData(data) {
  const runtimeConfig = useRuntimeConfig()
  const { locale, locales } = useI18n()
  const { getHomeUrl,getContactUrl } = usePageUrl()
  const domain = runtimeConfig.public.domain
  const globalTitle = runtimeConfig.public.globalTitle
  const facebookContact = runtimeConfig.public.facebookContact
  const youtubeContact = runtimeConfig.public.youtubeContact
  const instagramContact = runtimeConfig.public.instagramContact
  const email = runtimeConfig.public.email
  let { includeTypes = [], excludeTypes = [], article = {}, pageTdk = {}, faqList = [], breadcrumbList = [] } = data
  const structuredTypes = []

  const currentIso = locales.value.find(l => l.code === locale.value)?.iso || locale.value
  const homeUrl = `${domain}${getHomeUrl()}`

  const structuredData = {
    // 每页都要webpage
    WebPage: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${pageTdk.title}`,
        "image": `${pageTdk.imgUrl}`,
        "keywords": `${pageTdk.keywords}`,
        "description": `${pageTdk.description}`,
        "@id": `${pageTdk.url}`,
        "url": `${pageTdk.url}`,
        "datePublished": `${pageTdk.datePublished || new Date().toISOString()}`,
        "dateModified": `${pageTdk.dateModified || new Date().toISOString()}`,
        "inLanguage": `${pageTdk.lang || currentIso ||'en-US'}`
      })
    },
    Organization: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": `${globalTitle}`,
        "url": `${homeUrl}`,
        "logo": `${domain}/logo.png`,
        "sameAs": [
          facebookContact,
          youtubeContact,
          instagramContact
        ]
      })
    },
    NewsArticle: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": `${article.title?.slice(0, 109)}`,
        "abstract": `${article.excerpt?.replace(/<\/?[^>]+>/g, '').slice(0, 200)}`,
        "articleBody": `${article.excerpt?.replace(/<\/?[^>]+>/g, '')}`,
        "mainEntityOfPage": `${pageTdk.url}`,
        "datePublished": `${article.datePublished || new Date().toISOString()}`,
        "dateModified": `${article.dateModified || new Date().toISOString()}`,
        "author": {
          "@type": "Person",
          "name": `${article.author}`
        },
        "publisher": {
          "@type": "Organization",
          "name": `${globalTitle}`,
          "url": `${homeUrl}`,
          "logo": {
            "@type": "ImageObject",
            "url": `${domain}/logo.png`,
            "height": "64",
            "width": "64"
          }
        },
        "image": {
          "@type": "ImageObject",
          "url": `${article.imgUrl}`
        },
      })
    },
    BreadcrumbList: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "name": `${globalTitle}`,
        "itemListElement": breadcrumbList.map((breadcrumb, idx) => ({
          "@type": "ListItem",
          "name": `${breadcrumb.name}`,
          "position": `${idx+1}`,
          "item": {
            "@type": "Thing",
            "@id": `${breadcrumb.url}`
          }
        }))
      })
    },
    hreview: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "hreview",
        "item": `${article.title}`,
        "summary": `${article.excerpt?.replace(/<\/?[^>]+>/g, '').slice(0, 200)}`,
        "dtreviewed": `${new Date().toISOString()}`,
        "reviewer": {
          "@type": "hcard",
          "fn": `${article.author}` || 'jack'
        }
      })
    },
    WPHeader: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WPHeader",
        "id": ""
      })
    },
    WPFooter: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WPFooter",
        "id": ""
      })
    },
    ContactPage: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Us",
        "url": `${domain}${getContactUrl()}`,
        "publisher": {
          "@type": "Organization",
          "name": `${globalTitle}`,
          "contactPoint": {
            "@type": "ContactPoint",
            "email": `${email}`,
            "contactType": "customer service",
            "areaServed": "CN",
            "availableLanguage": ["zh-CN", "en-US"]
          }
        }
      })
    },
    FAQPage: {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          ...faqList.map(faq => ({
            "@type": "Question",
            "name": `${faq.question}`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${faq.answer}`
            }
          }))
        ]
      })
    }
  }

  // 动态控制结构化数据类型
  if (pageTdk.url === `${homeUrl}`) {
    // 只有首页有website
    structuredData.WebSite = {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": `${globalTitle}`,
        "url": `${homeUrl}`,
        "inLanguage": `${pageTdk.lang || currentIso || 'en-US'}`,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${homeUrl}/?s={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      })
    }
  }
  // 删掉没有数据的结构化
  if (!Object.keys(article).length) {
    delete structuredData.NewsArticle
  }
  if (!faqList.length) {
    delete structuredData.FAQPage
  }
  if (!breadcrumbList.length) {
    delete structuredData.BreadcrumbList
  }

  // 判断包含和排除的类型
  if (includeTypes.length) {
    Object.assign(structuredTypes, includeTypes)
  } else {
    Object.keys(structuredData).forEach(type => {
      if (!excludeTypes.includes(type)) {
        structuredTypes.push(type)
      }
    })
  }
  console.log(structuredTypes.map(key => structuredData[key]))
  return structuredTypes.map(key => structuredData[key])
}
