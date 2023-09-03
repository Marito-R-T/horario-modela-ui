import axios from "axios"

export default defineNuxtPlugin(() => {
  let rc = useNuxtApp()
  console.log(rc.$config.public.SERVER_URL);
  let api = axios.create({
    baseURL: rc.$config.public.SERVER_URL,
    headers: {
      common: {
      },
    }
  })

  return {
    provide: {
      axios: api,
    }
  }
});