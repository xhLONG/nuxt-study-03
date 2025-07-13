// server/middleware/cache-control.global.js
export default defineEventHandler((event) => {
  if (event.path.startsWith('/api')) {

  } else {
    // 页面缓存，时间单位是秒
    if (event.path === '/') {
      setResponseHeader(event, 'Cache-Control', 'public, max-age=300')
    } else {
      setResponseHeader(event, 'Cache-Control', 'public, max-age=600')
    }
  }
})

