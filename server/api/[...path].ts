export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') || ''
  if (/^(auth|admin)(\/|$)/i.test(path) && getRequestURL(event).hostname !== useRuntimeConfig(event).public.adminHost) throw createError({ statusCode: 404 })
  if (!/^[a-zA-Z0-9/_-]+$/.test(path)) throw createError({ statusCode: 400 })
  return proxyRequest(event, `${useRuntimeConfig(event).apiInternal}/api/${path}`)
})
