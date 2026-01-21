<script setup lang="ts">
// Tidak perlu script animasi di sini. 
// Biarkan TheHeroMesh yang mengurusnya.
</script>

<template>
  <TresCanvas clear-color="#02040a" window-size>
    <TresPerspectiveCamera :position="[0, 0, 6]" :fov="45" />
    
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[2, 2, 5]" :intensity="2" color="#06b6d4" />

    <TheHeroMesh />

    <Stars :radius="40" :count="1500" :factor="4" :fade="true" />
  </TresCanvas>
</template>