export default defineNuxtPlugin(() => {
  return {
    provide: {
      sayHi: (msg) => `hi ${msg}!`
    }
  }
})
