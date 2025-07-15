<template>
  <div class="index-page page">
    <BaseTitle level="1">index page</BaseTitle>
    <p>{{ $t('base.home') }}</p>
    <img src="@/assets/images/img1.jpg" width="400">
    <BaseImage :src="imgUrl" alt="示例图片" class="img-example" :lazy="false" />
    <BaseImage src="imgUrl" alt="示例图片" class="img-example" width="400"/>
    <BaseImage :src="imgUrl" alt="示例图片" class="img-example" width="400"/>
    <div class="request-demo-wrap">
      <div>{{ findResult }}</div>
      <div>{{ articleList }}</div>
      <button @click="getDouyin">获取抖音数据</button>
      <code>{{ douyinData }}</code>
    </div>
  </div>
</template>

<script setup>
import imgUrl from '@/assets/images/img1.jpg'
const { useServerRequest, useClientRequest } = useRequest();
const runtimeConfig = useRuntimeConfig();
const route = useRoute()


// 服务端渲染时会发起请求，初始化页面数据
const getArticleById = useServerRequest("/api/article/find", {
  method: "post",
  body: {
    id: 2,
  },
});
const getAllArticle = useServerRequest("/api/article/all", {
  transform: (_transform) => _transform.articleList,
});
const [{ data: findResult }, { data: articleList }] = await Promise.all([
  getArticleById,
  getAllArticle,
]);


// 设置tdk
// const { title, description } = pageData.value.yoast_head_json
// const url = `${runtimeConfig.public.domain}${route.path}`
// const pageTdk = { title, description, keywords: '', imgUrl: '', url, datePublished: pageData.value.date, dateModified: pageData.value.modified }
// useSeoMeta({
//   ...useTdk(pageTdk)
// })
// useHead({
//   script: [...useStructuredData({ excludeTypes: ['ContactPage'], pageTdk })],
// })


const douyinData = ref(null);
async function getDouyin() {
  douyinData.value = await useClientRequest("/api/ttdownload/douyin/detail", {
    method: "post",
    body: {

      cookie: "",
      proxy: "",
      source: false,
      detail_id: "7499752760657595702",
    },
    transform: (_transform) => _transform.data.data,
  });
}
</script>

<style lang="scss" scoped>
.index-page {

}
.img-example {
  max-width: 400px;
  height: auto;
}
</style>
