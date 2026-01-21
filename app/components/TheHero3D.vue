<template>
  <TresCanvas clear-color="#02040a" window-size shadows>
    <TresPerspectiveCamera :position="[0, 1, 6]" :fov="50" />
    <TresAmbientLight :intensity="0.5" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="3" color="#06b6d4" cast-shadow />
    <TresPointLight :position="[-5, -2, -5]" :intensity="2" color="#d946ef" />
    
    <OrbitControls :enable-zoom="false" :enable-pan="false" />

    <Suspense>
      <TheHeroMesh />
      
      <template #fallback>
        <TresMesh>
           <TresBoxGeometry />
           <TresMeshBasicMaterial color="cyan" wireframe />
        </TresMesh>
      </template>
    </Suspense>

    <Stars :radius="50" :count="2000" :factor="4" :fade="true" />
  </TresCanvas>
</template>

<script setup lang="ts">
// Jangan lupa import ini jika belum
import { OrbitControls } from '@tresjs/cientos'
</script>