import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { StoreButton } from '../StoreButton'
import type { StoreLink } from '@/content/types'

const pending: StoreLink = {
  id: 'play',
  eyebrow: 'Get it on',
  name: 'Google Play',
  target: 'SonicRelay Mobile',
}

describe('StoreButton', () => {
  it('renders an unpublished store as inert markup, not a link', () => {
    render(<StoreButton link={pending} comingSoonLabel="Coming soon" />)

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText('Coming soon')).toBeInTheDocument()
    expect(screen.getByText('Google Play')).toBeInTheDocument()
  })

  it('shows the eyebrow instead of the pending label once a URL exists', () => {
    render(
      <StoreButton
        link={{ ...pending, href: 'https://play.google.com/store/apps/details?id=dev.sonicrelay' }}
        comingSoonLabel="Coming soon"
      />,
    )

    const link = screen.getByRole('link', { name: /Google Play/ })
    expect(link).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=dev.sonicrelay')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.getByText('Get it on')).toBeInTheDocument()
    expect(screen.queryByText('Coming soon')).not.toBeInTheDocument()
  })
})
