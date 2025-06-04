import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddTodo from '../components/AddTodo'

describe('AddTodo Component', () => {
    it('renders input field and add button', () => {
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument()
    })

    it('updates input value when typing', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        await user.type(input, 'New todo item')

        expect(input).toHaveValue('New todo item')
    })

    it('calls onAddTodo when form is submitted with text', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        const button = screen.getByRole('button', { name: /add task/i })

        await user.type(input, 'New todo item')
        await user.click(button)

        expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item', 'medium', null)
    })

    it('calls onAddTodo when Enter key is pressed', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        await user.type(input, 'New todo item')
        await user.keyboard('{Enter}')

        expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item', 'medium', null)
    })

    it('clears input after successful submission', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        await user.type(input, 'New todo item')
        await user.keyboard('{Enter}')

        expect(input).toHaveValue('')
    })

    it('does not call onAddTodo with empty or whitespace-only text', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        const button = screen.getByRole('button', { name: /add task/i })

        // Test empty submission
        await user.click(button)
        expect(mockOnAddTodo).not.toHaveBeenCalled()

        // Test whitespace-only submission
        await user.type(input, '   ')
        await user.click(button)
        expect(mockOnAddTodo).not.toHaveBeenCalled()
    })

    it('trims whitespace from input before calling onAddTodo', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        await user.type(input, '  New todo item  ')
        await user.keyboard('{Enter}')

        expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item', 'medium', null)
    })

    it('allows setting priority and due date', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        const prioritySelect = screen.getByLabelText(/task priority/i)
        const dueDateInput = screen.getByLabelText(/due date/i)
        const button = screen.getByRole('button', { name: /add task/i })

        await user.type(input, 'High priority task')
        await user.selectOptions(prioritySelect, 'high')
        await user.type(dueDateInput, '2024-12-31')
        await user.click(button)

        expect(mockOnAddTodo).toHaveBeenCalledWith('High priority task', 'high', '2024-12-31')
    })

    it('clears all fields after successful submission', async () => {
        const user = userEvent.setup()
        const mockOnAddTodo = vi.fn()
        render(<AddTodo onAddTodo={mockOnAddTodo} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        const prioritySelect = screen.getByLabelText(/task priority/i)
        const dueDateInput = screen.getByLabelText(/due date/i)

        await user.type(input, 'Test task')
        await user.selectOptions(prioritySelect, 'high')
        await user.type(dueDateInput, '2024-12-31')
        await user.keyboard('{Enter}')

        expect(input).toHaveValue('')
        expect(prioritySelect).toHaveValue('medium')
        expect(dueDateInput).toHaveValue('')
    })
})
