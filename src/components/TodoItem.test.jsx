import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoItem from '../components/TodoItem'

describe('TodoItem Component', () => {
    const mockTodo = {
        id: 1,
        text: 'Test todo',
        completed: false,
        priority: 'medium',
        dueDate: '2024-12-31'
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

    it('displays priority and due date', () => {
        render(<TodoItem {...defaultProps} />)

        expect(screen.getByText('medium')).toBeInTheDocument()
        expect(screen.getByText(/Due: 12\/31\/2024/)).toBeInTheDocument()
    })

    it('shows overdue indicator for past due dates', () => {
        const overdueTodo = { ...mockTodo, dueDate: '2020-01-01' }
        render(<TodoItem {...defaultProps} todo={overdueTodo} />)

        expect(screen.getByText(/Overdue/)).toBeInTheDocument()
    })

    it('does not show overdue for completed tasks', () => {
        const completedOverdueTodo = { 
            ...mockTodo, 
            dueDate: '2020-01-01', 
            completed: true 
        }
        render(<TodoItem {...defaultProps} todo={completedOverdueTodo} />)

        expect(screen.queryByText(/Overdue/)).not.toBeInTheDocument()
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
        expect(screen.getByDisplayValue('medium')).toBeInTheDocument()
        expect(screen.getByDisplayValue('2024-12-31')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
    })

    it('calls onEdit with all fields when save button is clicked', async () => {
        const user = userEvent.setup()
        render(<TodoItem {...defaultProps} />)

        const editButton = screen.getByRole('button', { name: /edit/i })
        await user.click(editButton)

        const textInput = screen.getByDisplayValue('Test todo')
        await user.clear(textInput)
        await user.type(textInput, 'Updated todo text')

        const prioritySelect = screen.getByDisplayValue('medium')
        await user.selectOptions(prioritySelect, 'high')

        const dueDateInput = screen.getByDisplayValue('2024-12-31')
        await user.clear(dueDateInput)
        await user.type(dueDateInput, '2025-01-15')

        const saveButton = screen.getByRole('button', { name: /save/i })
        await user.click(saveButton)

        expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTodo.id, { 
            text: 'Updated todo text',
            priority: 'high',
            dueDate: '2025-01-15'
        })
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

        expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTodo.id, { 
            text: 'Updated via Enter',
            priority: 'medium',
            dueDate: '2024-12-31'
        })
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

        expect(defaultProps.onEdit).toHaveBeenCalledWith(mockTodo.id, { 
            text: 'Updated todo text',
            priority: 'medium',
            dueDate: '2024-12-31'
        })
    })
})
