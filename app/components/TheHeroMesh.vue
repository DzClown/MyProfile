<script setup lang="ts">
import { shallowRef } from 'vue'

// useLoop HANYA BOLEH dipanggil di sini (di dalam Canvas)
const { onBeforeRender } = useLoop()

const sphereRef = shallowRef<any>(null)

onBeforeRender(({ elapsed }) => {
  if (sphereRef.value) {
    sphereRef.value.rotation.y = elapsed * 0.5
    sphereRef.value.rotation.z = elapsed * 0.2
  }
})
</script>

<template>
  <TresMesh ref="sphereRef">
    <TresIcosahedronGeometry :args="[1.8, 0]" />
    <TresMeshStandardMaterial 
      color="#0f172a" 
      wireframe
      :emissive="'#06b6d4'"
      :emissiveIntensity="0.8"
    />
  </TresMesh>
</template>