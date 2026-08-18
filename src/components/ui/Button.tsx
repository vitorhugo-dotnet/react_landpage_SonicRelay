import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 ease-out-soft'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-signal-500 text-ink-950 shadow-lg shadow-signal-500/20 hover:bg-signal-400 hover:shadow-signal-400/30',
  secondary: 'border border-ink-800 bg-ink-900/60 text-ink-100 hover:border-ink-700 hover:bg-ink-850',
  ghost: 'text-ink-300 hover:text-ink-100',
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  external?: boolean | undefined
  children: ReactNode
}

/**
 * Every call to action on this page is a link, so the component is an anchor.
 * A real <button> variant would be added the day an action needs one.
 */
export function LinkButton({ variant = 'primary', external, className, children, ...props }: LinkButtonProps) {
  const externalProps = external ? { target: '_blank', rel: 'noreferrer noopener' } : {}

  return (
    <a className={cn(base, variants[variant], className)} {...externalProps} {...props}>
      {children}
    </a>
  )
}
