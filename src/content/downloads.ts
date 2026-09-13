import type { StoreLink } from './types.ts'

/**
 * Store listings. Adding a listing URL here turns its badge into a live link;
 * stores without a URL remain marked as coming soon.
 */
export const storeLinks: readonly StoreLink[] = [
  {
    id: 'play',
    eyebrow: 'Get it on',
    name: 'Google Play',
    target: 'SonicRelay Mobile · Android viewer',
    href: 'https://play.google.com/store/apps/details?id=com.vitorhugo.sonicrelay.sonic_relay&pli=1',
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
    href: 'https://apps.microsoft.com/detail/9pgrn0mzsv71?hl=en-US&gl=BR',
  },
]

export const downloads = {
  eyebrow: 'Downloads',
  title: 'Get SonicRelay',
  description:
    'The SonicRelay Android viewer is available on Google Play, and the Windows publisher is available on Microsoft Store.',
  note: 'Google Play and Microsoft Store are live. Watch the repositories for remaining releases.',
} as const
