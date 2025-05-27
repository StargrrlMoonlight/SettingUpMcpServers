import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import Header from './components/Header'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review quarterly reports', completed: false },
    { id: 2, text: 'Schedule client meeting', completed: true },
    { id: 3, text: 'Update project documentation', completed: false },
  ])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
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
    </div>
  )
}

export default App
