<script setup lang="ts">
const history = [
  {
    year: 'May 2024 - Feb 2025',
    role: 'Fullstack Developer',
    company: 'PT. JIC',
    desc: 'Maintenance & Development Web-based ERP System menggunakan Node.js (Backend) dan Vue.js (Frontend). Bertanggung jawab juga atas manajemen Game Server infrastructure.',
    active: true
  },
  {
    year: 'Sep 2022 - Apr 2024',
    role: 'Fullstack Developer',
    company: 'PT. Adya Artha Abadi',
    desc: 'Mengelola legacy system (ERP Epicor) dan sistem saat ini (ERP M.A.S). Membangun Support Web menggunakan Framework CodeIgniter 4 (CI4) dan Inventory System.',
    active: false
  },
  {
    year: 'May 2020 - Present',
    role: 'Freelance & Open Source',
    company: 'Self-Employed',
    desc: 'Awal mula perjalanan code. Membangun Discord Bots (Music, Ticket, Moderation) dengan discord.js. Developing UI/UX untuk FiveM Server (Lua).',
    active: false
  },
  {
    year: '2015 - 2018',
    role: 'Hotel Management',
    company: 'Akademi Pariwisata Bandung',
    desc: 'Background non-tech yang membentuk pola pikir "Service-Oriented". Belajar tentang manajemen proses dan sistem digital marketing F&B.',
    active: false
  }
]
</script>

<template>
  <section class="py-20 relative z-10 border-t border-white/5 bg-black/20">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div class="md:col-span-1">
          <h2 class="text-3xl font-bold text-white mb-4 sticky top-24">
            CAREER <br/>
            <span class="text-primary-400">JOURNEY</span>
          </h2>
          <p class="text-slate-500 mt-4 text-sm">
            From Hospitality to <br/> High-Level Coding.
          </p>
        </div>

        <div class="md:col-span-2 space-y-12 border-l border-white/10 pl-8 relative">
          
          <div v-for="(item, i) in history" :key="i" class="relative group">
            <div 
              class="absolute -left-[39px] top-2 w-5 h-5 rounded-full border-4 border-gray-950 transition-colors duration-300"
              :class="item.active ? 'bg-primary-500 shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'bg-slate-700 group-hover:bg-primary-500'"
            ></div>

            <span class="text-xs font-mono text-primary-400 mb-2 block tracking-widest uppercase">
              {{ item.year }}
            </span>

            <h3 class="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
              {{ item.role }}
            </h3>
            <p class="text-slate-400 font-medium text-sm mb-3">{{ item.company }}</p>

            <p class="text-slate-500 leading-relaxed max-w-lg text-sm">
              {{ item.desc }}
            </p>
          </div>

        </div>
      </div>
    </UContainer>
  </section>
</template>