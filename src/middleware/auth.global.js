export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(to)
  const isLoggedIn = true

  if (!isLoggedIn && to.path !== '/') {
    return navigateTo('/')
  }
})
