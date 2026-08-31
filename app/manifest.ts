import type { MetadataRoute } from 'next'
import { brand, siteConfig } from '@/lib/brand'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: '/workspaces',
    scope: '/',
    display: 'standalone',
    background_color: brand.surface,
    theme_color: brand.accent,
    categories: ['productivity', 'utilities'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon', sizes: '32x32', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
