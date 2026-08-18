import type { ArchitectureNode } from './types'

export const architectureNodes: readonly ArchitectureNode[] = [
  {
    id: 'publisher',
    title: 'Windows publisher',
    subtitle: 'C# / .NET desktop',
    icon: 'desktop',
    items: ['WASAPI loopback capture', 'Opus encoder', 'WebRTC sender'],
  },
  {
    id: 'control-plane',
    title: 'SonicRelay API',
    subtitle: '.NET 10 · PostgreSQL · Redis',
    icon: 'server',
    items: ['Device identity & pairing', 'Sessions and join codes', 'WebSocket signaling'],
  },
  {
    id: 'viewer',
    title: 'Mobile viewer',
    subtitle: 'Flutter · flutter_webrtc',
    icon: 'phone',
    items: ['WebRTC receiver', 'Opus decode', 'Audio playback'],
  },
]

export const architectureNotes: readonly string[] = [
  'Signaling and authentication run over HTTPS and WSS against the API.',
  'Audio never enters the control plane; it flows publisher → viewer directly.',
  'coturn is reached over DNS only and relays media when direct ICE fails.',
]
