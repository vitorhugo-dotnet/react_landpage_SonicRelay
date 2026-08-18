import { DeviceFrame } from './DeviceFrame'
import { Waveform } from './Waveform'

const Meter = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-ink-850 bg-ink-950/60 px-3 py-2">
    <p className="text-[0.65rem] uppercase tracking-wider text-ink-700">{label}</p>
    <p className="mt-1 font-mono text-xs text-ink-300">{value}</p>
  </div>
)

/**
 * The hero illustration: the publisher capturing, the viewer playing, and the
 * peer-to-peer hop between them. Decorative — every label is duplicated in the
 * surrounding copy.
 */
export function HeroScene() {
  return (
    <div className="relative pb-16 pr-2 sm:pb-20 sm:pr-10">
      <DeviceFrame variant="desktop" label="Windows publisher capturing system audio">
        <div className="flex items-center justify-between">
          <p className="text-[0.7rem] uppercase tracking-wider text-ink-700">Capturing · WASAPI loopback</p>
          <span className="flex items-center gap-1.5 text-[0.7rem] text-emerald-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-signal" />
            On air
          </span>
        </div>

        <Waveform className="mt-4 h-20" />

        {/* Two meters only: the overlapping phone covers the right third. */}
        <div className="mt-4 grid max-w-[62%] grid-cols-2 gap-2.5">
          <Meter label="Codec" value="Opus" />
          <Meter label="Rate" value="48 kHz" />
        </div>
      </DeviceFrame>

      <div className="absolute bottom-0 right-0 w-36 sm:w-44">
        <DeviceFrame variant="phone" label="Paired phone playing the stream">
          <p className="text-[0.65rem] uppercase tracking-wider text-ink-700">Now playing</p>
          <p className="mt-1 truncate text-xs font-medium text-ink-100">DESKTOP-KX9</p>
          <Waveform className="mt-3 h-10" />
          <p className="mt-3 font-mono text-[0.65rem] text-emerald-signal">P2P · 18 ms</p>
        </DeviceFrame>
      </div>

      <span className="absolute bottom-8 left-2 hidden rounded-full border border-ink-800 bg-ink-950/90 px-3 py-1 font-mono text-[0.65rem] text-signal-400 sm:inline-block">
        direct WebRTC — no server hop
      </span>
    </div>
  )
}
