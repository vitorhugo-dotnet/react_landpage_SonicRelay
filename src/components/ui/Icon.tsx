import type { SVGProps } from 'react'

/**
 * Inline icon registry. Keeping the paths here avoids an icon dependency and
 * gives every icon the same stroke treatment for free.
 */
const paths = {
  bolt: 'M13 2 4.5 13.5H11L10 22l8.5-11.5H12z',
  fingerprint: 'M12 11v3a9 9 0 0 1-1.2 4.5M7.5 6.2a8 8 0 0 1 12 6.3M4.5 15.5A9 9 0 0 1 4 12a8 8 0 0 1 1.6-4.8M16 13a13 13 0 0 1-1 6M8 11a4 4 0 0 1 8 0v1',
  link: 'M10 13a4 4 0 0 0 5.7.3l3-3A4 4 0 0 0 13 4.7l-1.7 1.7M14 11a4 4 0 0 0-5.7-.3l-3 3A4 4 0 0 0 11 19.3l1.7-1.7',
  key: 'M15.5 3a5.5 5.5 0 1 0-4.9 8L9 12.6V15H6.6L3 18.6V21h3l7.4-7.4A5.5 5.5 0 0 0 15.5 3m1.5 4h.01',
  shield: 'M12 3 5 6v5.5c0 4.3 2.9 8.2 7 9.5 4.1-1.3 7-5.2 7-9.5V6z',
  activity: 'M3 12h3.5L9 5l4 14 2.5-7H21',
  server: 'M4 5h16v5H4zm0 9h16v5H4zM7.5 7.5h.01M7.5 16.5h.01',
  desktop: 'M3 5h18v11H3zM9 20h6M12 16v4',
  phone: 'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2.5 17h3',
  github:
    'M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2',
  arrowRight: 'M5 12h14m-6-6 6 6-6 6',
  check: 'm4 12.5 5 5L20 6.5',
  chevronDown: 'm6 9 6 6 6-6',
} as const

export type IconName = keyof typeof paths

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
      <path d={paths[name]} />
    </svg>
  )
}
