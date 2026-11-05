import { z } from 'zod';
const text = z.string().max(5000);
const short = z.string().max(180);
const url = z.string().max(2048).refine(value => {
  if (value === '') return true;
  try { const parsed = new URL(value); return ['https:', 'http:', 'mailto:'].includes(parsed.protocol); } catch { return false; }
}, 'URL harus menggunakan HTTPS, HTTP, atau mailto');
const image = z.string().max(2048).refine(value => value === '' || /^\/(images\/[a-zA-Z0-9_.-]+|media\/[a-f0-9-]+\.webp)$/.test(value) || /^https:\/\//.test(value), 'Gunakan URL gambar HTTPS atau path gambar lokal');
const link = z.object({ label: short, url }).strict();
export const contentSchema = z.object({
  site: z.object({ name: short.min(1), eyebrow: short, headline: short.min(1), description: text, email: z.email(), whatsapp: url, logo: image, footer: text, seoTitle: short, seoDescription: text }).strict(),
  sections: z.object({ servicesTitle: short, teamTitle: short, projectsTitle: short, experienceTitle: short, contactTitle: short, contactDescription: text }).strict(),
  services: z.array(z.object({ title: short, description: text }).strict()).max(20),
  members: z.array(z.object({ name: short.min(1), role: short, bio: text, image, skills: z.array(short).max(30), links: z.array(link).max(10), published: z.boolean() }).strict()).max(20),
  projects: z.array(z.object({ title: short.min(1), category: short, description: text, image, tech: z.array(short).max(30), link: url, status: short, mobileLink: url.optional(), mobileLabel: short.optional(), published: z.boolean() }).strict()).max(100),
  technologies: z.array(short).max(60),
  experience: z.array(z.object({ period: short, role: short, organization: short, description: text }).strict()).max(50),
}).strict();
export type Content = z.infer<typeof contentSchema>;
export const saveSchema = z.object({ revision: z.number().int().positive(), content: contentSchema }).strict();
export const loginSchema = z.object({ username: z.string().max(100), password: z.string().min(1).max(256) }).strict();
export const uploadSchema = z.object({ data: z.string().max(7_000_000).regex(/^[A-Za-z0-9+/]+={0,2}$/) }).strict();
