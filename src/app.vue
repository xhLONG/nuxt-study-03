<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale, locales, t } = useI18n()
const runtimeConfig = useRuntimeConfig();
const route = useRoute()

const currentIso = computed(() => {
  const current = locales.value.find(l => l.code === locale.value)
  return current?.iso || locale.value
})
const pageTdk = {
  title: t('meta.title'),
  description: t('meta.description'),
  keywords: '',
  imgUrl: '/logo.png',
  url: `${runtimeConfig.public.domain}${route.path}`,
  datePublished: new Date().toISOString(),
  dateModified: new Date().toISOString()
}

// 设置默认tdk
useSeoMeta({
  ...useTdk(pageTdk)
})
useHead(() => ({
  htmlAttrs: {
    lang: currentIso.value
  },
  meta: [
    {
      name: 'language',
      content: currentIso.value
    }
  ]
}))
</script>
