type Product = {
  id: number
  name: string
}

type ProductListProps = {
  products: Product[]
  loading: boolean
  error: string
  onRefresh: () => void
}

export default function ProductList({
  products,
  loading,
  error,
  onRefresh
}: ProductListProps) {
  const renderProducts = () => {
    if (loading) {
      return <p>Loading products...</p>
    }

    if (products.length === 0) {
      return <p>No products yet.</p>
    }

    return (
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <small>ID #{product.id}</small>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {error && <p className="error">{error}</p>}

      <div className="list-header">
        <h2>Product list</h2>
        <button type="button" className="secondary" onClick={onRefresh}>
          Refresh
        </button>
      </div>

      {renderProducts()}
    </>
  )
}
