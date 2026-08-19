import type { StoreLink } from './types'

/**
 * Store listings. None are published yet, so no entry carries an `href` and
 * every badge renders as "coming soon". Shipping a store means adding its URL
 * here — no component changes.
 */
export const storeLinks: readonly StoreLink[] = [
  {
    id: 'play',
    eyebrow: 'Get it on',
    name: 'Google Play',
    target: 'SonicRelay Mobile · Android viewer',
  },
  {
    id: 'fdroid',
    eyebrow: 'Get it on',
    name: 'F-Droid',
    target: 'SonicRelay Mobile · Android viewer',
  },
  {
    id: 'microsoft',
    eyebrow: 'Get it from',
    name: 'Microsoft Store',
    target: 'SonicRelay Desktop · Windows publisher',
  },
]

export const downloads = {
  eyebrow: 'Downloads',
  title: 'Apps on the way',
  description:
    'The Windows publisher and the Android viewer are being prepared for their stores. Until they land, the whole stack can be built and self-hosted from the repositories.',
  note: 'No listing is live yet. Watch the repositories to hear when one is.',
} as const
