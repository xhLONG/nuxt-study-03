
// vue2 option api
export const useIndexStore = defineStore('index', {
  state: () => {
    const config = useRuntimeConfig()
    return {
      globalTitle: config.public.globalTitle
    }
  },
  getters: {
  },
  actions: {
  },
})
