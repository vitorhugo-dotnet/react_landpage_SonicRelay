import { describe, expect, it } from 'vitest'
import { faqItems } from '../../src/content/faq.ts'
import { DEFAULT_SITE_URL, seo } from '../../src/content/seo.ts'
import {
  absoluteUrl,
  buildHeadTags,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  resolveSiteUrl,
  type SeoContext,
} from '../seo.ts'

const context: SeoContext = {
  siteUrl: 'https://example.com/app/',
  base: '/app/',
  lastModified: '2026-01-31',
}

describe('resolveSiteUrl', () => {
  it('falls back to the published address when SITE_URL is unset', () => {
    expect(resolveSiteUrl({})).toBe(DEFAULT_SITE_URL)
  })

  it('ignores a blank SITE_URL rather than emitting empty canonical tags', () => {
    expect(resolveSiteUrl({ SITE_URL: '   ' })).toBe(DEFAULT_SITE_URL)
  })

  it('adds the trailing slash relative URLs are resolved against', () => {
    expect(resolveSiteUrl({ SITE_URL: 'https://sonicrelay.dev' })).toBe('https://sonicrelay.dev/')
    expect(resolveSiteUrl({ SITE_URL: 'https://example.com/app/' })).toBe('https://example.com/app/')
  })
})

describe('absoluteUrl', () => {
  it('keeps the deployed sub-path when resolving an asset', () => {
    expect(absoluteUrl(context.siteUrl, 'og-cover.png')).toBe('https://example.com/app/og-cover.png')
  })
})

describe('buildRobotsTxt', () => {
  const robots = buildRobotsTxt(context)

  it('lets every well-behaved crawler in', () => {
    expect(robots).toContain('User-agent: *\nAllow: /')
  })

  it('points at the sitemap by absolute URL, as the standard requires', () => {
    expect(robots).toContain('Sitemap: https://example.com/app/sitemap.xml')
  })

  it('blocks the scrapers listed in the content module', () => {
    expect(robots).toContain('User-agent: SemrushBot\nDisallow: /')
  })
})

describe('buildSitemapXml', () => {
  const sitemap = buildSitemapXml(context)

  it('lists the canonical URL once', () => {
    expect(sitemap.match(/<loc>/g)).toHaveLength(1)
    expect(sitemap).toContain('<loc>https://example.com/app/</loc>')
  })

  it('reports the content date rather than the build clock', () => {
    expect(sitemap).toContain('<lastmod>2026-01-31</lastmod>')
  })

  it('opens with the XML declaration crawlers expect', () => {
    expect(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
  })
})

describe('buildStructuredData', () => {
  const graph = JSON.parse(buildStructuredData(context)) as {
    '@graph': { '@type': string; mainEntity?: { name: string }[] }[]
  }

  const entry = (type: string) => graph['@graph'].find((node) => node['@type'] === type)

  it('describes the page as one connected graph', () => {
    for (const type of ['Person', 'WebSite', 'WebPage', 'SoftwareApplication', 'FAQPage']) {
      expect(entry(type), type).toBeDefined()
    }
  })

  it('carries every published question into the FAQ entry', () => {
    expect(entry('FAQPage')?.mainEntity?.map((question) => question.name)).toEqual(
      faqItems.map((item) => item.question),
    )
  })
})

describe('buildHeadTags', () => {
  const head = buildHeadTags(context)

  it('declares a single canonical URL', () => {
    expect(head.match(/rel="canonical"/g)).toHaveLength(1)
    expect(head).toContain('<link rel="canonical" href="https://example.com/app/" />')
  })

  it('gives social crawlers absolute image URLs, which relative ones break', () => {
    expect(head).toContain('property="og:image" content="https://example.com/app/og-cover.png"')
    expect(head).toContain('name="twitter:image" content="https://example.com/app/og-cover.png"')
  })

  it('prefixes icon links with the deployed base path', () => {
    expect(head).toContain('href="/app/favicon.svg"')
    expect(head).toContain('href="/app/apple-touch-icon.png"')
  })

  it('escapes copy so an em dash or a quote cannot break the markup', () => {
    const dangerous = buildHeadTags(context).includes('content=""')
    expect(dangerous).toBe(false)
    expect(head).toContain(`<title>${seo.title.replace(/&/g, '&amp;')}</title>`)
  })

  it('embeds the structured data as JSON-LD', () => {
    expect(head).toContain('<script type="application/ld+json">')
  })
})
