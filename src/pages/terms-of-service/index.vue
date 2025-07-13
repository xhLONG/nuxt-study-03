<template>
  <div class="terms-of-service-page page">
    <BaseTitle level="1">terms-of-service page</BaseTitle>
  </div>
</template>

<script setup>
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute();


// 服务端渲染时会发起请求，初始化页面数据
const getPage = useServerRequest("/api/wp-cms/wp-json/wp/v2/pages/56");
const [{ data: pageData }] = await Promise.all([
  getPage
]);


// 设置tdk
const {title, description} = pageData.value.yoast_head_json
const imgUrl = ''
const url = `${runtimeConfig.public.domain}${route.path}`;
const pageTdk = { title, description, keywords: '', imgUrl, url, datePublished: pageData.value.date, dateModified: pageData.value.modified };
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead({
  htmlAttrs: {
    lang: 'en-US',
  },
  script: [...useStructuredData({ pageTdk })]
})
</script>

<style lang="scss" scoped>
.terms-of-service-page{
  color: link-color;
}
</style>
