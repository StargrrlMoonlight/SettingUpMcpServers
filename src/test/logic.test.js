import { describe, it, expect } from 'vitest'

describe('Overdue Detection Logic', () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const todayString = today.toISOString().split('T')[0]
  
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayString = yesterday.toISOString().split('T')[0]
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowString = tomorrow.toISOString().split('T')[0]

  describe('isOverdue function logic', () => {
    const isOverdue = (todo) => {
      return todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date().setHours(0, 0, 0, 0)
    }

    it('returns true for past due dates on incomplete tasks', () => {
      const todo = {
        id: 1,
        text: 'Past due task',
        completed: false,
        dueDate: yesterdayString
      }

      expect(isOverdue(todo)).toBe(true)
    })

    it('returns false for future due dates', () => {
      const todo = {
        id: 1,
        text: 'Future task',
        completed: false,
        dueDate: tomorrowString
      }

      expect(isOverdue(todo)).toBe(false)
    })

    it('returns false for tasks due today', () => {
      const todo = {
        id: 1,
        text: 'Task due today',
        completed: false,
        dueDate: todayString
      }

      expect(isOverdue(todo)).toBe(false)
    })

    it('returns false for completed tasks even if past due', () => {
      const todo = {
        id: 1,
        text: 'Completed past due task',
        completed: true,
        dueDate: yesterdayString
      }

      expect(isOverdue(todo)).toBe(false)
    })

    it('returns false for tasks without due dates', () => {
      const todo = {
        id: 1,
        text: 'Task without due date',
        completed: false,
        dueDate: null
      }

      expect(isOverdue(todo)).toBe(false)
    })

    it('returns false for tasks with empty string due dates', () => {
      const todo = {
        id: 1,
        text: 'Task with empty due date',
        completed: false,
        dueDate: ''
      }

      expect(isOverdue(todo)).toBe(false)
    })
  })

  describe('Date formatting', () => {
    it('formats dates correctly for display', () => {
      const testDate = '2024-12-31'
      const formatted = new Date(testDate).toLocaleDateString()
      
      expect(formatted).toMatch(/12\/31\/2024|31\/12\/2024|2024-12-31/)
    })

    it('handles invalid dates gracefully', () => {
      const invalidDate = 'invalid-date'
      const date = new Date(invalidDate)
      
      expect(isNaN(date.getTime())).toBe(true)
    })
  })
})

describe('Sorting Logic', () => {
  const todos = [
    { id: 1, text: 'High task', priority: 'high', dueDate: '2024-12-25' },
    { id: 2, text: 'Low task', priority: 'low', dueDate: '2024-12-20' },
    { id: 3, text: 'Medium task', priority: 'medium', dueDate: '2024-12-30' },
    { id: 4, text: 'Another high', priority: 'high', dueDate: null },
    { id: 5, text: 'Another medium', priority: 'medium', dueDate: '2024-12-15' }
  ]

  describe('priority sorting', () => {
    it('sorts by priority correctly (high > medium > low)', () => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const sorted = [...todos].sort((a, b) => {
        const aPriority = priorityOrder[a.priority] || 2
        const bPriority = priorityOrder[b.priority] || 2
        return bPriority - aPriority
      })

      expect(sorted[0].priority).toBe('high')
      expect(sorted[1].priority).toBe('high')
      expect(sorted[2].priority).toBe('medium')
      expect(sorted[3].priority).toBe('medium')
      expect(sorted[4].priority).toBe('low')
    })
  })

  describe('due date sorting', () => {
    it('sorts by due date correctly (earliest first, null dates last)', () => {
      const sorted = [...todos].sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })

      expect(sorted[0].dueDate).toBe('2024-12-15')
      expect(sorted[1].dueDate).toBe('2024-12-20')
      expect(sorted[2].dueDate).toBe('2024-12-25')
      expect(sorted[3].dueDate).toBe('2024-12-30')
      expect(sorted[4].dueDate).toBe(null)
    })
  })

  describe('alphabetical sorting', () => {
    it('sorts by text alphabetically', () => {
      const sorted = [...todos].sort((a, b) => a.text.localeCompare(b.text))

      expect(sorted[0].text).toBe('Another high')
      expect(sorted[1].text).toBe('Another medium')
      expect(sorted[2].text).toBe('High task')
      expect(sorted[3].text).toBe('Low task')
      expect(sorted[4].text).toBe('Medium task')
    })
  })
})