export const useGa4 = () => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const gaId = config.public.gaId

  // 封装事件追踪
  const trackEvent = (
    eventName: string,
    properties: object
  ) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        ...properties,
        referrer: document.referrer || 'direct'
      })
    }
  }

  // 封装页面浏览追踪
  const trackPageView = (properties: {path: string, module: string}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', route.name ? `${String(route.name)}_Page_Viewed` : 'Page_Viewed', {
        ...properties,
        page_path: properties.path || window.location.pathname,
        page_location: window.location.href,
        page_title: document.title,
        referrer: document.referrer || 'direct',
      })
    }
  }

  return { trackEvent, trackPageView }
}
