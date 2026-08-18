import { describe, expect, it } from 'vitest'
import { cn } from '../cn'

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('drops falsy values so conditional classes stay readable', () => {
    expect(cn('a', false, undefined, null, 'b')).toBe('a b')
  })
})
