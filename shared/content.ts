export interface Link { label: string; url: string }
export interface Member { name: string; role: string; bio: string; image: string; skills: string[]; links: Link[]; published: boolean }
export interface Project { title: string; category: string; description: string; image: string; tech: string[]; link: string; status: string; mobileLink?: string; mobileLabel?: string; published: boolean }
export interface Content {
  site: { name: string; eyebrow: string; headline: string; description: string; email: string; whatsapp: string; logo: string; footer: string; seoTitle: string; seoDescription: string }
  sections: { servicesTitle: string; teamTitle: string; projectsTitle: string; experienceTitle: string; contactTitle: string; contactDescription: string }
  services: { title: string; description: string }[]
  members: Member[]; projects: Project[]; technologies: string[]
  experience: { period: string; role: string; organization: string; description: string }[]
}
