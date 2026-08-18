import type { ReactNode } from 'react'
import { Container } from './Container'
import { cn } from '@/lib/cn'

interface SectionProps {
  id: string
  className?: string
  labelledBy?: string
  children: ReactNode
}

/** A landmark section with the page's vertical rhythm applied once. */
export function Section({ id, className, labelledBy, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('scroll-mt-24 py-20 sm:py-28', className)}>
      <Container>{children}</Container>
    </section>
  )
}
