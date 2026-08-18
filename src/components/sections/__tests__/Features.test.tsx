import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Features } from '../Features'
import { features } from '@/content/features'

describe('Features', () => {
  it('renders one item per feature in the content module', () => {
    render(<Features />)
    expect(screen.getAllByRole('listitem')).toHaveLength(features.length)
  })

  it('labels its landmark with the section heading', () => {
    render(<Features />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(screen.getByRole('region', { name: heading.textContent ?? '' })).toBeInTheDocument()
  })
})
