import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface DeviceFrameProps {
  variant: 'phone' | 'desktop'
  label: string
  className?: string
  children: ReactNode
}

/** Chrome around a mocked screen. Decorative — the label carries the meaning. */
export function DeviceFrame({ variant, label, className, children }: DeviceFrameProps) {
  const isPhone = variant === 'phone'

  return (
    <figure
      className={cn(
        'relative overflow-hidden border border-ink-800 bg-ink-950/80 shadow-2xl shadow-ink-950/60',
        isPhone ? 'mx-auto w-full max-w-[16rem] rounded-[2rem] p-2.5' : 'w-full rounded-2xl p-2.5',
        className,
      )}
    >
      <div className={cn('overflow-hidden bg-ink-900', isPhone ? 'rounded-[1.55rem]' : 'rounded-xl')}>
        <div className="flex items-center gap-1.5 border-b border-ink-850 px-3 py-2">
          {isPhone ? (
            <span className="mx-auto h-1 w-10 rounded-full bg-ink-800" />
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-ink-800" />
              <span className="h-2 w-2 rounded-full bg-ink-800" />
              <span className="h-2 w-2 rounded-full bg-ink-800" />
            </>
          )}
        </div>
        <div className="p-4">{children}</div>
      </div>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  )
}
