<script setup lang="ts">
const props = defineProps<{ modelValue: any; path?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: any] }>()
const labels: Record<string, string> = { site: 'Identitas & SEO', sections: 'Judul bagian', services: 'Layanan', members: 'Anggota tim', projects: 'Portfolio', technologies: 'Teknologi', experience: 'Pengalaman Alvin', name: 'Nama', eyebrow: 'Label pembuka', headline: 'Headline', description: 'Deskripsi', email: 'Email', whatsapp: 'Link WhatsApp', logo: 'Logo / favicon', footer: 'Teks footer', seoTitle: 'Judul SEO', seoDescription: 'Deskripsi SEO', title: 'Judul', role: 'Peran', bio: 'Profil singkat', image: 'Gambar', skills: 'Keahlian', links: 'Tautan', label: 'Label', url: 'URL', published: 'Tampilkan di website', category: 'Kategori', tech: 'Teknologi project', link: 'Link utama', status: 'Status', mobileLink: 'Link PWA / POS', mobileLabel: 'Label PWA / POS', period: 'Periode', organization: 'Organisasi', servicesTitle: 'Judul layanan', teamTitle: 'Judul tim', projectsTitle: 'Judul portfolio', experienceTitle: 'Judul pengalaman', contactTitle: 'Judul kontak', contactDescription: 'Deskripsi kontak' }
const templates: Record<string, any> = {
  services: { title: '', description: '' }, members: { name: 'Anggota baru', role: '', bio: '', image: '', skills: [], links: [], published: false },
  projects: { title: 'Project baru', category: '', description: '', image: '', tech: [], link: '', status: 'Draft', mobileLink: '', mobileLabel: 'PWA Demo', published: false },
  links: { label: '', url: '' }, experience: { period: '', role: '', organization: '', description: '' },
}
const field = computed(() => props.path?.split('.').pop() || '')
const update = (key: string | number, value: any) => { const next = structuredClone(toRaw(props.modelValue)); next[key] = value; emit('update:modelValue', next) }
const add = () => emit('update:modelValue', [...props.modelValue, structuredClone(templates[field.value] ?? '')])
const remove = (index: number) => { if (confirm('Hapus item ini dari draft editor? Perubahan berlaku setelah disimpan.')) emit('update:modelValue', props.modelValue.filter((_: any, i: number) => i !== index)) }
const move = (index: number, offset: number) => { const next = [...props.modelValue]; [next[index], next[index + offset]] = [next[index + offset], next[index]]; emit('update:modelValue', next) }
</script>
<template>
  <div v-if="Array.isArray(modelValue)" class="editor-array">
    <div v-for="(item, index) in modelValue" :key="index" class="editor-item"><div class="editor-item-bar"><strong>{{ typeof item === 'object' ? item.name || item.title || item.role || `Item ${index + 1}` : `Item ${index + 1}` }}</strong><div><button type="button" :disabled="index === 0" aria-label="Pindah ke atas" @click="move(index, -1)">↑</button><button type="button" :disabled="index === modelValue.length - 1" aria-label="Pindah ke bawah" @click="move(index, 1)">↓</button><button type="button" @click="remove(index)">Hapus</button></div></div><ContentFields :model-value="item" :path="`${path}.${index}`" @update:model-value="update(index, $event)" /></div>
    <button type="button" class="button secondary" @click="add">+ Tambah item</button>
  </div>
  <div v-else-if="modelValue !== null && typeof modelValue === 'object'" class="editor-object"><div v-for="(value, key) in modelValue" :key="key" class="editor-field"><span>{{ labels[String(key)] || key }}</span><ContentFields :model-value="value" :path="path ? `${path}.${String(key)}` : String(key)" @update:model-value="update(String(key), $event)" /></div></div>
  <label v-else-if="typeof modelValue === 'boolean'" class="checkbox-label"><input type="checkbox" :checked="modelValue" @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)">{{ modelValue ? 'Dipublikasikan' : 'Draft — tidak terlihat di website' }}</label>
  <textarea v-else-if="['description', 'bio', 'footer', 'seoDescription', 'contactDescription'].includes(field)" :aria-label="labels[field] || field" :value="modelValue" rows="4" @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
  <input v-else :aria-label="labels[field] || field || 'Nilai'" :value="modelValue" type="text" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
</template>
