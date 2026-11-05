export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') || ''
  if (!/^[a-zA-Z0-9/_-]+$/.test(path)) throw createError({ statusCode: 400 })
  return proxyRequest(event, `${useRuntimeConfig(event).apiInternal}/api/${path}`)
})
