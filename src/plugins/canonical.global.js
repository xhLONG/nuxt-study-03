// plugins/canonical.global.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:rendered', () => {
    const route = useRoute()
    const config = useRuntimeConfig()
    const domain = config.public.domain

    useHead({
      link: [
        {
          rel: 'canonical',
          href: `${domain}${route.fullPath}`
        }
      ],
      meta: [
        {
          property: 'og:type',
          content: route.path.startsWith('/news/') ? 'article' : 'website'
        },
        {
          property: 'og:url',
          content: `${domain}${route.fullPath}`
        }
      ]
    })
  })
})
