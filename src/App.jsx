import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header'
import SaveIndicator from './components/SaveIndicator'
import useLocalStorage from './hooks/useLocalStorage'
import { STORAGE_KEYS, clearAllData, exportData, importData } from './utils/localStorage'
import { useState } from 'react'

function App() {
  // State for save indicator
  const [showSaveIndicator, setShowSaveIndicator] = useState(false)

  // Default todos for new users or when localStorage is empty
  const defaultTodos = [
    { id: 1, text: 'Review quarterly reports', completed: false },
    { id: 2, text: 'Schedule client meeting', completed: true },
    { id: 3, text: 'Update project documentation', completed: false },
  ]

  // Handle save callback to show indicator
  const handleSave = () => {
    setShowSaveIndicator(true)
  }

  const [todos, setTodos] = useLocalStorage(STORAGE_KEYS.TODOS, defaultTodos, handleSave)

  const addTodo = (text) => {
    // Generate a more unique ID using timestamp + random component
    const newTodo = {
      id: Date.now() + Math.random(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  // Development helpers - expose utilities to global scope in development
  if (process.env.NODE_ENV === 'development') {
    window.todoUtils = {
      clearAllData,
      exportData,
      importData,
      getCurrentTodos: () => todos,
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
    <div className="app">
      <div className="container">
        <Header />
        <TodoList
          todos={todos}
          onAddTodo={addTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </div>
      <SaveIndicator isVisible={showSaveIndicator} />
    </div>
  )
}

export default App
