import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Downloads } from '../Downloads'
import { storeLinks } from '@/content/downloads'

describe('Downloads', () => {
  it('renders every configured store', () => {
    render(<Downloads />)

    storeLinks.forEach((link) => {
      expect(screen.getByText(link.name)).toBeInTheDocument()
    })
  })

  it('covers the three stores the product ships to', () => {
    expect(storeLinks.map((link) => link.id)).toEqual(['play', 'fdroid', 'microsoft'])
  })

  it('marks every store as coming soon while none is published', () => {
    render(<Downloads />)

    expect(screen.getAllByText('Coming soon')).toHaveLength(storeLinks.length)
    // The only links in the section are the two repository buttons.
    expect(screen.getAllByRole('link')).toHaveLength(2)
  })
})
