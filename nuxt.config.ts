export default defineNuxtConfig({
  compatibilityDate: '2026-11-05',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  nitro: { preset: 'node-server' },
  runtimeConfig: { apiInternal: process.env.API_INTERNAL_URL || 'http://127.0.0.1:3101' },
  app: { head: { htmlAttrs: { lang: 'id' }, link: [{ rel: 'icon', type: 'image/webp', href: '/images/dnd_tech.webp' }] } },
  routeRules: { '/admin': { ssr: false }, '/api/**': { cache: false } },
})
