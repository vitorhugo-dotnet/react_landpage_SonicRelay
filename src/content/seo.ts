import { REPOSITORY_OWNER, site } from './site.ts'

/**
 * Every fact a search engine, a social crawler or an app installer needs about
 * this page. The head tags, robots.txt, sitemap.xml, the JSON-LD blocks and the
 * web app manifest are all derived from here at build time, so a copy change
 * lands in each of them at once.
 */

/**
 * Where the site answers in production. GitHub Pages serves a project site from
 * `https://<owner>.github.io/<repo>/`; the deploy workflow overrides this with
 * the URL Pages reports, so a custom domain needs no code change.
 */
export const DEFAULT_SITE_URL = `https://${REPOSITORY_OWNER}.github.io/react_landpage_SonicRelay/`

export const seo = {
  /**
   * Kept under ~60 characters so Google shows it whole, and leading with the
   * brand because the query people type is usually the product name.
   */
  title: 'SonicRelay — Low-latency PC audio on your phone',
  description:
    'SonicRelay streams Windows system audio to a paired phone over WebRTC. Peer-to-peer Opus media, device identity instead of accounts, and a .NET control plane that never sees a single frame.',
  /**
   * Search engines ignore the keywords meta tag; this list exists to keep the
   * vocabulary the copy should rank for written down in one place.
   */
  subjects: [
    'stream PC audio to phone',
    'Windows system audio streaming',
    'WebRTC audio relay',
    'low-latency Opus streaming',
    'peer-to-peer audio',
    'self-hosted audio streaming',
  ],
  locale: 'en_US',
  language: 'en',
  themeColor: '#0b0f17',
  backgroundColor: '#0b0f17',
  /** Relative to the site root; resolved against the canonical URL. */
  socialImage: {
    path: 'og-cover.png',
    type: 'image/png',
    width: 1200,
    height: 630,
    alt: 'SonicRelay — your PC audio, on your phone.',
  },
  author: {
    name: 'Vitor Hugo',
    url: `https://github.com/${REPOSITORY_OWNER}`,
  },
  application: {
    name: site.name,
    shortName: site.name,
    /** Schema.org category for the SoftwareApplication entry. */
    category: 'MultimediaApplication',
    operatingSystems: ['Windows', 'Android'],
    license: 'https://opensource.org/licenses/MIT',
  },
} as const

/**
 * The page is a single document with in-page anchors, so the sitemap has one
 * entry. Fragments are not separate URLs and must not be listed as such.
 */
export const sitemapRoutes = [{ path: '', changefreq: 'monthly', priority: 1 }] as const

/**
 * Crawlers that ignore robots.txt and exist only to resell scraped content are
 * denied by name; everything else is welcome, including the AI crawlers that
 * drive real referrals.
 */
export const disallowedUserAgents = ['SemrushBot', 'AhrefsBot', 'MJ12bot', 'DotBot'] as const
