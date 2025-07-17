<template>
  <div class="news-detail-page page">
    <BaseBreadcrumb :items="breadcrumbList"></BaseBreadcrumb>
    <BaseTitle level="1">{{ news.title.rendered }}</BaseTitle>
    <article v-html="news.content.rendered"></article>
    <BaseFaq :title="t('base.faqs')" :faqList="faqList"></BaseFaq>
  </div>
</template>

<script setup>
import { imgHandle } from '@/utils/tool';
import { newsFaq } from '@/page-config/faq';
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute()
const { getNewsUrl, getHomeUrl } = usePageUrl()
const { t, locale } = useI18n()

const id = route.params.slug.slice(route.params.slug.lastIndexOf('-')+1)
console.log('-------->', id)


// 服务端渲染时会发起请求，初始化页面数据
const getNews = useServerRequest(`/api/wp-cms/wp-json/wp/v2/posts/${id}`)
const [{ data: news }] = await Promise.all([
  getNews
]);


// 设置tdk
const title = news.value.title.rendered
const description = news.value.excerpt.rendered.replace(/<\/?[^>]+>/g, '').slice(0, 150)
const imgUrl = imgHandle(news.value.content.rendered)
const url = `${runtimeConfig.public.domain}${route.path}`
const simpleArticle = { title, description, datePublished: news.value.date, dateModified: news.value.modified, url, excerpt: news.value.excerpt.rendered, imgUrl, author: news.value.author }
const pageTdk = { title: title+' | '+runtimeConfig.public.globalTitle, description, keywords: '', imgUrl, url, datePublished: news.value.date, dateModified: news.value.modified }
const breadcrumbList = [{
  name: t('base.home'),
  url: getHomeUrl(),
}, {
  name: t('base.news'),
  url: getNewsUrl(),
}, {
  name: title,
  url
  }]

const faqList = newsFaq[locale.value] || []
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead({
  script: [...useStructuredData({ excludeTypes: ['ContactPage'], article: simpleArticle, pageTdk, faqList, breadcrumbList })],
})


function newsHref(news) {
  return `/news/${news.slug}-${news.id}`
}

onMounted(() => {
  // 接口有缓存，可能与实际情况有出入
  useClientRequest(`/api/wp-cms/wp-json/custom/v1/increment-view`, {
    method: 'post',
    body: {
      id
    }
  })
})
</script>

<style lang="scss" scoped>
h1{
  font-size: 24px;
  line-height: 2;
}
</style>
