import type { FormEvent } from 'react'

type AddProductFormProps = {
  name: string
  onNameChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export default function AddProductForm({
  name,
  onNameChange,
  onSubmit
}: AddProductFormProps) {
  return (
    <form onSubmit={onSubmit} className="product-form">
      <label htmlFor="product-name">Product name</label>
      <div className="row">
        <input
          id="product-name"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Enter a product name"
        />
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
