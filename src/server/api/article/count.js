let count = 0;


export default defineEventHandler(async(event) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(count++)
    }, 2000);
  }
  )

  return {
    count
  }
})
