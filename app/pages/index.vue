<script setup lang="ts">
import type { Content } from '../../shared/content'
const { data: content, error } = await useFetch<Content>('/api/content')
useSeoMeta({ title: () => content.value?.site.seoTitle || 'DND Tech', description: () => content.value?.site.seoDescription || '', ogTitle: () => content.value?.site.seoTitle, ogDescription: () => content.value?.site.seoDescription })
useHead(() => ({ link: [{ rel: 'icon', type: 'image/webp', href: content.value?.site.logo || '/images/dnd_tech.webp' }] }))
const year = new Date().getFullYear()
</script>

<template>
  <div v-if="content" class="site-shell">
    <header class="site-nav wrap">
      <a class="brand" href="#home"><img :src="content.site.logo" alt="" width="42" height="42"><span>{{ content.site.name }}</span></a>
      <nav aria-label="Navigasi utama"><a href="#services">Layanan</a><a href="#work">Portfolio</a><a href="#team">Tim</a></nav>
      <a class="nav-contact" href="#contact">Diskusi project <span aria-hidden="true">↗</span></a>
    </header>
    <main id="home">
      <section class="hero wrap">
        <div class="hero-copy"><p class="eyebrow"><span class="status-dot" />{{ content.site.eyebrow }}</p>
          <h1>{{ content.site.headline }}</h1><p class="lead">{{ content.site.description }}</p>
          <div class="actions"><a class="button primary" href="#work">Jelajahi karya <span aria-hidden="true">↗</span></a><a class="text-link" href="#team">Kenali tim kami <span aria-hidden="true">→</span></a></div>
          <div class="hero-note"><span>WEB APPLICATIONS</span><span>BUSINESS SYSTEMS</span><span>GAME DEVELOPMENT</span></div>
        </div>
        <div class="brand-panel" aria-label="DND Tech — development studio"><div class="panel-top"><span>DESIGN · DEVELOP · DELIVER</span><span class="status-dot" /></div><img :src="content.site.logo" :alt="content.site.name" width="280" height="280"><div class="panel-bottom"><span>BUILT WITH PURPOSE.</span><span>01 / DND</span></div></div>
      </section>
      <div class="tech-strip"><div class="wrap"><span class="eyebrow">OUR TOOLKIT</span><ul><li v-for="tech in content.technologies" :key="tech">{{ tech }}</li></ul></div></div>
      <section id="services" class="section wrap"><div class="section-heading"><p class="eyebrow">01 / WHAT WE DO</p><h2>{{ content.sections.servicesTitle }}</h2></div>
        <div class="service-grid"><article v-for="(service, index) in content.services" :key="index"><span class="service-number">0{{ index + 1 }}</span><h3>{{ service.title }}</h3><p>{{ service.description }}</p></article></div>
      </section>
      <section id="work" class="section work-section"><div class="wrap"><div class="section-heading"><p class="eyebrow">02 / SELECTED WORK</p><h2>{{ content.sections.projectsTitle }}</h2></div>
        <div class="project-grid"><article v-for="(project, index) in content.projects" :key="index" class="project-card">
          <div class="project-image"><img v-if="project.image && !project.image.includes('Coming_Soon')" :src="project.image" :alt="project.title" loading="lazy"><div v-else class="project-cover"><span class="cover-index">PROJECT / 0{{ index + 1 }}</span><strong>{{ project.title }}</strong><span>DND TECH — SELECTED WORK</span></div><span class="category">{{ project.category }}</span></div>
          <div class="project-body"><p class="project-status">{{ project.status }}</p><h3>{{ project.title }}</h3><p>{{ project.description }}</p><ul class="tags"><li v-for="tech in project.tech" :key="tech">{{ tech }}</li></ul><div class="project-links"><a :href="project.link" target="_blank" rel="noopener noreferrer" :aria-label="`${project.title} — ${project.mobileLink ? 'Live Demo' : 'Lihat project'} (tab baru)`">{{ project.mobileLink ? 'Live Demo' : 'Lihat project' }} ↗</a><a v-if="project.mobileLink" :href="project.mobileLink" target="_blank" rel="noopener noreferrer" :aria-label="`${project.title} — ${project.mobileLabel} (tab baru)`">{{ project.mobileLabel }} ↗</a></div></div>
        </article></div>
      </div></section>
      <section id="team" class="section wrap"><div class="section-heading"><p class="eyebrow">03 / THE PEOPLE</p><h2>{{ content.sections.teamTitle }}</h2></div>
        <div v-if="content.members.length" class="team-grid"><article v-for="(member, index) in content.members" :key="index" class="member-card"><img v-if="member.image" :src="member.image" :alt="member.name" loading="lazy"><div v-else class="member-initial">{{ member.name.charAt(0) }}</div><p class="eyebrow">{{ member.role }}</p><h3>{{ member.name }}</h3><p>{{ member.bio }}</p><ul class="tags"><li v-for="skill in member.skills" :key="skill">{{ skill }}</li></ul><div class="project-links"><a v-for="link in member.links" :key="link.url" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.label }} ↗</a></div></article></div>
        <div v-else class="team-placeholder"><span class="eyebrow">DND TECH / TEAM</span><p>Kenali lebih dekat tim kami. Profil anggota segera hadir.</p></div>
        <div v-if="content.experience.length" class="experience"><h3>{{ content.sections.experienceTitle }}</h3><article v-for="(item, index) in content.experience" :key="index"><span>{{ item.period }}</span><div><h4>{{ item.role }}</h4><strong>{{ item.organization }}</strong><p>{{ item.description }}</p></div></article></div>
      </section>
      <section id="contact" class="section contact-section wrap"><p class="eyebrow">LET’S TALK</p><h2>{{ content.sections.contactTitle }}</h2><p class="lead">{{ content.sections.contactDescription }}</p><div class="actions"><a v-if="content.site.whatsapp" class="button primary" :href="content.site.whatsapp" target="_blank" rel="noopener noreferrer">Hubungi kami ↗</a><a class="text-link" :href="`mailto:${content.site.email}`">{{ content.site.email }} ↗</a></div></section>
    </main>
    <footer class="site-footer wrap"><span>© {{ year }} {{ content.site.name }}</span><span>{{ content.site.footer }}</span><a href="#home">Kembali ke atas ↑</a></footer>
  </div>
  <main v-else class="wrap section"><h1>DND Tech</h1><p role="alert">{{ error ? 'Konten belum dapat dimuat. Silakan coba kembali.' : 'Memuat profil…' }}</p><button class="button" @click="refreshNuxtData()">Coba lagi</button></main>
</template>
