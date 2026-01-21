<template>
  <UApp>
    <div class="fixed inset-0 z-0 bg-gray-950">
      <TheHero3D />
    </div>

    <div class="relative z-10 w-full min-h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
      
      <header class="min-h-screen flex flex-col justify-center relative px-6">
        <UContainer>
          <div class="max-w-4xl pt-20">
            <div class="flex flex-wrap gap-3 mb-8 animate-fade-in">
              <UBadge variant="subtle" class="rounded-full px-3 py-1 bg-cyan-950/30 text-cyan-400 border border-cyan-500/20">
                🚀 Fullstack Developer
              </UBadge>
              <UBadge variant="subtle" class="rounded-full px-3 py-1 bg-fuchsia-950/30 text-fuchsia-400 border border-fuchsia-500/20">
                🎮 FiveM & Discord Dev
              </UBadge>
            </div>

            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight uppercase">
              Alvin Yosua <br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Laismana
              </span>
            </h1>

            <p class="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl border-l-4 border-cyan-500 pl-6">
              <b>Self-taught Programmer</b> dengan pengalaman profesional membangun sistem ERP (Node.js/Vue.js/CI4) dan scripting Game Server. 
              Berkomitmen mengubah pengalaman perhotelan menjadi solusi digital yang user-friendly.
            </p>

            <div class="flex gap-4">
              <UButton 
                size="xl" 
                color="primary" 
                variant="solid" 
                class="font-bold px-8"
                @click="scrollToProjects"
              >
                View Works
              </UButton>
              <UButton 
                size="xl" 
                color="white" 
                variant="ghost" 
                to="mailto:alvinyosua@gmail.com"
                icon="i-heroicons-envelope"
              >
                Contact Me
              </UButton>
            </div>
          </div>
        </UContainer>
      </header>

      <TheTechStack />

      <ThePortfolio />

      <TheExperience />

      <TheFooter />
      
      <footer class="py-12 text-center border-t border-white/5 bg-black/40 backdrop-blur-lg">
        <p class="text-slate-500 text-sm">
          &copy; 2026 Alvin Yosua Laismana. Bandung - Tangerang.
        </p>
      </footer>

    </div>
  </UApp>
</template>

<script setup lang="ts">
const scrollToProjects = () => {
  const p = document.getElementById('projects')
  if (p) p.scrollIntoView({ behavior: 'smooth' })
}
</script>