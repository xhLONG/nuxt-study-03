<template>
  <div>
    <p>profile page</p>
    <p>id:　{{ route.params.id }}</p>
  </div>
</template>

<script setup>
// const { locale } = useI18n()
const route = useRoute()
console.log(route.path, route.params)

useSeoMeta({
  title: `我的精彩网站 - ${route.params.id}`,
  ogTitle: '我的精彩网站',
  description: '这是我的精彩网站，让我为你详细介绍。',
  ogDescription: '这是我的精彩网站，让我为你详细介绍。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
useHead({
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
</script>

<style>

</style>
