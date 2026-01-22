<script setup lang="ts">
// 1. DATA: Languages & Frameworks
const languages = [
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Nuxt 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Luau (Roblox)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg' }, // Pakai icon Lua
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
]

// 2. DATA: Tools & Infrastructure
const tools = [
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Digital Ocean', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
]
</script>

<template>
  <section class="py-20 bg-[#02040a] border-y border-white/5 relative overflow-hidden">
    
    <div class="container mx-auto px-6 mb-12 text-center">
      <h2 class="text-3xl font-bold text-white mb-4">
        Tech <span class="text-primary-400">Stack</span>
      </h2>
      <p class="text-gray-400">Teknologi dan tools yang saya gunakan sehari-hari.</p>
    </div>

    <div class="mb-12 relative">
      <div class="flex justify-center mb-4">
        <span class="text-xs font-semibold tracking-widest text-primary-500 uppercase bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
          Languages & Frameworks
        </span>
      </div>
      
      <div class="flex overflow-hidden relative fade-mask">
        <div class="flex gap-4 animate-marquee whitespace-nowrap py-2">
          <div 
            v-for="(tech, i) in [...languages, ...languages, ...languages]" 
            :key="i"
            class="flex items-center gap-2 bg-gray-900/80 border border-gray-700/50 px-4 py-2 rounded-lg hover:border-primary-500/50 hover:bg-gray-800 transition-all cursor-default group shrink-0 min-w-max"
          >
            <img :src="tech.icon" :alt="tech.name" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span class="text-gray-300 font-medium font-mono text-sm">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
      <div class="flex justify-center mb-4">
        <span class="text-xs font-semibold tracking-widest text-purple-400 uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          Tools & Infrastructure
        </span>
      </div>

      <div class="flex overflow-hidden relative fade-mask">
        <div class="flex gap-4 animate-marquee-reverse whitespace-nowrap py-2">
           <div 
            v-for="(tool, i) in [...tools, ...tools, ...tools]" 
            :key="i"
            class="flex items-center gap-2 bg-gray-900/80 border border-gray-700/50 px-4 py-2 rounded-lg hover:border-purple-500/50 hover:bg-gray-800 transition-all cursor-default group shrink-0 min-w-max"
          >
            <img :src="tool.icon" :alt="tool.name" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span class="text-gray-300 font-medium font-mono text-sm">{{ tool.name }}</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Masking untuk efek fade di kiri dan kanan layar */
.fade-mask {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* Animasi Jalan ke Kiri */
.animate-marquee {
  animation: marquee 30s linear infinite;
}

/* Animasi Jalan ke Kanan (Reverse) */
.animate-marquee-reverse {
  animation: marquee-reverse 30s linear infinite;
}

/* Pause animasi pas di-hover mouse */
.animate-marquee:hover, 
.animate-marquee-reverse:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>