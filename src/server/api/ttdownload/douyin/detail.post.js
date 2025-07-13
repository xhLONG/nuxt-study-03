// api/ttdownload/douyin/detail
// post
// {
//   "cookie": "",
//   "proxy": "",
//   "source": false,
//   "detail_id": "7499752760657595702"
// }


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.ttApiBase
  const body = await readBody(event)
  const result = await serverRequest('/douyin/detail', {
    method: 'POST',
    body,
    baseURL
  })
  return result
})


