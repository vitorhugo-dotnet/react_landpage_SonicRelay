type ClassValue = string | false | null | undefined

/** Joins conditional class names. Small on purpose — no dependency needed. */
export const cn = (...values: ClassValue[]): string => values.filter(Boolean).join(' ')
