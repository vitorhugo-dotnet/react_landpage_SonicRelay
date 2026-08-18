import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  className?: string
  children: ReactNode
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border border-ink-850 bg-ink-900/50 p-6 transition duration-200 ease-out-soft',
        className,
      )}
    >
      {children}
    </div>
  )
}
