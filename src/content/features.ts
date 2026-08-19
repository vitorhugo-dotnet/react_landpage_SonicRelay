import type { Feature } from './types.ts'

export const features: readonly Feature[] = [
  {
    id: 'latency',
    icon: 'bolt',
    title: 'Media stays peer-to-peer',
    description:
      'The API never captures, buffers, transcodes or relays audio. Opus frames travel directly between the publisher and the viewer, with coturn only as a NAT fallback.',
  },
  {
    id: 'device-identity',
    icon: 'fingerprint',
    title: 'Devices, not accounts',
    description:
      'There is no email, password or admin role anywhere in the API. Each device bootstraps a high-entropy credential and exchanges it for a short-lived DeviceBearer JWT.',
  },
  {
    id: 'pairing',
    icon: 'link',
    title: 'Explicit, revocable pairing',
    description:
      'A viewer reaches a session only after completing a challenge with that publisher. Revoking the pairing blocks every future join without disturbing live participants.',
  },
  {
    id: 'codes',
    icon: 'key',
    title: 'Rotating join codes',
    description:
      'Codes come from a cryptographic RNG, live in Redis as keyed HMAC digests with an absolute TTL, and can be rotated mid-session by the publisher at any time.',
  },
  {
    id: 'retention',
    icon: 'shield',
    title: 'Retention that expires itself',
    description:
      'Every record is hard-deleted well inside 90 days, measured from collection rather than activity. Device identities rotate to a fresh id before the ceiling.',
  },
  {
    id: 'observability',
    icon: 'activity',
    title: 'Observable end to end',
    description:
      'Prometheus metrics, ingested client WebRTC stats, structured signaling logs and a shipped Grafana dashboard with alerting rules.',
  },
]
