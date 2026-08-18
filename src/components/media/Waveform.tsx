import { cn } from '@/lib/cn'

const BAR_HEIGHTS = [30, 62, 44, 88, 56, 100, 48, 76, 36, 68, 52, 92, 40, 72, 34]

interface WaveformProps {
  className?: string
}

/** Decorative level meter. Animation is disabled by the reduced-motion rule. */
export function Waveform({ className }: WaveformProps) {
  return (
    <div className={cn('flex h-16 items-end justify-between gap-1', className)} aria-hidden="true">
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className="w-full animate-pulse rounded-full bg-gradient-to-t from-signal-600 to-relay-400"
          style={{ height: `${height}%`, animationDelay: `${index * 90}ms`, animationDuration: '1.8s' }}
        />
      ))}
    </div>
  )
}
