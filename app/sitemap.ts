import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://autoecole-mortier.vercel.app'
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/formations`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tarifs`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/offres`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pourquoi-nous`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/avis`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/quiz`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/mentions-legales`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/confidentialite`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
