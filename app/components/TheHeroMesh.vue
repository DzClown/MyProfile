<script setup lang="ts">
import { shallowRef } from 'vue'
import { useLoop } from '@tresjs/core'
import { GLTFModel } from '@tresjs/cientos'

// Kita pakai shallowRef untuk performa lebih baik di 3D
const dragonGroupRef = shallowRef(null)
const { onBeforeRender } = useLoop()

onBeforeRender(({ elapsed }) => {
  if (dragonGroupRef.value) {
    // 1. ROTASI ANIMASI (HAPUS/KOMEN BARIS INI)
    // dragonGroupRef.value.rotation.y = elapsed * 0.5 

    // GANTI DENGAN ROTASI MANUAL (Biar pas menghadap kamera)
    // Coba ganti angkanya: 
    // 0 = Depan, 0.5 = Serong Kiri, -0.5 = Serong Kanan, 3.14 = Belakang
    dragonGroupRef.value.rotation.y = -2.1

    // 2. MELAYANG (Biarkan ini tetap ada biar tidak kaku seperti patung)
    dragonGroupRef.value.position.y = 0 + Math.sin(elapsed * 0) * 0.1

    // 3. BERNAFAS (Biarkan juga)
    const breathIntensity = Math.sin(elapsed * 0.5) * 0.05
    dragonGroupRef.value.scale.set(
      2.5 + breathIntensity, 
      2.5 + breathIntensity, 
      2.5 + breathIntensity
    )
  }
})
</script>

<template>
  <TresGroup ref="dragonGroupRef" :position="[2, -2, 0]">
    <GLTFModel
      path="/models/dragonoid.glb"
      :scale="[1.5, 1.5, 1.5]"
      draco
    />
  </TresGroup>
</template>