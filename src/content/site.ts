import type { NavLink } from './types'

export const REPOSITORY_OWNER = 'vitorhugo-dotnet'

const repositoryUrl = (name: string) => `https://github.com/${REPOSITORY_OWNER}/${name}`

export const site = {
  name: 'SonicRelay',
  tagline: 'Low-latency audio streaming from your PC to your phone.',
  description:
    'SonicRelay streams your Windows system audio to your phone over WebRTC. The backend only handles identity, pairing and signaling — the sound never passes through it.',
  repositories: {
    api: repositoryUrl('dotnet_SonicRelay'),
    mobile: repositoryUrl('flutter_SonicRelay'),
    desktop: repositoryUrl('windows_SonicRelay'),
    landing: repositoryUrl('react_landpage_SonicRelay'),
  },
  docs: {
    protocol: `${repositoryUrl('dotnet_SonicRelay')}/blob/main/docs/protocol.md`,
    architecture: `${repositoryUrl('dotnet_SonicRelay')}/blob/main/docs/architecture.md`,
    security: `${repositoryUrl('dotnet_SonicRelay')}/blob/main/docs/security.md`,
    retention: `${repositoryUrl('dotnet_SonicRelay')}/blob/main/docs/data-retention.md`,
    deviceIdentity: `${repositoryUrl('dotnet_SonicRelay')}/blob/main/docs/device-identity.md`,
    beginnerGuide: `${repositoryUrl('dotnet_SonicRelay')}/blob/main/docs/beginner-guide.md`,
  },
} as const

export const navigation: readonly NavLink[] = [
  { label: 'Downloads', href: '#downloads' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Security', href: '#security' },
  { label: 'Suite', href: '#suite' },
  { label: 'FAQ', href: '#faq' },
]

export const footerLinks: readonly { readonly title: string; readonly links: readonly NavLink[] }[] = [
  {
    title: 'Project',
    links: [
      { label: 'Backend API', href: site.repositories.api },
      { label: 'Mobile viewer', href: site.repositories.mobile },
      { label: 'Windows publisher', href: site.repositories.desktop },
      { label: 'This landing page', href: site.repositories.landing },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Architecture', href: site.docs.architecture },
      { label: 'Client protocol', href: site.docs.protocol },
      { label: 'Device identity', href: site.docs.deviceIdentity },
      { label: 'Beginner guide (pt-BR)', href: site.docs.beginnerGuide },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Security controls', href: site.docs.security },
      { label: 'Data retention', href: site.docs.retention },
    ],
  },
]
