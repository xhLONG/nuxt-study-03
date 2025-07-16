<template>
  <div class="partnership-page page">
    <BaseTitle level="1">partnership page</BaseTitle>
  </div>
</template>

<script setup>
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();


// 服务端渲染时会发起请求，初始化页面数据
// const getPage = useServerRequest("/api/wp-cms/wp-json/wp/v2/pages/58");
// const [{ data: pageData }] = await Promise.all([
//   getPage
// ]);


// 设置tdk
const {title, description} = {}
const imgUrl = ''
const url = `${runtimeConfig.public.domain}${route.path}`;
const pageTdk = { title, description, keywords: '', imgUrl, url, datePublished: '', dateModified: '' };
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead({
  script: [...useStructuredData({ pageTdk })]
})
</script>

<style lang="scss" scoped>
.partnership-page{
  color: link-color;
}
</style>
