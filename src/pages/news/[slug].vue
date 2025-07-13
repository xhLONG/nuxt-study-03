<template>
  <div class="news-detail-page page">
    <BaseBreadcrumb :items="breadcrumbList"></BaseBreadcrumb>
    <BaseTitle level="1">{{ news.title.rendered }}</BaseTitle>
    <article v-html="news.content.rendered"></article>
    <BaseFaq :faqList="faqList"></BaseFaq>
  </div>
</template>

<script setup>
import { imgHandle } from '@/utils/tool';
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute()
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
const article = { title, description, datePublished: news.value.date, dateModified: news.value.modified, url, excerpt: news.value.excerpt.rendered, imgUrl, author: news.value.author }
const pageTdk = { title: title+' | '+runtimeConfig.public.globalTitle, description, keywords: '', imgUrl, url, datePublished: news.value.date, dateModified: news.value.modified }
const breadcrumbList = [{
  name: 'Home',
  url: '/',
}, {
  name: 'News',
  url: '/news',
}, {
  name: title,
  url
}]
const faqList = [{
  question: '你们的产品支持哪些国家配送？',
  answer: '我们支持全球配送，目前主要服务地区包括美国、加拿大、英国、澳大利亚和东南亚国家。'
}, {
  question: '如何申请退款？',
  answer: '请在收到商品后的14天内，通过“我的订单”页面申请退款。商品需保持原包装且未使用。'
}]
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead({
  htmlAttrs: {
    lang: 'en-US',
  },
  script: [...useStructuredData({ excludeTypes: ['ContactPage'], article, pageTdk, faqList, breadcrumbList })],
})


function newsHref(news) {
  return `/news/${news.slug}-${news.id}`
}
</script>

<style lang="scss" scoped>
h1{
  font-size: 24px;
  line-height: 2;
}
</style>
