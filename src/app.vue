<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale, locales, t } = useI18n()
const runtimeConfig = useRuntimeConfig();
const route = useRoute()
const routeName = route.name.split('___')[0]

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
const alternateLinksExcludeRoute = ['news-slug']
const alternateLinks = alternateLinksExcludeRoute.includes(routeName) ? [] : [...useAlternateLinks(routeName)]

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
  ],
  link: alternateLinks
}))
</script>
