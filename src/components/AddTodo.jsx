import { useState } from 'react'
import './AddTodo.css'

function AddTodo({ onAddTodo }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim())
      setText('')
    }
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit} role="form">
      <input
        type="text"
        className="add-todo-input"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Add new task"
      />
      <button type="submit" className="add-todo-btn">
        Add Task
      </button>
    </form>
  )
}

export default AddTodo
