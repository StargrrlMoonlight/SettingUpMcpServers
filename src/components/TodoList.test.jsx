import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList'

describe('TodoList Component', () => {
    const mockTodos = [
        { id: 1, text: 'Active todo 1', completed: false },
        { id: 2, text: 'Completed todo', completed: true },
        { id: 3, text: 'Active todo 2', completed: false }
    ]

    const defaultProps = {
        todos: mockTodos,
        onAddTodo: vi.fn(),
        onToggleTodo: vi.fn(),
        onDeleteTodo: vi.fn(),
        onEditTodo: vi.fn()
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders all todos by default', () => {
        render(<TodoList {...defaultProps} />)

        expect(screen.getByText('Active todo 1')).toBeInTheDocument()
        expect(screen.getByText('Completed todo')).toBeInTheDocument()
        expect(screen.getByText('Active todo 2')).toBeInTheDocument()
    })

    it('displays correct todo statistics', () => {
        render(<TodoList {...defaultProps} />)

        expect(screen.getByText('2 active, 1 completed (33%)')).toBeInTheDocument()
    })

    it('renders filter buttons', () => {
        render(<TodoList {...defaultProps} />)

        expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Completed' })).toBeInTheDocument()
    })

    it('shows only active todos when active filter is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const activeButton = screen.getByRole('button', { name: 'Active' })
        await user.click(activeButton)

        expect(screen.getByText('Active todo 1')).toBeInTheDocument()
        expect(screen.getByText('Active todo 2')).toBeInTheDocument()
        expect(screen.queryByText('Completed todo')).not.toBeInTheDocument()
    })

    it('shows only completed todos when completed filter is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const completedButton = screen.getByRole('button', { name: 'Completed' })
        await user.click(completedButton)

        expect(screen.getByText('Completed todo')).toBeInTheDocument()
        expect(screen.queryByText('Active todo 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Active todo 2')).not.toBeInTheDocument()
    })

    it('shows all todos when all filter is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        // First select a different filter
        const activeButton = screen.getByRole('button', { name: 'Active' })
        await user.click(activeButton)

        // Then select all
        const allButton = screen.getByRole('button', { name: 'All' })
        await user.click(allButton)

        expect(screen.getByText('Active todo 1')).toBeInTheDocument()
        expect(screen.getByText('Completed todo')).toBeInTheDocument()
        expect(screen.getByText('Active todo 2')).toBeInTheDocument()
    })

    it('applies active class to selected filter button', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const allButton = screen.getByRole('button', { name: 'All' })
        const activeButton = screen.getByRole('button', { name: 'Active' })

        // All button should be active by default
        expect(allButton).toHaveClass('active')
        expect(activeButton).not.toHaveClass('active')

        // Click active button
        await user.click(activeButton)
        expect(activeButton).toHaveClass('active')
        expect(allButton).not.toHaveClass('active')
    })

    it('renders AddTodo component', () => {
        render(<TodoList {...defaultProps} />)

        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
    })

    it('passes onAddTodo prop to AddTodo component', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const input = screen.getByPlaceholderText(/add a new task/i)
        await user.type(input, 'New todo from list')
        await user.keyboard('{Enter}')

        expect(defaultProps.onAddTodo).toHaveBeenCalledWith('New todo from list')
    })

    it('passes correct props to TodoItem components', () => {
        render(<TodoList {...defaultProps} />)

        // Check that TodoItem components receive the correct props
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes).toHaveLength(3)

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
        expect(deleteButtons).toHaveLength(3)

        const editButtons = screen.getAllByRole('button', { name: /edit/i })
        expect(editButtons).toHaveLength(3)
    })

    it('handles empty todo list gracefully', () => {
        render(<TodoList {...defaultProps} todos={[]} />)

        expect(screen.getByText('0 active, 0 completed (0%)')).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
    })

    it('updates statistics when todos change', () => {
        const { rerender } = render(<TodoList {...defaultProps} />)

        expect(screen.getByText('2 active, 1 completed (33%)')).toBeInTheDocument()

        const updatedTodos = [
            { id: 1, text: 'Active todo 1', completed: true },
            { id: 2, text: 'Completed todo', completed: true },
            { id: 3, text: 'Active todo 2', completed: false }
        ]

        rerender(<TodoList {...defaultProps} todos={updatedTodos} />)
        expect(screen.getByText('1 active, 2 completed (67%)')).toBeInTheDocument()
    })
})
