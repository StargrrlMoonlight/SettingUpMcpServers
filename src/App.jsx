import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header'
import AIDayPlanner from './components/AIDayPlanner'
import SaveIndicator from './components/SaveIndicator'
import useLocalStorage from './hooks/useLocalStorage'
import { STORAGE_KEYS, clearAllData, exportData, importData } from './utils/localStorage'
import { useState, useEffect } from 'react'
import { ThemeContext } from './contexts/ThemeContext'

function App() {
  // State for save indicator
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)

  // Handle save callback to show indicator
  const handleSave = () => {
    setShowSaveIndicator(true)
  }

  // Check system preference for dark mode
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  // Theme state management with localStorage - now supports multiple themes
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, prefersDarkMode ? 'dark' : 'light', handleSave)

  // Default todos for new users or when localStorage is empty
  const defaultTodos = [
    { id: 1, text: 'Review quarterly reports', completed: false, priority: 'high', dueDate: null },
    { id: 2, text: 'Schedule client meeting', completed: true, priority: 'medium', dueDate: null },
    { id: 3, text: 'Update project documentation', completed: false, priority: 'low', dueDate: null },
  ]

  // Migration helper to ensure todos have the new fields
  const migrateTodos = (todos) => {
    return todos.map(todo => ({
      ...todo,
      priority: todo.priority || 'medium',
      dueDate: todo.dueDate || null
    }))
  }

  const [todos, setTodos] = useLocalStorage(STORAGE_KEYS.TODOS, defaultTodos, handleSave)

  // Apply migration when todos are loaded
  const migratedTodos = migrateTodos(todos)

  // Apply theme to document body
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Function to cycle through themes: light -> dark -> vibe -> light
  const cycleTheme = () => {
    setTheme(prevTheme => {
      switch (prevTheme) {
        case 'light': return 'dark'
        case 'dark': return 'vibe'
        case 'vibe': return 'light'
        default: return 'light'
      }
    })
  }

  const addTodo = (text, priority = 'medium', dueDate = null) => {
    // Generate a more unique ID using timestamp + random component
    const newTodo = {
      id: Date.now() + Math.random(),
      text,
      completed: false,
      priority,
      dueDate
    }
    setTodos([...migratedTodos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(migratedTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(migratedTodos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, updates) => {
    setTodos(migratedTodos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ))
  }

  // Development helpers - expose utilities to global scope in development
  if (import.meta.env.DEV) {
    window.todoUtils = {
      clearAllData,
      exportData,
      importData,
      getCurrentTodos: () => migratedTodos,
      help: () => {
        console.log(`
🔧 Executive Tasks Development Utilities:

• todoUtils.clearAllData() - Clear all stored data
• todoUtils.exportData() - Export current data as JSON
• todoUtils.importData(data) - Import data from JSON
• todoUtils.getCurrentTodos() - Get current todos array
• todoUtils.help() - Show this help

Example usage:
  todoUtils.clearAllData()
  const backup = todoUtils.exportData()
  todoUtils.importData(backup)
        `)
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      <div className="app">
        <div className="container">
          <Header />
          <AIDayPlanner />
          <TodoList
            todos={migratedTodos}
            onAddTodo={addTodo}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
        </div>
        <SaveIndicator
          show={showSaveIndicator}
          onHide={() => setShowSaveIndicator(false)}
        />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
