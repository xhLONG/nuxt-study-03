import data from './articleList.json'

export default defineEventHandler((event) => {
  const { articleList } = data
  return {
    articleList
  }
})
