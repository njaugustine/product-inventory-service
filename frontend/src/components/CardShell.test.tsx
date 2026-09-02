import { render, screen } from '@testing-library/react'
import CardShell from './CardShell'

describe('CardShell', () => {
  it('renders the title and children content', () => {
    render(
      <CardShell title="Products">
        <div>Child content</div>
      </CardShell>
    )

    expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })
})
