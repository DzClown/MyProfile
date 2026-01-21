<script setup lang="ts">
const stacks = [
  { name: 'Node.js', icon: 'i-logos-nodejs-icon' },
  { name: 'Nest.js', icon: 'i-logos-nestjs' },
  { name: 'Vue.js', icon: 'i-logos-vue' },
  { name: 'Nuxt', icon: 'i-logos-nuxt-icon' },
  { name: 'Docker', icon: 'i-logos-docker-icon' },
  { name: 'PostgreSQL', icon: 'i-logos-postgresql' },
  { name: 'Redis', icon: 'i-logos-redis' },
  { name: 'Lua', icon: 'i-logos-lua' },
  { name: 'Linux', icon: 'i-logos-linux-tux' },
  { name: 'DigitalOcean', icon: 'i-logos-digital-ocean-icon' },
  { name: 'TypeScript', icon: 'i-logos-typescript-icon' },
  { name: 'Tailwind', icon: 'i-logos-tailwindcss-icon' },
]
</script>

<template>
  <section class="py-10 border-y border-white/5 bg-black/30 backdrop-blur-sm relative z-10 overflow-hidden">
    <div class="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-20"></div>
    <div class="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-20"></div>

    <div class="flex overflow-hidden group">
      <div class="flex animate-marquee gap-12 min-w-full px-6">
        <div 
          v-for="(tech, i) in stacks" 
          :key="i"
          class="flex items-center gap-3 text-slate-400 font-mono font-bold text-lg whitespace-nowrap"
        >
          <UIcon :name="tech.icon" class="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300" />
          <span>{{ tech.name }}</span>
        </div>
      </div>

      <div class="flex animate-marquee gap-12 min-w-full px-6" aria-hidden="true">
        <div 
          v-for="(tech, i) in stacks" 
          :key="i + 'dup'"
          class="flex items-center gap-3 text-slate-400 font-mono font-bold text-lg whitespace-nowrap"
        >
          <UIcon :name="tech.icon" class="w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-300" />
          <span>{{ tech.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
</style>