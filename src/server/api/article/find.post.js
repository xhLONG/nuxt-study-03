import data from './articleList.json'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log('-----------> body', body)
  const { articleList } = data
  return articleList.find(item => item.id === body.id) || {}
})
