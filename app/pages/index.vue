<script setup lang="ts">
const adminHost = useRuntimeConfig().public.adminHost
const isAdminHost = useRequestURL().hostname === adminHost
</script>
<template>
  <ClientOnly v-if="isAdminHost"><AdminPanel /><template #fallback><main class="wrap section"><p>Memuat CMS…</p></main></template></ClientOnly>
  <PublicProfile v-else />
</template>
