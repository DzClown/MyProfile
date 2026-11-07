<script setup lang="ts">
import type { Content } from '../../shared/content'
const { data: content, error } = await useFetch<Content>('/api/content')
const selected = ref(0)
const projects = computed(() => content.value?.projects || [])
const activeProject = computed(() => projects.value[selected.value] || projects.value[0])
const number = (index: number) => String(index + 1).padStart(2, '0')
useSeoMeta({ title: () => content.value?.site.seoTitle || 'DND Tech', description: () => content.value?.site.seoDescription || '', ogTitle: () => content.value?.site.seoTitle, ogDescription: () => content.value?.site.seoDescription })
useHead(() => ({ link: [{ rel: 'icon', type: 'image/webp', href: content.value?.site.logo || '/images/dnd_tech.webp' }] }))
const year = new Date().getFullYear()
</script>

<template>
  <div v-if="content" class="dnd-public">
    <a class="dnd-skip" href="#main">Lewati navigasi</a>
    <header class="dnd-nav dnd-container">
      <a class="dnd-brand" href="#home"><img :src="content.site.logo" alt="" width="38" height="38"><span>{{ content.site.name }}<small>SOFTWARE & DIGITAL SYSTEMS</small></span></a>
      <nav aria-label="Navigasi utama"><a href="#work">Karya <sup>{{ number(projects.length - 1) }}</sup></a><a href="#studio">Studio</a><a href="#contact">Hubungi kami <span aria-hidden="true">↗</span></a></nav>
    </header>
    <main id="main">
      <section id="home" class="dnd-hero dnd-container">
        <div class="dnd-hero-caption"><span>{{ content.site.eyebrow }}</span><span>ENGINEERING / DND TECH</span></div>
        <div class="engineering-hero">
          <div class="engineering-copy">
            <h1>Full-stack <span>engineering.</span></h1>
            <p class="engineering-headline">{{ content.site.headline }}</p>
            <p>{{ content.site.description }}</p>
            <div class="engineering-actions">
              <a href="#work" class="engineering-primary">Lihat karya tim <span aria-hidden="true">↘</span></a>
              <a href="#contact">Hubungi tim <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <figure class="engineering-map">
            <figcaption><span>CAKUPAN ENGINEERING</span><span aria-hidden="true">+</span></figcaption>
            <ol>
              <li><span class="engineering-number">01</span><div><strong>Frontend</strong><span>Nuxt · Vue · TypeScript</span></div></li>
              <li><span class="engineering-number">02</span><div><strong>Backend & data</strong><span>NestJS · PostgreSQL · Redis</span></div></li>
              <li><span class="engineering-number">03</span><div><strong>Infrastructure</strong><span>Docker · deployment</span></div></li>
            </ol>
            <div class="engineering-map-footer">DND TECH / SOFTWARE SYSTEMS</div>
          </figure>
        </div>
        <div class="dnd-hero-rule"><span>ERP / WEB APPLICATIONS / GAME SYSTEMS</span><a href="#work">KARYA TIM ↓</a></div>
      </section>
      <section id="work" class="dnd-work dnd-container">
        <div class="dnd-section-label"><span>01 / PROJECT INDEX</span><span>{{ String(projects.length).padStart(2, '0') }} PROJECTS</span></div>
        <div class="dnd-work-heading"><h2>Karya<span class="dnd-period">.</span></h2><p>{{ content.sections.projectsTitle }}</p></div>
        <div v-if="activeProject" class="dnd-workbench">
          <div class="dnd-project-index" role="group" aria-label="Pilih project untuk melihat detail"><button v-for="(project, index) in projects" :key="project.title" :aria-pressed="activeProject === project" :class="{ selected: activeProject === project }" aria-controls="project-detail" @click="selected = index"><span class="dnd-project-number">{{ number(index) }}</span><span><strong>{{ project.title }}</strong><small>{{ project.category }}</small></span><span class="dnd-index-arrow" aria-hidden="true">↗</span></button></div>
          <article id="project-detail" class="dnd-project-detail" aria-live="polite" aria-atomic="true" :aria-label="activeProject.title">
            <div class="dnd-project-visual" :class="{ 'is-game': activeProject.category === 'Game Dev' }"><img v-if="activeProject.image && !activeProject.image.includes('Coming_Soon')" :src="activeProject.image" :alt="activeProject.title" width="960" height="600" loading="lazy"><div v-else class="dnd-project-poster"><div class="dnd-poster-meta"><span>{{ activeProject.category }}</span><span>DND / {{ number(projects.indexOf(activeProject)) }}</span></div><strong>{{ activeProject.title }}</strong><div class="dnd-poster-bottom"><span v-for="tech in activeProject.tech.slice(0, 3)" :key="tech">{{ tech }}</span></div><svg viewBox="0 0 260 260" aria-hidden="true"><path d="M130 8 236 69v122l-106 61-106-61V69Z M130 60 207 180H53Z M130 8v52 M24 69l106-9 106 9M24 69l29 111 77 72 77-72 29-111M24 191l29-11M207 180l29 11"/></svg></div></div>
            <div class="dnd-project-info"><div class="dnd-project-title"><h3>{{ activeProject.title }}</h3><span>{{ activeProject.status }}</span></div><p>{{ activeProject.description }}</p><ul class="dnd-tech-list"><li v-for="tech in activeProject.tech" :key="tech">{{ tech }}</li></ul><div class="dnd-demo-links"><a v-if="activeProject.link" :href="activeProject.link" target="_blank" rel="noopener noreferrer">{{ activeProject.mobileLink ? 'Buka web demo' : 'Lihat project' }} <span aria-hidden="true">↗</span></a><a v-if="activeProject.mobileLink" :href="activeProject.mobileLink" target="_blank" rel="noopener noreferrer">{{ activeProject.mobileLabel }} <span aria-hidden="true">↗</span></a></div></div>
          </article>
        </div>
        <p v-else class="dnd-empty">Project sedang disiapkan.</p>
      </section>
      <section id="studio" class="dnd-studio"><div class="dnd-container"><div class="dnd-section-label"><span>02 / THE PRACTICE</span><span>{{ content.site.name }}</span></div><div class="dnd-studio-heading"><h2>{{ content.sections.servicesTitle }}</h2><span class="dnd-studio-note">DARI KEBUTUHAN.<br>KE SISTEM YANG BERJALAN.</span></div><div class="dnd-services"><article v-for="(service, index) in content.services" :key="index"><span class="dnd-service-index">{{ number(index) }}</span><h3>{{ service.title }}</h3><p>{{ service.description }}</p><span class="dnd-service-mark" aria-hidden="true">+</span></article></div><div class="dnd-toolkit"><span>TECHNOLOGIES<br>& TOOLS</span><ul><li v-for="tech in content.technologies" :key="tech">{{ tech }}</li></ul></div></div></section>
      <section id="team" class="dnd-team dnd-container"><div class="dnd-section-label"><span>03 / THE PEOPLE</span><span>HUMANS BEHIND THE SYSTEMS</span></div><h2>{{ content.sections.teamTitle }}</h2><div v-if="content.members.length" class="dnd-members"><article v-for="(member, index) in content.members" :key="index"><div class="dnd-member-portrait"><img v-if="member.image" :src="member.image" :alt="member.name" loading="lazy"><span v-else>{{ member.name.charAt(0) }}</span><span class="dnd-member-index">{{ number(index) }}</span></div><div class="dnd-member-bio"><span class="dnd-mono">{{ member.role }}</span><h3>{{ member.name }}</h3><p>{{ member.bio }}</p><ul class="dnd-tech-list"><li v-for="skill in member.skills" :key="skill">{{ skill }}</li></ul><div class="dnd-person-links"><a v-if="member.links.some(link => link.url.replace(/\/$/, '').toLowerCase() === 'https://github.com/dzclown') && !member.links.some(link => link.url.replace(/\/$/, '') === 'https://profile.dndtech.my.id')" href="https://profile.dndtech.my.id/" target="_blank" rel="noopener noreferrer">Profil pribadi ↗</a><a v-for="link in member.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} ↗</a></div></div></article></div><div v-else class="dnd-team-draft"><span class="dnd-cross" aria-hidden="true">+</span><p>Profil anggota tim sedang disiapkan.</p><a href="#contact">Kenalan langsung ↗</a></div></section>
      <section id="contact" class="dnd-contact"><div class="dnd-container"><div class="dnd-section-label"><span>04 / START A CONVERSATION</span><span aria-hidden="true">↗</span></div><div class="dnd-contact-heading"><h2>{{ content.sections.contactTitle }}</h2><p>{{ content.sections.contactDescription }}</p></div><a class="dnd-email" :href="`mailto:${content.site.email}`">{{ content.site.email }} <span aria-hidden="true">↗</span></a><a v-if="content.site.whatsapp" class="dnd-whatsapp" :href="content.site.whatsapp" target="_blank" rel="noopener noreferrer">Mulai percakapan di WhatsApp <span aria-hidden="true">↗</span></a></div></section>
    </main>
    <footer class="dnd-footer dnd-container"><a href="#home" class="dnd-footer-brand">{{ content.site.name }}</a><p>{{ content.site.footer }}</p><span>© {{ year }}</span><a href="#home">Kembali ke atas ↑</a></footer>
  </div>
  <main v-else class="dnd-public dnd-container dnd-error"><h1>DND Tech</h1><p role="alert">{{ error ? 'Konten belum dapat dimuat. Silakan coba kembali.' : 'Memuat profil…' }}</p><button @click="refreshNuxtData()">Coba lagi</button></main>
</template>

<style src="../assets/css/public-profile.css"></style>
