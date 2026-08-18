import { site } from './site'
import type { HeroContent } from './types'

export const hero: HeroContent = {
  eyebrow: 'Open-source audio relay',
  title: ['Your PC audio,', 'on your phone.'],
  description:
    'SonicRelay captures Windows system audio, encodes it with Opus and delivers it to a paired phone over WebRTC. The control plane authenticates devices and routes signaling — the audio itself never touches the server.',
  primaryAction: { label: 'Read the protocol', href: site.docs.protocol, external: true },
  secondaryAction: { label: 'View on GitHub', href: site.repositories.api, external: true },
  highlights: ['Peer-to-peer Opus media', 'No accounts, no passwords', 'Deleted well inside 90 days'],
}
