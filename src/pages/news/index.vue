<template>
  <div class="news-page page">
    <BaseTitle level="1">news page</BaseTitle>
    <BaseBreadcrumb :items="breadcrumbList"></BaseBreadcrumb>
    <BaseModuleSection title="文章列表1" :titleLevel="2">
      <ul class="news-list">
        <li v-for="item in articleList" :key="item.id">
          <NuxtLink :to="newsHref(item)">{{ item.title.rendered }}</NuxtLink>
        </li>
      </ul>
    </BaseModuleSection>
    <BaseModuleSection title="文章列表2" :titleLevel="2">
      <ul class="news-list">
        <li v-for="item in articleList" :key="item.id">
          <NuxtLink :to="newsHref(item)">{{ item.title.rendered }}</NuxtLink>
        </li>
      </ul>
    </BaseModuleSection>
    <BaseFaq :faqList="faqList"></BaseFaq>
    <div>
      <button @click="getArticleById(1)">获取资讯内容</button>
      <article v-html="article?.content?.rendered"></article>
    </div>
  </div>
</template>

<script setup>
import { decodeString } from '@/utils/tool';
const { trackEvent } = useGa4()
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute()


// 服务端渲染时会发起请求，初始化页面数据
const getArticleList = useServerRequest("/api/wp-cms/wp-json/wp/v2/posts", {
  query: { page: 1 },
  transform: _transform => {
    return _transform.map(news => ({
      ...news,
      slug: decodeString(news.slug)
    }))
  }
})
const getPage = useServerRequest("/api/wp-cms/wp-json/wp/v2/pages/9")
const [{ data: articleList }, { data: pageData }] = await Promise.all([
  getArticleList,
  getPage
]);


// 设置tdk
const { title, description } = pageData.value.yoast_head_json
const url = `${runtimeConfig.public.domain}${route.path}`
const pageTdk = { title, description, keywords: '', imgUrl: '', url, datePublished: pageData.value.date, dateModified: pageData.value.modified }
const breadcrumbList = [{
  name: 'Home',
  url: '/',
}, {
  name: 'News',
  url,
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
  script: [...useStructuredData({ excludeTypes: ['ContactPage'], pageTdk, breadcrumbList, faqList })],
})


const article = ref(null)
async function getArticleById(id) {
  article.value = await useClientRequest(`/api/wp-cms/wp-json/wp/v2/posts/${id}`)
  console.log('----->: ', article.value)

  trackEvent('get_article_content_btn')
}

function newsHref(news) {
  return `/news/${news.slug}-${news.id}`
}
</script>

<style lang="scss" scoped>
.news-list{
  color: $link-color;
}
</style>
