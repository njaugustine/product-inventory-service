import { fireEvent, render, screen } from '@testing-library/react'
import ProductList from './ProductList'

describe('ProductList', () => {
  it('shows a loading message while loading', () => {
    render(
      <ProductList
        products={[]}
        loading={true}
        error=""
        onRefresh={jest.fn()}
      />
    )

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('shows an empty state when there are no products', () => {
    render(
      <ProductList
        products={[]}
        loading={false}
        error=""
        onRefresh={jest.fn()}
      />
    )

    expect(screen.getByText('No products yet.')).toBeInTheDocument()
  })

  it('renders each product and calls refresh when the button is clicked', () => {
    const onRefresh = jest.fn()

    render(
      <ProductList
        products={[{ id: 1, name: 'Keyboard' }, { id: 2, name: 'Mouse' }]}
        loading={false}
        error=""
        onRefresh={onRefresh}
      />
    )

    expect(screen.getByText('Keyboard')).toBeInTheDocument()
    expect(screen.getByText('Mouse')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Refresh' }))

    expect(onRefresh).toHaveBeenCalledTimes(1)
  })

  it('shows an error when one is provided', () => {
    render(
      <ProductList
        products={[]}
        loading={false}
        error="Failed to load products"
        onRefresh={jest.fn()}
      />
    )

    expect(screen.getByText('Failed to load products')).toBeInTheDocument()
  })
})
