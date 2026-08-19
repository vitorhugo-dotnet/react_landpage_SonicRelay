import type { SVGProps } from 'react'
import { iconPaths, type IconName } from './icon-paths'

/**
 * Inline icon renderer. Keeping the paths in `icon-paths.ts` avoids an icon
 * dependency and gives every icon the same stroke treatment for free.
 */
export type { IconName }

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={iconPaths[name]} />
    </svg>
  )
}
