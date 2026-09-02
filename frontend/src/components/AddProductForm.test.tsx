import { fireEvent, render, screen } from '@testing-library/react'
import AddProductForm from './AddProductForm'

describe('AddProductForm', () => {
  it('renders the label and input', () => {
    render(
      <AddProductForm
        name=""
        onNameChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    )

    expect(screen.getByLabelText('Product name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter a product name')).toBeInTheDocument()
  })

  it('calls onNameChange when the user types', () => {
    const onNameChange = jest.fn()

    render(
      <AddProductForm
        name=""
        onNameChange={onNameChange}
        onSubmit={jest.fn()}
      />
    )

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Laptop' } })

    expect(onNameChange).toHaveBeenCalledWith('Laptop')
  })

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn((event) => event.preventDefault())

    render(
      <AddProductForm
        name="Keyboard"
        onNameChange={jest.fn()}
        onSubmit={onSubmit}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
