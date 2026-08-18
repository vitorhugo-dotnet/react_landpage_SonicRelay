import type { IconName } from '@/components/ui/Icon'

/**
 * Contracts every content module is written against. Section components depend
 * on these shapes rather than on concrete copy, so wording changes never reach
 * the presentation layer.
 */

export interface NavLink {
  readonly label: string
  readonly href: string
}

export interface CallToActionLink extends NavLink {
  readonly external?: boolean
}

export interface HeroContent {
  readonly eyebrow: string
  readonly title: readonly [string, string]
  readonly description: string
  readonly primaryAction: CallToActionLink
  readonly secondaryAction: CallToActionLink
  readonly highlights: readonly string[]
}

export interface Feature {
  readonly id: string
  readonly icon: IconName
  readonly title: string
  readonly description: string
}

export type StepScreen = 'pair' | 'join' | 'playback' | 'monitor'

export interface Step {
  readonly id: StepScreen
  readonly index: number
  readonly title: string
  readonly description: string
  readonly endpoint: string
}

export interface SuiteProject {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly stack: string
  readonly repository: string
  readonly icon: IconName
}

export interface ArchitectureNode {
  readonly id: string
  readonly title: string
  readonly subtitle: string
  readonly items: readonly string[]
  readonly icon: IconName
}

export interface SecurityControl {
  readonly id: string
  readonly title: string
  readonly description: string
}

export interface RetentionRow {
  readonly data: string
  readonly measuredFrom: string
  readonly retention: string
}

export interface FaqItem {
  readonly id: string
  readonly question: string
  readonly answer: string
}
