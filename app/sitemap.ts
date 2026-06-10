import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

function getLastModified(filePath: string): Date {
  try {
    const fullPath = path.join(process.cwd(), filePath)
    const stats = fs.statSync(fullPath)
    return stats.mtime
  } catch {
    return new Date()
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stawka-godzinowa.pl'

  return [
    {
      url: baseUrl,
      lastModified: getLastModified('app/page.tsx'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kalkulator-stawki`,
      lastModified: getLastModified('app/kalkulator-stawki/page.tsx'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wyliczenie-z-godzin`,
      lastModified: getLastModified('app/wyliczenie-z-godzin/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/brutto-netto`,
      lastModified: getLastModified('app/brutto-netto/page.tsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/karta-godzin`,
      lastModified: getLastModified('app/karta-godzin/page.jsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kalkulator-umowy-zlecenie`,
      lastModified: getLastModified('app/kalkulator-umowy-zlecenie/page.jsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kalkulator-b2b`,
      lastModified: getLastModified('app/kalkulator-b2b/page.jsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kalkulator-inflacji`,
      lastModified: getLastModified('app/kalkulator-inflacji/page.jsx'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/polityka-prywatnosci`,
      lastModified: getLastModified('app/polityka-prywatnosci/page.tsx'),
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ]
}