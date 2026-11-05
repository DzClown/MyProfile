<script setup lang="ts">
defineProps<{ modelValue: string; label: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const uploadImage = inject<(file: File) => Promise<string>>('uploadImage')
const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false), error = ref(''), uploaded = ref(false)
async function selectImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !uploadImage) return
  uploading.value = true
  error.value = ''
  uploaded.value = false
  try {
    const url = await uploadImage(file)
    emit('update:modelValue', url)
    uploaded.value = true
  } catch (cause) { error.value = cause instanceof Error ? cause.message : 'Upload gambar gagal. Silakan coba lagi.' }
  finally { uploading.value = false; input.value = '' }
}
</script>
<template>
  <div class="image-upload-field" :aria-busy="uploading">
    <img v-if="modelValue && !modelValue.includes('Coming_Soon')" :src="modelValue" :alt="`Preview ${label.toLowerCase()}`" class="image-field-preview">
    <input ref="fileInput" type="file" accept="image/png,image/jpeg,image/webp" hidden :aria-label="`File ${label.toLowerCase()}`" @change="selectImage">
    <button type="button" class="button secondary" :disabled="uploading || !uploadImage" :aria-label="`Upload ${label.toLowerCase()} ke fivemanage-lite`" @click="fileInput?.click()">{{ uploading ? 'Mengunggah…' : 'Upload gambar' }}</button>
    <p class="image-field-help">Tersimpan di fivemanage-lite. PNG, JPG, atau WebP · maksimal 5 MB.</p>
    <input :aria-label="`URL ${label.toLowerCase()}`" :value="modelValue" type="text" placeholder="URL otomatis terisi setelah upload" :disabled="uploading" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value); uploaded = false">
    <p v-if="uploaded" role="status" class="image-field-success">Gambar berhasil diunggah. Klik Simpan perubahan untuk menerapkannya di website.</p>
    <p v-if="error" role="alert" class="image-field-error">{{ error }}</p>
  </div>
</template>
