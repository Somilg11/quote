import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/brand'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Private surfaces and machine endpoints should never be indexed.
        disallow: ['/api/', '/workspaces/', '/settings/', '/auth/', '/invites/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  }
}
