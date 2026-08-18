import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface BadgeProps {
  className?: string
  children: ReactNode
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900/70 px-3 py-1 text-xs font-medium tracking-wide text-ink-300',
        className,
      )}
    >
      {children}
    </span>
  )
}
