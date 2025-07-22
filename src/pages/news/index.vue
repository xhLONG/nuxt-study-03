<template>
  <div class="news-page page">
    <BaseTitle level="1">news page</BaseTitle>
    <BaseBreadcrumb :items="breadcrumbList"></BaseBreadcrumb>
    <BaseModuleSection title="文章列表1" :titleLevel="2">
      <ul class="news-list">
        <li v-for="item in articleList" :key="item.id">
          <!--  NuxtLinkLocale不支持target="_blank" -->
          <NuxtLinkLocale :to="{ name: 'news-slug', params: { slug: `${item.slug}-${item.id}` } }">{{ item.title.rendered }}</NuxtLinkLocale>
        </li>
      </ul>
    </BaseModuleSection>
    <BaseModuleSection title="文章列表2" :titleLevel="2">
      <ul class="news-list">
        <li v-for="item in articleList" :key="item.id">
          <NuxtLink :to="newsDetailUrl(item)" target="_blank">{{ item.title.rendered }}</NuxtLink>
        </li>
      </ul>
    </BaseModuleSection>
    <BaseModuleSection title="热门文章" :titleLevel="2">
      <ul class="news-list">
        <li v-for="item in hotArticleList" :key="item.id">
          <NuxtLink :to="newsDetailUrl(item)" target="_blank">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </BaseModuleSection>
    <BaseFaq :title="t('base.faqs')" :faqList="faqList"></BaseFaq>
    <div>
      <button @click="getArticleById(1)">获取资讯内容</button>
      <article v-html="article?.content?.rendered"></article>
    </div>
  </div>
</template>

<script setup>
import { decodeString } from '@/utils/tool';
import { newsFaq } from '@/page-config/faq';
const { trackEvent } = useGa4()
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute()
const { newsDetailUrl, indexUrl } = usePageUrl()
const { t, locale } = useI18n()


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
// const getPage = useServerRequest("/api/wp-cms/wp-json/wp/v2/pages/9")
const getHotArticleList = useServerRequest("/api/wp-cms/wp-json/custom/v1/popular-posts")
const [{ data: articleList }, { data: hotArticleList}] = await Promise.all([
  getArticleList,
  getHotArticleList
]);


// 设置tdk
const { title, description } = {}
const url = `${runtimeConfig.public.domain}${route.path}`
const pageTdk = { title, description, keywords: '', imgUrl: '', url, datePublished: '', dateModified: '' }
const breadcrumbList = [{
  name: t('base.home'),
  url: indexUrl(),
}, {
  name: t('base.news'),
  url,
}]

const faqList = newsFaq[locale.value] || []
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead({
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
