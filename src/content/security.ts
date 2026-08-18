import type { RetentionRow, SecurityControl } from './types'

export const securityControls: readonly SecurityControl[] = [
  {
    id: 'hashed-credentials',
    title: 'Secrets are never stored',
    description:
      'A device credential is shown exactly once; only its HMAC-SHA-256 digest, keyed by a server-side pepper, reaches the database.',
  },
  {
    id: 'live-revocation',
    title: 'Revocation takes effect immediately',
    description:
      'Every scoped request re-checks the device status and credential version against the database, so rotation and revocation beat the JWT lifetime.',
  },
  {
    id: 'scoped-tokens',
    title: 'Narrow, short-lived scopes',
    description:
      'Tokens carry only the scopes their device type needs — session:create, session:join, signaling:connect, pairing:revoke and peers — and expire in minutes.',
  },
  {
    id: 'indistinguishable-failures',
    title: 'Failures give nothing away',
    description:
      'A wrong code, an expired code and a session you are simply not paired with all return the same response, so probing reveals no session state.',
  },
]

export const retentionRows: readonly RetentionRow[] = [
  { data: 'Device identity', measuredFrom: 'CreatedAt', retention: 'Rotated at 60d, deleted at 82d' },
  { data: 'Device pairing', measuredFrom: 'CreatedAt', retention: 'Hard-deleted at 82d' },
  { data: 'Streaming session', measuredFrom: 'CreatedAt', retention: 'Hard-deleted at 82d' },
  { data: 'Session participant', measuredFrom: 'JoinedAt', retention: '24h after disconnect, 82d absolute' },
  { data: 'Join code', measuredFrom: 'Write time', retention: 'Redis TTL, minutes' },
]
