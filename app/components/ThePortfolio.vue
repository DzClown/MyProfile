<script setup lang="ts">
interface PortfolioProject {
  title: string
  category: string
  description: string
  image: string
  tech: string[]
  link: string
  status: string
  mobileLink?: string
  mobileLabel?: string
}

const projects: PortfolioProject[] = [
  {
    title: 'ERP Kontraktor',
    category: 'Fullstack Web',
    description: 'Sistem ERP untuk operasional perusahaan kontraktor, inventaris, keuangan, dan HRD, dilengkapi aplikasi mobile karyawan.',
    image: '/images/Coming_Soon.png', // Ganti dengan screenshot aslimu nanti
    tech: ['Nuxt.js', 'Nest.js', 'PostgreSQL', 'Docker'],
    link: 'https://erp-app.bersamabintangbersinar.com/login',
    mobileLink: 'https://erp-pwa.bersamabintangbersinar.com',
    mobileLabel: 'PWA Demo',
    status: 'Live Demo'
  },
  {
    title: 'Inventory Management + POS',
    category: 'Fullstack Web',
    description: 'Sistem pengelolaan inventaris dan penjualan dengan CMS serta aplikasi POS berbasis PWA untuk operasional bisnis fashion.',
    image: '/images/Coming_Soon.png', // Ganti dengan screenshot aslimu nanti
    tech: ['Nuxt.js', 'Nest.js', 'PostgreSQL', 'Docker'],
    link: 'https://app-pos.bersamabintangbersinar.com/login',
    mobileLink: 'https://pwa-pos.bersamabintangbersinar.com',
    mobileLabel: 'POS Demo',
    status: 'Live Demo'
  },
  {
    title: 'ERP ALKES',
    category: 'Fullstack Web',
    description: 'Demo ERP alat kesehatan untuk pengelolaan operasional, inventaris, dan keuangan, dilengkapi akses mobile melalui PWA.',
    image: '/images/Coming_Soon.png',
    tech: ['Nuxt.js', 'Nest.js', 'PostgreSQL', 'Docker'],
    link: 'https://erp-alkes-app.dndtech.my.id/login',
    mobileLink: 'https://erp-alkes-pwa.dndtech.my.id',
    mobileLabel: 'PWA Demo',
    status: 'Live Demo'
  },
  {
    title: 'FiveM Server Development',
    category: 'Game Dev',
    description: 'Custom Framework Qbox dengan fitur Banking System (Renewed), Phone (NPWD), dan script anti-cheat custom.',
    image: '/images/Coming_Soon.png',
    tech: ['Lua', 'React', 'MySQL', 'Digital Ocean'],
    link: 'https://cfx.re/join/93dxpa',
    status: 'Live'
  },
  {
    title: 'Roblox Game Development',
    category: 'Game Dev',
    description: 'Membuat map dengan tema club house, muncak gunung, dan Map hangout bersama teman-teman di Roblox.',
    image: '/images/Coming_Soon.png',
    tech: ['Luau', 'Roblox Studio', 'Blender'],
    link: 'https://www.roblox.com/communities/612582557/SF-STUDIO#!/about',
    status: 'Prototype'
  }
]
</script>

<template>
  <section id="projects" class="py-24 relative z-10">
    <div class="container mx-auto px-6">
      
      <div class="mb-16">
        <h2 class="text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <span class="text-primary-400">#</span> Selected Works
        </h2>
        <p class="text-gray-400 max-w-2xl text-lg">
          Koleksi project terbaik yang pernah saya kerjakan, mulai dari Web App kompleks hingga Game Server Infrastructure.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div 
          v-for="item in projects"
          :key="item.title"
          class="group relative bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:-translate-y-2"
        >
          <div class="aspect-video bg-gray-800 relative overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.title"
              loading="lazy"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            
            <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              <span class="text-xs font-medium text-primary-300">{{ item.category }}</span>
            </div>
          </div>

          <div class="p-6">
            <p class="text-xs font-medium text-primary-300 mb-3">{{ item.status }}</p>
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                {{ item.title }}
              </h3>
            </div>

            <p class="text-gray-400 text-sm mb-6 line-clamp-3">
              {{ item.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-6">
              <span 
                v-for="tech in item.tech" 
                :key="tech"
                class="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700"
              >
                {{ tech }}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-5">
            <a
              :href="item.link" 
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${item.status === 'Live Demo' ? 'Live Demo' : 'View Project'}: ${item.title} (tab baru)`"
              class="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary-400 transition-colors"
            >
              {{ item.status === 'Live Demo' ? 'Live Demo' : 'View Project' }}
              <span class="text-lg">→</span>
            </a>
            <a
              v-if="item.mobileLink"
              :href="item.mobileLink"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`${item.mobileLabel}: ${item.title} (tab baru)`"
              class="inline-flex items-center gap-2 text-sm font-semibold text-primary-300 hover:text-primary-400 transition-colors"
            >
              {{ item.mobileLabel }}
              <span class="text-lg">↗</span>
            </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
