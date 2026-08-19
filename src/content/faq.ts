import type { FaqItem } from './types.ts'

export const faqItems: readonly FaqItem[] = [
  {
    id: 'audio-path',
    question: 'Does my audio go through the server?',
    answer:
      'No. The API is a control plane: it authenticates devices, stores session state, issues join codes and routes signaling messages. Media flows directly between the two clients, and only falls back to a coturn relay when NAT traversal leaves no direct path.',
  },
  {
    id: 'accounts',
    question: 'Why is there no sign-up?',
    answer:
      'ASP.NET Core Identity was removed once both clients moved to device identity. Each install bootstraps its own credential and trades it for a short-lived DeviceBearer token, so there is no email, password or account to breach.',
  },
  {
    id: 'pairing-vs-code',
    question: 'What stops someone guessing a join code?',
    answer:
      'A join needs two independent things: an active pairing with the publishing device and the current join code. Codes are cryptographically random, stored only as keyed HMAC digests, expire on a TTL and can be rotated mid-session.',
  },
  {
    id: 'data',
    question: 'What data is kept, and for how long?',
    answer:
      'Device identifiers, pairings, sessions and participant rows — no audio, no contact details. Age is measured from collection rather than last activity, deletion is hard with no tombstones, and everything clears well inside 90 days.',
  },
  {
    id: 'self-host',
    question: 'Can I run it myself?',
    answer:
      'Yes. The repository ships a root Dockerfile, development and full-stack Compose definitions with nginx and coturn, EF Core migrations, and a GitHub Actions pipeline that builds, tests and deploys the API over SSH.',
  },
]
