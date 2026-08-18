import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

/** The single place the page's horizontal rhythm is defined. */
export function Container({ as: Component = 'div', className, children }: ContainerProps) {
  return <Component className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</Component>
}
