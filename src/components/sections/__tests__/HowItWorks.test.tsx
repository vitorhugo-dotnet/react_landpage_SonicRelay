import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HowItWorks } from '../HowItWorks'
import { steps } from '@/content/steps'

describe('HowItWorks', () => {
  it('renders every step as an ordered list item', () => {
    render(<HowItWorks />)
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
    expect(screen.getAllByRole('listitem')).toHaveLength(steps.length)
  })

  it('shows the API route behind each step', () => {
    render(<HowItWorks />)
    steps.forEach((step) => {
      expect(screen.getByText(step.endpoint)).toBeInTheDocument()
    })
  })
})
