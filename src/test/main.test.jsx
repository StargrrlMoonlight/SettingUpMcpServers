import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'

// Mock ReactDOM
vi.mock('react-dom/client', () => ({
    createRoot: vi.fn(() => ({
        render: vi.fn()
    }))
}))

// Mock App component
vi.mock('../App.jsx', () => ({
    default: function MockedApp() {
        return 'MockedApp'
    }
}))

describe('main.jsx', () => {
    let mockRoot
    let mockElement

    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks()

        // Create mock DOM element
        mockElement = {
            id: 'root'
        }

        // Create mock root
        mockRoot = {
            render: vi.fn()
        }

        // Mock document.getElementById
        vi.spyOn(document, 'getElementById').mockReturnValue(mockElement)

        // Mock createRoot to return our mock
        createRoot.mockReturnValue(mockRoot)

        // Reset module cache
        vi.resetModules()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('creates root with correct element', async () => {
        // Import main.jsx to trigger the execution
        await import('../main.jsx')

        expect(document.getElementById).toHaveBeenCalledWith('root')
        expect(createRoot).toHaveBeenCalledWith(mockElement)
    })

    it('renders App in StrictMode', async () => {
        // Clear the module cache to ensure fresh import
        vi.doUnmock('../main.jsx')

        await import('../main.jsx')

        expect(mockRoot.render).toHaveBeenCalledTimes(1)

        // Get the rendered element
        const renderedElement = mockRoot.render.mock.calls[0][0]

        // Check that it's StrictMode
        expect(renderedElement.type).toBe(StrictMode)

        // Check that StrictMode contains the mocked App
        expect(renderedElement.props.children.type.name).toBe('MockedApp')
    })

    it('handles missing root element gracefully', async () => {
        // Mock getElementById to return null
        document.getElementById.mockReturnValue(null)

        // Should throw when root element is missing
        await expect(async () => {
            await import('../main.jsx')
        }).rejects.toThrow('Root element not found')
    })
})
