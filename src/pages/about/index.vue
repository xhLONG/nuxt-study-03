<template>
  <div class="about-page">
    <BaseTitle level="1">about page</BaseTitle>
    <Counter></Counter>
    <div>{{ articles }}</div>
    <p>----</p>
    <div>{{ counts }}</div>
    <button @click="refreshNuxtData('articleCounter')">reflash counts</button>
    <div class="douyin-wrap">
      <p class="title">{{ douyin.desc }}</p>
      <BaseImage :src="douyin.dynamic_cover" :alt="douyin.desc" />
      <video controls muted :src="douyin.downloads"></video>
      <video controls muted>
        <source :src="douyin.downloads"/>
      </video>
    </div>
  </div>
</template>

<script setup>
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const { $sayHi } = useNuxtApp()
console.log($sayHi('lily'))

const {data: articles, pending} = await useFetch('/api/article/all', {
  transform: (_transform) => {
    return _transform.articleList
  }
})
console.log('----> articles', toRaw(articles.value))

const { data: counts } = useAsyncData('articleCounter', () => $fetch('/api/article/count'))
// 服务端渲染时会发起请求，初始化页面数据
// const getPage = useServerRequest("/api/wp-cms/wp-json/wp/v2/pages/49");
// const [{ data: pageData }] = await Promise.all([
//   getPage
// ]);


// 设置tdk
const {title, description} = {}
const imgUrl = ''
const url = `${runtimeConfig.public.domain}${route.path}`;
const pageTdk = { title, description, keywords: '', imgUrl, url,};
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead({
  htmlAttrs: {
    lang: 'en-US',
  },
  script: [...useStructuredData({ pageTdk })]
})

const {data:　findResult} = await useFetch('/api/article/find', {
  method: 'post',
  body: {
    id: 2
  }
})
console.log('---->　findResult:', toRaw(findResult.value))

const { data: douyin } = await useFetch('/api/ttdownload/douyin/detail', {
  method: 'post',
  body: {
    "cookie": "",
    "proxy": "",
    "source": false,
    "detail_id": "7499752760657595702"
  },
  transform: _transform => _transform.data
})
console.log('---->douyin:', toRaw(douyin.value))

</script>

<style lang="scss" scoped>
.douyin-wrap{
  padding: 10px;
  border: 1px solid $primary-color;
}
</style>
