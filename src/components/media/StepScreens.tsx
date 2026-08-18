import type { StepScreen } from '@/content/types'
import { DeviceFrame } from './DeviceFrame'
import { Waveform } from './Waveform'

const Row = ({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'good' }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-ink-850 py-2 last:border-b-0">
    <span className="text-[0.7rem] uppercase tracking-wider text-ink-700">{label}</span>
    <span className={`font-mono text-xs ${tone === 'good' ? 'text-emerald-signal' : 'text-ink-300'}`}>{value}</span>
  </div>
)

function PairScreen() {
  return (
    <DeviceFrame variant="desktop" label="Windows publisher showing a pairing code and QR payload">
      <p className="text-[0.7rem] uppercase tracking-wider text-ink-700">Pairing challenge</p>
      <div className="mt-3 flex items-center gap-4">
        <div className="grid h-20 w-20 shrink-0 grid-cols-5 gap-0.5 rounded-lg bg-ink-100 p-1.5">
          {Array.from({ length: 25 }, (_, index) => (
            <span key={index} className={index % 3 === 0 || index % 7 === 0 ? 'bg-ink-950' : 'bg-transparent'} />
          ))}
        </div>
        <div className="min-w-0">
          <p className="font-mono text-xl tracking-[0.3em] text-ink-100">7QK4-2M</p>
          <p className="mt-1 text-xs text-ink-700">Expires in 04:58</p>
        </div>
      </div>
    </DeviceFrame>
  )
}

function JoinScreen() {
  return (
    <DeviceFrame variant="phone" label="Mobile viewer entering a session join code">
      <p className="text-[0.7rem] uppercase tracking-wider text-ink-700">Join session</p>
      <div className="mt-3 flex gap-1.5">
        {['H', '2', 'V', 'X', '9', 'B'].map((character, index) => (
          <span
            key={index}
            className="flex h-9 flex-1 items-center justify-center rounded-md border border-ink-800 bg-ink-950 font-mono text-sm text-ink-100"
          >
            {character}
          </span>
        ))}
      </div>
      <div className="mt-3 rounded-md bg-signal-500 py-2 text-center text-xs font-semibold text-ink-950">Join</div>
      <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-700">Paired with DESKTOP-KX9 · pairing active</p>
    </DeviceFrame>
  )
}

function PlaybackScreen() {
  return (
    <DeviceFrame variant="phone" label="Mobile viewer playing the incoming audio stream">
      <div className="flex items-center justify-between">
        <p className="text-[0.7rem] uppercase tracking-wider text-ink-700">Now playing</p>
        <span className="flex items-center gap-1.5 text-[0.7rem] text-emerald-signal">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-signal" />
          Live
        </span>
      </div>
      <p className="mt-2 truncate text-sm font-medium text-ink-100">DESKTOP-KX9 output</p>
      <Waveform className="mt-4" />
      <div className="mt-4">
        <Row label="Codec" value="Opus 48 kHz" />
        <Row label="Path" value="P2P (host)" tone="good" />
      </div>
    </DeviceFrame>
  )
}

function MonitorScreen() {
  return (
    <DeviceFrame variant="desktop" label="Grafana dashboard showing WebRTC link statistics">
      <p className="text-[0.7rem] uppercase tracking-wider text-ink-700">Link statistics</p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { label: 'RTT', value: '18 ms' },
          { label: 'Jitter', value: '4 ms' },
          { label: 'Loss', value: '0.0%' },
        ].map((metric) => (
          <div key={metric.label} className="rounded-lg border border-ink-850 bg-ink-950/60 px-3 py-2">
            <p className="text-[0.65rem] uppercase tracking-wider text-ink-700">{metric.label}</p>
            <p className="mt-1 font-mono text-sm text-ink-100">{metric.value}</p>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 200 44" className="mt-4 h-14 w-full" aria-hidden="true" preserveAspectRatio="none">
        <polyline
          points="0,32 20,28 40,34 60,22 80,26 100,16 120,20 140,12 160,18 180,10 200,14"
          fill="none"
          stroke="var(--color-signal-500)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </DeviceFrame>
  )
}

/** Screen registry: a new step renders by adding one entry here. */
const screens: Record<StepScreen, () => React.JSX.Element> = {
  pair: PairScreen,
  join: JoinScreen,
  playback: PlaybackScreen,
  monitor: MonitorScreen,
}

export function StepScreenPreview({ screen }: { screen: StepScreen }) {
  const Screen = screens[screen]
  return <Screen />
}
