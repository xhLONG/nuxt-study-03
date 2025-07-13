// plugins/ga.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const gaId = config.public.gaId
  const reportedDepths = new Set()

  if (!gaId) return

  // 插入 gtag 脚本
  const script1 = document.createElement('script')
  script1.setAttribute('async', '')
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`
  document.body.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}');
  `
  document.body.appendChild(script2)

  // 监听路由变化事件，自动发送 page_view （ga4已经会自动上报页面曝光）
  // nuxtApp.hook('page:finish', () => {
  //   if (window.gtag) {
  //     window.gtag('event', `${route.name}_Page_Viewed`, {
  //       page_path: window.location.pathname,
  //       page_location: window.location.href,
  //       page_title: document.title,
  //       referrer: document.referrer || 'direct'
  //     })
  //   }
  // })

  // 监听页面浏览到哪个位置
  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    const thresholds = [25, 50, 75, 90, 100]
    thresholds.forEach((threshold) => {
      if (scrollPercent >= threshold && !reportedDepths.has(threshold)) {
        reportedDepths.add(threshold)
        window.gtag?.('event', 'scroll_depth', {
          event_category: 'Scroll',
          event_label: `${threshold}%`,
          value: threshold
        })
      }
    })
  }

  // window.addEventListener('scroll', () => {
  //   requestAnimationFrame(handleScroll)
  // })
})

