import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/brand'
import { prisma } from '@/lib/prisma'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/auth/signup'), changeFrequency: 'monthly', priority: 0.5 },
    { url: absoluteUrl('/auth/signin'), changeFrequency: 'monthly', priority: 0.3 },
  ]

  // Publicly shared pages are the only user content that belongs in the sitemap.
  try {
    const shared = await prisma.page.findMany({
      where: { shareType: 'global', shareToken: { not: null } },
      select: { shareToken: true, updatedAt: true },
      take: 5000,
      orderBy: { updatedAt: 'desc' },
    })

    return [
      ...staticRoutes,
      ...shared.map((page) => ({
        url: absoluteUrl(`/share/${page.shareToken}`),
        lastModified: page.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      })),
    ]
  } catch {
    // The sitemap must still build when the database is unreachable.
    return staticRoutes
  }
}
