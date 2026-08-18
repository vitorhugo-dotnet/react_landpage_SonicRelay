import { site } from './site'
import type { SuiteProject } from './types'

export const suiteProjects: readonly SuiteProject[] = [
  {
    id: 'api',
    name: 'Backend API',
    role: 'Device identity, pairing, sessions, join codes and signaling.',
    stack: '.NET 10 · ASP.NET Core · PostgreSQL · Redis',
    repository: site.repositories.api,
    icon: 'server',
  },
  {
    id: 'desktop',
    name: 'Windows publisher',
    role: 'Captures system audio and publishes it to paired viewers.',
    stack: 'C#/.NET Desktop · WASAPI · WebRTC',
    repository: site.repositories.desktop,
    icon: 'desktop',
  },
  {
    id: 'mobile',
    name: 'Mobile viewer',
    role: 'Joins a session and plays the incoming WebRTC audio.',
    stack: 'Flutter · flutter_webrtc',
    repository: site.repositories.mobile,
    icon: 'phone',
  },
]
