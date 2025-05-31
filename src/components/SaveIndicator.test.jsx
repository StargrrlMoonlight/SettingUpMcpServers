import { describe, it, expect, vi } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import SaveIndicator from '../components/SaveIndicator'

describe('SaveIndicator Component', () => {
    it('renders save indicator when show prop is true', () => {
        render(<SaveIndicator show={true} />)

        expect(screen.getByText(/saved/i)).toBeInTheDocument()
    })

    it('does not render save indicator when show prop is false', () => {
        render(<SaveIndicator show={false} />)

        expect(screen.queryByText(/saved/i)).not.toBeInTheDocument()
    })

    it('calls onHide after timeout when show becomes true', async () => {
        const mockOnHide = vi.fn()
        const { rerender } = render(<SaveIndicator show={false} onHide={mockOnHide} />)

        // Show the indicator
        rerender(<SaveIndicator show={true} onHide={mockOnHide} />)

        // Wait for timeout
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 2100)) // Wait for timeout + buffer
        })

        expect(mockOnHide).toHaveBeenCalled()
    })

    it('does not call onHide when component unmounts before timeout', () => {
        const mockOnHide = vi.fn()
        const { unmount } = render(<SaveIndicator show={true} onHide={mockOnHide} />)

        unmount()

        expect(mockOnHide).not.toHaveBeenCalled()
    })

    it('has proper ARIA attributes for accessibility', () => {
        render(<SaveIndicator show={true} />)

        const indicator = screen.getByRole('status')
        expect(indicator).toHaveAttribute('role', 'status')
        expect(indicator).toHaveAttribute('aria-live', 'polite')
    })

    it('applies correct CSS classes based on show prop', () => {
        const { rerender } = render(<SaveIndicator show={false} />)

        // When show is false, component should not be in DOM
        expect(screen.queryByText(/saved/i)).not.toBeInTheDocument()

        // When show is true, component should be visible
        rerender(<SaveIndicator show={true} />)
        const indicator = screen.getByText(/saved/i)
        expect(indicator).toBeVisible()
    })
})
