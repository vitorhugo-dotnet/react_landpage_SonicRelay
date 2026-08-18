import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SiteHeader } from '../SiteHeader'
import { navigation } from '@/content/site'

describe('SiteHeader', () => {
  it('exposes every navigation entry as a link', () => {
    render(<SiteHeader />)
    const primary = screen.getByRole('navigation', { name: 'Primary' })
    expect(primary.querySelectorAll('a')).toHaveLength(navigation.length)
  })

  it('toggles the mobile menu and reflects it in aria-expanded', async () => {
    const user = userEvent.setup()
    render(<SiteHeader />)

    const toggle = screen.getByRole('button', { name: 'Open menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument()

    await user.click(toggle)

    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
  })
})
