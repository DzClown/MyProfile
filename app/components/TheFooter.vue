<script setup lang="ts">
const socialLinks = [
  { name: 'GitHub', icon: 'i-simple-icons-github', url: 'https://github.com/DzClown' }, // Ganti URL
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: 'https://www.linkedin.com/in/alvinyosua/' }, // Ganti URL
  { name: 'Email', icon: 'i-heroicons-envelope', url: 'mailto:alvinyosua@gmail.com' },
  { name: 'WhatsApp', icon: 'i-simple-icons-whatsapp', url: 'https://wa.me/6285161321196' }
]
</script>

<template>
  <footer class="relative z-10 pt-20 pb-10 bg-gradient-to-t from-black to-gray-900/50 border-t border-white/5">
    <UContainer class="text-center">
      
      <h2 class="text-3xl font-bold text-white mb-6">
        Ready to <span class="text-primary-400">Collaborate?</span>
      </h2>
      <p class="text-slate-400 mb-8 max-w-xl mx-auto">
        Entah itu membangun Backend Node.js yang solid atau menciptakan pengalaman Roleplay Server yang imersif, mari kita diskusikan.
      </p>

      <div class="flex justify-center gap-6 mb-12">
        <UButton
          v-for="link in socialLinks"
          :key="link.name"
          :to="link.url"
          target="_blank"
          color="gray"
          variant="ghost"
          size="xl"
          class="hover:text-primary-400 transition-colors"
          :icon="link.icon"
        />
      </div>

      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
        <p>&copy; 2026 Alvin Yosua Laismana. All rights reserved.</p>
        <p class="mt-2 md:mt-0">
          Built with <span class="text-slate-400">Nuxt 4</span> & <span class="text-slate-400">TresJS</span>
        </p>
      </div>

    </UContainer>
  </footer>
</template>