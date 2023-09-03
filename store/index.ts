import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    token: "",
  }),
  actions: {
    increment() {
      // `this` is the store instance
      this.counter++
    },
    set(token: string) {
      this.token = token;
    }
  },
})