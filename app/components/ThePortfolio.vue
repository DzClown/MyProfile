<script setup lang="ts">
const projects = [
  {
    title: 'Web-based ERP System',
    category: 'PT. JIC Work',
    desc: 'Pengembangan sistem ERP berbasis web yang terintegrasi. Fokus pada Backend API yang scalable dan Frontend interaktif untuk manajemen data perusahaan.',
    tech: ['Node.js', 'Vue.js', 'REST API', 'Game Server Mgmt'],
    color: 'border-cyan-500/50',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]',
  },
  {
    title: 'Support Web & Inventory',
    category: 'PT. Adya Artha Abadi',
    desc: 'Membangun dashboard support untuk monitoring sistem ERP Epicor & M.A.S. Serta sistem inventaris stok gudang yang presisi.',
    tech: ['CodeIgniter 4', 'PHP', 'MySQL', 'ERP Epicor'],
    color: 'border-orange-500/50',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]',
  },
  {
    title: 'FiveM Server Scripting',
    category: 'Game Development',
    desc: 'Custom UI/UX development menggunakan Lua dan NUI (HTML/CSS/JS) untuk private server GTA V. Optimasi resource server.',
    tech: ['Lua', 'NUI', 'JS', 'HTML/CSS'],
    color: 'border-green-500/50',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]',
  },
  {
    title: 'Discord Community Bots',
    category: 'Automation',
    desc: 'Bot moderasi, sistem tiket support, dan bot musik untuk komunitas. Project awal yang memicu passion di dunia programming.',
    tech: ['Discord.js', 'Node.js', 'API Integration'],
    color: 'border-indigo-500/50',
    glow: 'hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)]',
  }
]
</script>

<template>
  <section class="py-20 px-6 relative z-10" id="projects">
    <UContainer>
      
      <div class="mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          SELECTED <span class="text-primary-400">WORKS</span>
        </h2>
        <p class="text-slate-400 max-w-xl text-lg">
          Project Highlight dari ERP Perusahaan hingga Game Development.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div 
          v-for="(item, index) in projects" 
          :key="index"
          class="group relative bg-gray-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
          :class="[item.color, item.glow, 'hover:border-opacity-100 border-opacity-30']"
        >
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors"></div>

          <div class="relative z-10">
            <div class="flex justify-between items-start mb-4">
               <span class="text-xs font-mono uppercase tracking-widest text-slate-500 border border-slate-700 px-2 py-1 rounded">
                 {{ item.category }}
               </span>
            </div>

            <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
              {{ item.title }}
            </h3>
            <p class="text-slate-400 mb-6 leading-relaxed text-sm">
              {{ item.desc }}
            </p>
            
            <div class="flex flex-wrap gap-2 mt-auto">
              <span 
                v-for="t in item.tech" 
                :key="t"
                class="px-3 py-1 text-xs font-medium rounded-md bg-white/5 border border-white/10 text-slate-300 group-hover:border-primary-500/30 transition-colors"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </div>

    </UContainer>
  </section>
</template>