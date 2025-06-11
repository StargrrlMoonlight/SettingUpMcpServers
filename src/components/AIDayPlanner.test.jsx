import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AIDayPlanner from './AIDayPlanner'

describe('AIDayPlanner Component', () => {
    it('renders the AI Day Planner with title and subtitle', () => {
        render(<AIDayPlanner />)

        expect(screen.getByText('Todays Program')).toBeInTheDocument()
        expect(screen.getByText('Delivered by your AI Assistant')).toBeInTheDocument()
    })

    it('displays the focused task', () => {
        render(<AIDayPlanner />)

        // Test for the focused task
        expect(screen.getByText('Fix bad UX on input row desktop')).toBeInTheDocument()
        expect(screen.getAllByText('HIGH')[0]).toBeInTheDocument()
    })

    it('displays the "Up Next" section with upcoming tasks', () => {
        render(<AIDayPlanner />)

        expect(screen.getByText('Up Next')).toBeInTheDocument()

        // Check for the upcoming tasks
        expect(screen.getByText('Review quarterly marketing strategy')).toBeInTheDocument()
        expect(screen.getByText('Prepare presentation for client meeting')).toBeInTheDocument()
        expect(screen.getByText('MEDIUM')).toBeInTheDocument()
    })
})
