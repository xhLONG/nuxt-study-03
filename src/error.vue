<template>
  <div class="error-layout">
    <BaseHeader></BaseHeader>
    <main class="error-page">
      <Clouds404 :error="error" :title="title"></Clouds404>
    </main>
    <BaseFooter></BaseFooter>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})
const title = computed(() => {
  const code = props.error.statusCode
  if (code === 404) return '404 - 页面未找到'
  if (code === 500) return '500 - 服务器错误'
  return `${code || '错误'} - 出错啦`
})
useHead({
  title,
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ],
})


// 只在客户端上报（避免 SSR）
onMounted(() => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'exception', {
      statusCode: props.error.statusCode,
      description: `${props.error.statusCode}: ${props.error.message} at ${window.location.pathname}`,
      fatal: (props.error.statusCode || 500) >= 500
    })
  }
})
</script>

<style scoped lang="scss">
.error-page {
  padding-top: 86px;
  text-align: center;

}


@media (max-width: 768px) {
  .error-page{
    padding-top: 68px;
  }
}
</style>
