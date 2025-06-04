import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoList from '../components/TodoList'

describe('TodoList Component', () => {
    const mockTodos = [
        { id: 1, text: 'High priority task', completed: false, priority: 'high', dueDate: '2024-12-25' },
        { id: 2, text: 'Completed todo', completed: true, priority: 'medium', dueDate: '2024-12-20' },
        { id: 3, text: 'Low priority task', completed: false, priority: 'low', dueDate: '2024-12-30' },
        { id: 4, text: 'Another medium task', completed: false, priority: 'medium', dueDate: '2024-12-15' }
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

        expect(screen.getByText('High priority task')).toBeInTheDocument()
        expect(screen.getByText('Completed todo')).toBeInTheDocument()
        expect(screen.getByText('Low priority task')).toBeInTheDocument()
        expect(screen.getByText('Another medium task')).toBeInTheDocument()
    })

    it('displays correct todo statistics', () => {
        render(<TodoList {...defaultProps} />)

        expect(screen.getByText('3 active, 1 completed (25%)')).toBeInTheDocument()
    })

    it('renders sort dropdown', () => {
        render(<TodoList {...defaultProps} />)

        expect(screen.getByLabelText('Sort by:')).toBeInTheDocument()
        expect(screen.getByRole('combobox', { name: 'Sort by:' })).toBeInTheDocument()
    })

    it('sorts todos by priority when priority sort is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const sortSelect = screen.getByRole('combobox', { name: 'Sort by:' })
        await user.selectOptions(sortSelect, 'priority')

        // Check that high priority appears first, then medium, then low
        const todoTexts = screen.getAllByText(/task|todo/).map(el => el.textContent)
        const taskOrder = todoTexts.filter(text => 
            text.includes('High priority') || 
            text.includes('Another medium') || 
            text.includes('Low priority')
        )
        
        expect(taskOrder[0]).toContain('High priority')
        expect(taskOrder[1]).toContain('Another medium')
        expect(taskOrder[2]).toContain('Low priority')
    })

    it('sorts todos by due date when due date sort is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const sortSelect = screen.getByRole('combobox', { name: 'Sort by:' })
        await user.selectOptions(sortSelect, 'dueDate')

        // Check that earliest due date appears first
        const todoTexts = screen.getAllByText(/task|todo/).map(el => el.textContent)
        const taskOrder = todoTexts.filter(text => 
            text.includes('Another medium') || 
            text.includes('High priority') || 
            text.includes('Low priority')
        )
        
        expect(taskOrder[0]).toContain('Another medium') // 2024-12-15
        expect(taskOrder[1]).toContain('High priority') // 2024-12-25
        expect(taskOrder[2]).toContain('Low priority') // 2024-12-30
    })

    it('sorts todos alphabetically when alphabetical sort is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const sortSelect = screen.getByRole('combobox', { name: 'Sort by:' })
        await user.selectOptions(sortSelect, 'alphabetical')

        // Check alphabetical order
        const todoTexts = screen.getAllByText(/task|todo/).map(el => el.textContent)
        const taskOrder = todoTexts.filter(text => 
            text.includes('Another medium') || 
            text.includes('High priority') || 
            text.includes('Low priority')
        )
        
        expect(taskOrder[0]).toContain('Another medium')
        expect(taskOrder[1]).toContain('High priority')
        expect(taskOrder[2]).toContain('Low priority')
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

        expect(screen.getByText('High priority task')).toBeInTheDocument()
        expect(screen.getByText('Low priority task')).toBeInTheDocument()
        expect(screen.getByText('Another medium task')).toBeInTheDocument()
        expect(screen.queryByText('Completed todo')).not.toBeInTheDocument()
    })

    it('shows only completed todos when completed filter is selected', async () => {
        const user = userEvent.setup()
        render(<TodoList {...defaultProps} />)

        const completedButton = screen.getByRole('button', { name: 'Completed' })
        await user.click(completedButton)

        expect(screen.getByText('Completed todo')).toBeInTheDocument()
        expect(screen.queryByText('High priority task')).not.toBeInTheDocument()
        expect(screen.queryByText('Low priority task')).not.toBeInTheDocument()
        expect(screen.queryByText('Another medium task')).not.toBeInTheDocument()
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

        expect(screen.getByText('High priority task')).toBeInTheDocument()
        expect(screen.getByText('Completed todo')).toBeInTheDocument()
        expect(screen.getByText('Low priority task')).toBeInTheDocument()
        expect(screen.getByText('Another medium task')).toBeInTheDocument()
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
        
        const addButton = screen.getByRole('button', { name: /add task/i })
        await user.click(addButton)

        expect(defaultProps.onAddTodo).toHaveBeenCalledWith('New todo from list', 'medium', null)
    })

    it('passes correct props to TodoItem components', () => {
        render(<TodoList {...defaultProps} />)

        // Check that TodoItem components receive the correct props
        const checkboxes = screen.getAllByRole('checkbox')
        expect(checkboxes).toHaveLength(4)

        const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
        expect(deleteButtons).toHaveLength(4)

        const editButtons = screen.getAllByRole('button', { name: /edit/i })
        expect(editButtons).toHaveLength(4)
    })

    it('handles empty todo list gracefully', () => {
        render(<TodoList {...defaultProps} todos={[]} />)

        expect(screen.getByText('0 active, 0 completed (0%)')).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument()
        expect(screen.getByText('No tasks found')).toBeInTheDocument()
    })

    it('updates statistics when todos change', () => {
        const { rerender } = render(<TodoList {...defaultProps} />)

        expect(screen.getByText('3 active, 1 completed (25%)')).toBeInTheDocument()

        const updatedTodos = [
            { id: 1, text: 'High priority task', completed: true, priority: 'high', dueDate: '2024-12-25' },
            { id: 2, text: 'Completed todo', completed: true, priority: 'medium', dueDate: '2024-12-20' },
            { id: 3, text: 'Low priority task', completed: false, priority: 'low', dueDate: '2024-12-30' },
            { id: 4, text: 'Another medium task', completed: false, priority: 'medium', dueDate: '2024-12-15' }
        ]

        rerender(<TodoList {...defaultProps} todos={updatedTodos} />)
        expect(screen.getByText('2 active, 2 completed (50%)')).toBeInTheDocument()
    })
})
