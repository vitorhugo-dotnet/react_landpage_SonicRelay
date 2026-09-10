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

  it('links the Google Play listing', () => {
    render(<Downloads />)

    expect(screen.getByRole('link', { name: /Google Play/i })).toHaveAttribute(
      'href',
      'https://play.google.com/store/apps/details?id=com.vitorhugo.sonicrelay.sonic_relay&pli=1',
    )
  })

  it('marks unpublished stores as coming soon', () => {
    render(<Downloads />)

    expect(screen.getAllByText('Coming soon')).toHaveLength(
      storeLinks.filter((link) => !link.href).length,
    )
  })

  it('links to the SonicRelay web app', () => {
    render(<Downloads />)

    expect(screen.getByRole('link', { name: /Open Web App/i })).toHaveAttribute(
      'href',
      'https://sonicrelay.hugodotnet.dev',
    )
  })
})
