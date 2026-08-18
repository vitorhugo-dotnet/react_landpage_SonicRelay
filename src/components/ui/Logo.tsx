import { site } from '@/content/site'
import { cn } from '@/lib/cn'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 font-semibold text-ink-100', className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="9" fill="var(--color-ink-900)" stroke="var(--color-ink-800)" />
        <g stroke="var(--color-signal-400)" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M11 12v8M16 8v16M21 12v8" />
        </g>
      </svg>
      <span className="text-base tracking-tight">{site.name}</span>
    </span>
  )
}
