import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../components/TodoItem'

describe('TodoItem Component', () => {
    const mockTodo = {
        id: 1,
        text: 'Test todo',
        completed: false
    }

    const defaultProps = {
        todo: mockTodo,
        onToggle: vi.fn(),
        onDelete: vi.fn(),
        onEdit: vi.fn()
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders todo text and controls', () => {
        render(<TodoItem {...defaultProps} />)

        expect(screen.getByText('Test todo')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
    })

    it('shows completed styling when todo is completed', () => {
        const completedTodo = { ...mockTodo, completed: true }
        render(<TodoItem {...defaultProps} todo={completedTodo} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeChecked()
    })

    it('calls onToggle when checkbox is clicked', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const checkbox = screen.getByRole('checkbox')
        await user.click(checkbox)

        expect(defaultProps.onToggle).toHaveBeenCalledWith(mockTodo.id)
    })

    it('calls onDelete when delete button is clicked', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const deleteButton = screen.getByRole('button', { name: /delete/i })
        await user.click(deleteButton)

        expect(defaultProps.onDelete).toHaveBeenCalledWith(mockTodo.id)
    })

    it('enters edit mode when edit button is clicked', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    it('calls onEdit when save button is clicked with new text', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const input = screen.getByDisplayValue('Test todo')
        await user.clear(input)
        await user.type(input, 'Updated todo text')

        const saveButton = screen.getByRole('button', { name: /save/i })
        await user.click(saveButton)

        expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTodo.id, 'Updated todo text')
    })

    it('cancels edit mode without calling onEdit when cancel is clicked', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const input = screen.getByDisplayValue('Test todo')
        await user.clear(input)
        await user.type(input, 'This should not be saved')

        const cancelButton = screen.getByRole('button', { name: /cancel/i })
        await user.click(cancelButton)

        expect(defaultProps.onEdit).not.toHaveBeenCalled()
        expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    it('saves edit when Enter key is pressed', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const input = screen.getByDisplayValue('Test todo')
        await user.clear(input)
        await user.type(input, 'Updated via Enter{Enter}')

        expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTodo.id, 'Updated via Enter')
    })

    it('cancels edit when Escape key is pressed', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const input = screen.getByDisplayValue('Test todo')
        await user.clear(input)
        await user.type(input, 'This should not be saved')
        await user.keyboard('{Escape}')

        expect(defaultProps.onEdit).not.toHaveBeenCalled()
        expect(screen.getByText('Test todo')).toBeInTheDocument()
    })

    it('does not save empty text', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const input = screen.getByDisplayValue('Test todo')
        await user.clear(input)

        const saveButton = screen.getByRole('button', { name: /save/i })
        await user.click(saveButton)

        expect(defaultProps.onEdit).not.toHaveBeenCalled()
    })

    it('trims whitespace before saving', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const input = screen.getByDisplayValue('Test todo')
        await user.clear(input)
        await user.type(input, '  Updated todo text  ')

        const saveButton = screen.getByRole('button', { name: /save/i })
        await user.click(saveButton)

        expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTodo.id, 'Updated todo text')
    })
})
