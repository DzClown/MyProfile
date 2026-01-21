// nuxt.config.ts
export default defineNuxtConfig({
  // Sesuaikan dengan versi major Nuxt 4 saat ini
  compatibilityDate: '2026-01-21', 

  // Nuxt 4 native: Tidak perlu srcDir: 'app/' jika folder app/ sudah ada.
  // ssr: false wajib untuk GitHub Pages (SPA/Static)
  ssr: false,

  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint', 
    '@nuxt/image', 
    '@nuxt/ui',
    '@tresjs/nuxt' // Tambahan untuk 3D
  ],
  css: ['~/assets/css/main.css'],

  // TresJS config
  tres: {
    glsl: true,
  },

  // App Config untuk GitHub Pages
  
  // Future flags (biasanya enabled default di v4, tapi bagus untuk memastikan)
  future: {
    compatibilityVersion: 4,
  }
})