import type { Step } from './types.ts'

export const steps: readonly Step[] = [
  {
    id: 'pair',
    index: 1,
    title: 'Pair the devices',
    description:
      'The Windows publisher issues a short-lived pairing challenge as a code and QR payload. The phone redeems it once and the two devices hold a durable, revocable pairing.',
    endpoint: 'POST /api/pairings/challenges',
  },
  {
    id: 'join',
    index: 2,
    title: 'Join with a code',
    description:
      'The publisher opens a session and shares a rotating join code. Joining needs both an active pairing and the current code — a missing pairing looks exactly like a wrong code.',
    endpoint: 'POST /api/sessions/join',
  },
  {
    id: 'playback',
    index: 3,
    title: 'Stream the audio',
    description:
      'Both peers exchange SDP and ICE over an authenticated WebSocket, then send Opus straight to each other. coturn relays only when NAT traversal leaves no other route.',
    endpoint: 'WS /ws/signaling',
  },
  {
    id: 'monitor',
    index: 4,
    title: 'Watch the link',
    description:
      'Clients post WebRTC statistics back to the API, which exposes Prometheus metrics and structured signaling logs behind a Grafana dashboard with alerts.',
    endpoint: 'POST /api/webrtc/stats',
  },
]
