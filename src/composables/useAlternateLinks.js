import { localeLangs } from '@/nuxt-config/i18n.config.js'

export const useAlternateLinks = (routeName) => {
  const urls = usePageUrl()

  return localeLangs.map(lang => ({
    rel: 'alternate',
    hreflang: lang.iso,
    href: urls[`${routeName}Url`] ? urls[`${routeName}Url`](lang.code) : route.path
  })).concat([{
      rel: 'alternate',
      hreflang: 'x-default',
      href: urls[`${routeName}Url`]('en')
    }])
}
