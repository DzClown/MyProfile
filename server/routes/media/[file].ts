export default defineEventHandler(async (event) => {
  const file = getRouterParam(event, 'file') || ''
  if (!/^[a-f0-9-]+\.webp$/.test(file)) throw createError({ statusCode: 404 })
  return proxyRequest(event, `${useRuntimeConfig(event).apiInternal}/media/${file}`)
})
