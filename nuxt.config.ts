// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: false,
  modules: [
    '@pinia/nuxt'
  ],
  typescript: {
    shim: false
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    serveStatic: true,
  },
  devServerHandlers: [],
  hooks: {
  },
  runtimeConfig: {
    public: {
      SERVER_URL: process.env.SERVER_URL
    }
  }
})


