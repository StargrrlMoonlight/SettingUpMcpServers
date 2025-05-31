import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// Mock localStorage
const mockLocalStorage = {
    store: {},
    getItem: vi.fn((key) => mockLocalStorage.store[key] || null),
    setItem: vi.fn((key, value) => {
        mockLocalStorage.store[key] = value
    }),
    removeItem: vi.fn((key) => {
        delete mockLocalStorage.store[key]
    }),
    clear: vi.fn(() => {
        mockLocalStorage.store = {}
    })
}

// Mock matchMedia - default to light mode
const mockMatchMedia = vi.fn((query) => ({
    matches: false, // Default to light mode
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
}))

describe('App Integration Tests', () => {
    beforeEach(() => {
        // Reset mocks
        vi.clearAllMocks()
        mockLocalStorage.clear()

        // Setup global mocks
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        })

        Object.defineProperty(window, 'matchMedia', {
            value: mockMatchMedia,
            writable: true
        })

        // Mock document.documentElement.setAttribute
        vi.spyOn(document.documentElement, 'setAttribute')
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('Initial Render and Setup', () => {
        it('renders the complete application structure', () => {
            render(<App />)

            // Check for main components
            expect(screen.getByRole('banner')).toBeInTheDocument() // Header
            expect(screen.getByRole('main')).toBeInTheDocument() // TodoList main section
            expect(screen.getByRole('form')).toBeInTheDocument() // AddTodo form

            // Check for default todos
            expect(screen.getByText('Review quarterly reports')).toBeInTheDocument()
            expect(screen.getByText('Schedule client meeting')).toBeInTheDocument()
            expect(screen.getByText('Update project documentation')).toBeInTheDocument()
        })

        it('initializes with default todos when localStorage is empty', () => {
            render(<App />)

            const todoItems = screen.getAllByRole('listitem')
            expect(todoItems).toHaveLength(3)

            // Check that one todo is completed by default
            const completedTodos = screen.getAllByRole('checkbox', { checked: true })
            expect(completedTodos).toHaveLength(1)
        })

        it('applies theme to document element on mount', () => {
            render(<App />)

            expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'light')
        })

        it('respects system dark mode preference', () => {
            mockMatchMedia.mockImplementation((query) => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }))

            render(<App />)

            expect(document.documentElement.setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
        })
    })

    describe('Theme Management', () => {
        it('cycles through themes correctly', async () => {
            const user = userEvent.setup()
            render(<App />)

            const themeButton = screen.getByRole('button', { name: /current.*theme.*click.*switch/i })

            // Start at light theme
            expect(document.documentElement.setAttribute).toHaveBeenLastCalledWith('data-theme', 'light')

            // Cycle to dark
            await user.click(themeButton)
            expect(document.documentElement.setAttribute).toHaveBeenLastCalledWith('data-theme', 'dark')

            // Cycle to vibe
            await user.click(themeButton)
            expect(document.documentElement.setAttribute).toHaveBeenLastCalledWith('data-theme', 'vibe')

            // Cycle back to light
            await user.click(themeButton)
            expect(document.documentElement.setAttribute).toHaveBeenLastCalledWith('data-theme', 'light')
        })

        it('persists theme selection in localStorage', async () => {
            const user = userEvent.setup()
            render(<App />)

            const themeButton = screen.getByRole('button', { name: /current.*theme.*click.*switch/i })
            await user.click(themeButton)

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'executiveTasks_theme',
                '"dark"'
            )
        })
    })

    describe('Todo Management Integration', () => {
        it('completes full todo lifecycle - add, toggle, edit, delete', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Add a new todo
            const input = screen.getByRole('textbox', { name: /add new task/i })
            const addButton = screen.getByRole('button', { name: /add task/i })

            await user.type(input, 'New integration test todo')
            await user.click(addButton)

            // Verify todo was added
            expect(screen.getByText('New integration test todo')).toBeInTheDocument()

            // Toggle the new todo
            const newTodoCheckbox = screen.getByRole('checkbox', {
                name: /toggle new integration test todo/i
            })
            await user.click(newTodoCheckbox)

            // Verify it's checked
            expect(newTodoCheckbox).toBeChecked()

            // Edit the todo
            const editButton = screen.getByRole('button', {
                name: /edit new integration test todo/i
            })
            await user.click(editButton)

            const editInput = screen.getByDisplayValue('New integration test todo')
            await user.clear(editInput)
            await user.type(editInput, 'Edited integration test todo')
            await user.keyboard('{Enter}')

            // Verify edit
            expect(screen.getByText('Edited integration test todo')).toBeInTheDocument()
            expect(screen.queryByText('New integration test todo')).not.toBeInTheDocument()

            // Delete the todo
            const deleteButton = screen.getByRole('button', {
                name: /delete edited integration test todo/i
            })
            await user.click(deleteButton)

            // Verify deletion
            expect(screen.queryByText('Edited integration test todo')).not.toBeInTheDocument()
        })

        it('filters todos correctly by status', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Get filter buttons
            const allButton = screen.getByRole('button', { name: /^all$/i })
            const activeButton = screen.getByRole('button', { name: /active/i })
            const completedButton = screen.getByRole('button', { name: /completed/i })

            // Initially show all todos (3 default)
            expect(screen.getAllByRole('listitem')).toHaveLength(3)

            // Filter to active todos (2 uncompleted)
            await user.click(activeButton)
            const activeTodos = screen.getAllByRole('listitem')
            expect(activeTodos).toHaveLength(2)
            expect(screen.queryByText('Schedule client meeting')).not.toBeInTheDocument()

            // Filter to completed todos (1 completed)
            await user.click(completedButton)
            const completedTodos = screen.getAllByRole('listitem')
            expect(completedTodos).toHaveLength(1)
            expect(screen.getByText('Schedule client meeting')).toBeInTheDocument()

            // Back to all
            await user.click(allButton)
            expect(screen.getAllByRole('listitem')).toHaveLength(3)
        })

        it('updates statistics correctly as todos change', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Initial stats: 2 active, 1 completed (33% completion)
            expect(screen.getByText(/2 active/i)).toBeInTheDocument()
            expect(screen.getByText(/33%/i)).toBeInTheDocument()

            // Add a new todo
            const input = screen.getByRole('textbox', { name: /add new task/i })
            await user.type(input, 'Statistics test todo')
            await user.keyboard('{Enter}')

            // Stats should update: 3 active, 1 completed (25% completion)
            expect(screen.getByText(/3 active/i)).toBeInTheDocument()
            expect(screen.getByText(/25%/i)).toBeInTheDocument()

            // Complete the new todo
            const newTodoCheckbox = screen.getByRole('checkbox', {
                name: /toggle statistics test todo/i
            })
            await user.click(newTodoCheckbox)

            // Stats should update: 2 active, 2 completed (50% completion)
            expect(screen.getByText(/2 active/i)).toBeInTheDocument()
            expect(screen.getByText(/50%/i)).toBeInTheDocument()
        })
    })

    describe('Save Indicator Integration', () => {
        it('shows save indicator when todos are modified', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Add a todo to trigger save indicator
            const input = screen.getByRole('textbox', { name: /add new task/i })
            await user.type(input, 'Save indicator test')
            await user.keyboard('{Enter}')

            // Save indicator should appear
            expect(screen.getByText(/saved/i)).toBeInTheDocument()

            // Should auto-hide after timeout
            await waitFor(() => {
                expect(screen.queryByText(/saved/i)).not.toBeInTheDocument()
            }, { timeout: 3000 })
        })

        it('shows save indicator when theme is changed', async () => {
            const user = userEvent.setup()
            render(<App />)

            const themeButton = screen.getByRole('button', { name: /current.*theme.*click.*switch/i })
            await user.click(themeButton)

            // Save indicator should appear
            expect(screen.getByText(/saved/i)).toBeInTheDocument()
        })
    })

    describe('Keyboard Navigation and Accessibility', () => {
        it('supports keyboard navigation through todos', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Focus first todo checkbox
            const firstCheckbox = screen.getAllByRole('checkbox')[0]
            firstCheckbox.focus()

            // Should be able to toggle with Space
            await user.keyboard(' ')
            expect(firstCheckbox).toBeChecked()

            // Should be able to navigate with Tab
            await user.keyboard('{Tab}')
            const editButton = screen.getAllByRole('button', { name: /edit/i })[0]
            expect(editButton).toHaveFocus()
        })

        it('supports quick todo addition with Enter key', async () => {
            const user = userEvent.setup()
            render(<App />)

            const input = screen.getByRole('textbox', { name: /add new task/i })
            await user.type(input, 'Keyboard test todo')
            await user.keyboard('{Enter}')

            expect(screen.getByText('Keyboard test todo')).toBeInTheDocument()
            expect(input).toHaveValue('') // Input should clear
        })
    })

    describe('Data Persistence', () => {
        it('saves todos to localStorage when modified', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Add a todo
            const input = screen.getByRole('textbox', { name: /add new task/i })
            await user.type(input, 'Persistence test')
            await user.keyboard('{Enter}')

            // Verify localStorage was called
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'executiveTasks_todos',
                expect.stringContaining('Persistence test')
            )
        })

        it('loads todos from localStorage on subsequent renders', () => {
            // Pre-populate localStorage with custom todos
            const customTodos = [
                { id: 1, text: 'Loaded from storage', completed: false }
            ]
            mockLocalStorage.setItem('executiveTasks_todos', JSON.stringify(customTodos))

            render(<App />)

            expect(screen.getByText('Loaded from storage')).toBeInTheDocument()
            expect(screen.queryByText('Review quarterly reports')).not.toBeInTheDocument()
        })
    })

    describe('Development Utilities', () => {
        it('exposes development utilities in DEV mode', () => {
            // Mock import.meta.env.DEV
            const originalEnv = import.meta.env.DEV
            import.meta.env.DEV = true

            render(<App />)

            expect(window.todoUtils).toBeDefined()
            expect(typeof window.todoUtils.clearAllData).toBe('function')
            expect(typeof window.todoUtils.exportData).toBe('function')
            expect(typeof window.todoUtils.importData).toBe('function')
            expect(typeof window.todoUtils.getCurrentTodos).toBe('function')
            expect(typeof window.todoUtils.help).toBe('function')

            // Restore original env
            import.meta.env.DEV = originalEnv
        })
    })

    describe('Error Handling and Edge Cases', () => {
        it('handles localStorage errors gracefully', () => {
            // Mock localStorage to throw errors
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('localStorage not available')
            })

            // Should not crash
            expect(() => render(<App />)).not.toThrow()
        })

        it('handles empty todo text gracefully', async () => {
            const user = userEvent.setup()
            render(<App />)

            // Find add button directly without referencing the input
            const addButton = screen.getByRole('button', { name: /add task/i })

            // Try to add empty todo
            await user.click(addButton)

            // Should not add empty todo
            const todoItems = screen.getAllByRole('listitem')
            expect(todoItems).toHaveLength(3) // Still just the default 3
        })

        it('handles malformed localStorage data', () => {
            // Put invalid JSON in localStorage
            mockLocalStorage.store['executiveTasks_todos'] = 'invalid json'

            // Should fall back to default todos
            render(<App />)
            expect(screen.getByText('Review quarterly reports')).toBeInTheDocument()
        })
    })
})
