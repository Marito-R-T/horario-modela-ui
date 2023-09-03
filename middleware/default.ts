export default defineNuxtRouteMiddleware(async (to, from, ) => {
  const app = useNuxtApp()
  if(app.$store.token == ""){
    return navigateTo('/auth/login')
  }
})
