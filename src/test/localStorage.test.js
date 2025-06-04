import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getStoredData, setStoredData, STORAGE_KEYS } from '../utils/localStorage'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

describe('localStorage utilities', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getStoredData', () => {
    it('returns parsed data from localStorage', () => {
      const mockData = [
        { id: 1, text: 'Test todo', completed: false, priority: 'high', dueDate: '2024-12-31' }
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData))

      const result = getStoredData(STORAGE_KEYS.TODOS, [])

      expect(localStorageMock.getItem).toHaveBeenCalledWith(STORAGE_KEYS.TODOS)
      expect(result).toEqual(mockData)
    })

    it('returns fallback when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null)
      const fallback = []

      const result = getStoredData(STORAGE_KEYS.TODOS, fallback)

      expect(result).toBe(fallback)
    })

    it('returns fallback when JSON parsing fails', () => {
      localStorageMock.getItem.mockReturnValue('invalid json')
      const fallback = []
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = getStoredData(STORAGE_KEYS.TODOS, fallback)

      expect(result).toBe(fallback)
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('setStoredData', () => {
    it('stores data in localStorage as JSON', () => {
      const mockData = [
        { id: 1, text: 'Test todo', completed: false, priority: 'high', dueDate: '2024-12-31' }
      ]

      setStoredData(STORAGE_KEYS.TODOS, mockData)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.TODOS,
        JSON.stringify(mockData)
      )
    })

    it('handles storage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      setStoredData(STORAGE_KEYS.TODOS, [])

      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })
  })

  describe('todo data structure persistence', () => {
    it('persists complete todo structure with new fields', () => {
      const todos = [
        {
          id: 1,
          text: 'High priority task',
          completed: false,
          priority: 'high',
          dueDate: '2024-12-31'
        },
        {
          id: 2,
          text: 'Completed medium task',
          completed: true,
          priority: 'medium',
          dueDate: '2024-12-25'
        },
        {
          id: 3,
          text: 'Low priority task without due date',
          completed: false,
          priority: 'low',
          dueDate: null
        }
      ]

      setStoredData(STORAGE_KEYS.TODOS, todos)

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.TODOS,
        JSON.stringify(todos)
      )

      // Simulate retrieval
      localStorageMock.getItem.mockReturnValue(JSON.stringify(todos))
      const retrieved = getStoredData(STORAGE_KEYS.TODOS, [])

      expect(retrieved).toEqual(todos)
      expect(retrieved[0]).toHaveProperty('priority', 'high')
      expect(retrieved[0]).toHaveProperty('dueDate', '2024-12-31')
      expect(retrieved[2]).toHaveProperty('dueDate', null)
    })
  })
})