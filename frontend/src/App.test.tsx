import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(global, 'fetch', {
      value: jest.fn(),
      writable: true
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('loads products on mount and allows creating a new product', async () => {
    const fetchMock = jest.mocked(global.fetch)

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, name: 'Keyboard' }]
    } as Response)

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 2, name: 'Mouse' })
    } as Response)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Keyboard')).toBeInTheDocument()
    })

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Mouse' } })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    await waitFor(() => {
      expect(screen.getByText('Mouse')).toBeInTheDocument()
    })

    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/products')
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/products',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Mouse' })
      })
    )
  })
})
