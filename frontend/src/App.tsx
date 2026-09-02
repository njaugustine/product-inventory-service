import { useEffect, useState } from 'react'
import AddProductForm from './components/AddProductForm'
import CardShell from './components/CardShell'
import ProductList from './components/ProductList'

type Product = {
  id: number
  name: string
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadProducts = async (): Promise<void> => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to load products')
      const data: Product[] = await response.json()
      setProducts(data)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadProducts()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: trimmed })
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Failed to create product')
      }

      const created: Product = await response.json()
      setProducts((current) => [created, ...current])
      setName('')
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product')
    }
  }

  return (
    <CardShell title="Products">
      <AddProductForm
        name={name}
        onNameChange={setName}
        onSubmit={handleSubmit}
      />

      <ProductList
        products={products}
        loading={loading}
        error={error}
        onRefresh={() => void loadProducts()}
      />
    </CardShell>
  )
}
