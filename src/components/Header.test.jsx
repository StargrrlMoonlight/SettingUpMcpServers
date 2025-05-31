import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from '../components/Header'
import { ThemeContext } from '../contexts/ThemeContext'

// Test wrapper component to provide theme context
const TestWrapper = ({ children, theme = 'light', cycleTheme = vi.fn() }) => (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
        {children}
    </ThemeContext.Provider>
)

describe('Header Component', () => {
    it('renders the application title', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
        expect(screen.getByText(/executive tasks/i)).toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument()
    })

    it('displays current theme icon', () => {
        render(
            <TestWrapper theme="dark">
                <Header />
            </TestWrapper>
        )

        // Dark theme shows moon icon
        expect(screen.getByRole('button')).toHaveTextContent('🌙')
    })

    it('displays correct theme for vibe mode', () => {
        render(
            <TestWrapper theme="vibe">
                <Header />
            </TestWrapper>
        )

        // Vibe theme shows rainbow icon
        expect(screen.getByRole('button')).toHaveTextContent('🌈')
    })

    it('calls cycleTheme when theme button is clicked', async () => {
        const mockCycleTheme = vi.fn()
        const user = userEvent.setup()
        render(
            <TestWrapper cycleTheme={mockCycleTheme}>
                <Header />
            </TestWrapper>
        )

        const themeButton = screen.getByRole('button', { name: /switch to dark mode/i })
        await user.click(themeButton)

        expect(mockCycleTheme).toHaveBeenCalled()
    })

    it('has proper semantic structure', () => {
        render(
            <TestWrapper>
                <Header />
            </TestWrapper>
        )

        const header = screen.getByRole('banner')
        expect(header).toBeInTheDocument()

        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()
    })
})
