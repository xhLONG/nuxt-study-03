<template>
  <div class="privacy-policy-page page">
    <BaseTitle level="1">privacy-policy page</BaseTitle>
  </div>
</template>

<script setup>
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();


// 服务端渲染时会发起请求，初始化页面数据
// const getPage = useServerRequest("/api/wp-cms/wp-json/wp/v2/pages/54");
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
  htmlAttrs: {
    lang: 'en-US',
  },
  script: [...useStructuredData({ pageTdk })]
})
definePageMeta({
  layout: 'custom'
})
</script>

<style lang="scss" scoped>
.privacy-policy-page{
  color: link-color;
}
</style>
