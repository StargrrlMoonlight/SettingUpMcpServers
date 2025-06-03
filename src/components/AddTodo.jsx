import { useState } from 'react'
import './AddTodo.css'

function AddTodo({ onAddTodo }) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim(), priority, dueDate || null)
      setText('')
      setPriority('medium')
      setDueDate('')
    }
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit} role="form">
      <div className="add-todo-row">
        <input
          type="text"
          className="add-todo-input"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Add new task"
        />
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          aria-label="Task priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          className="due-date-input"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          aria-label="Due date"
        />
        <button type="submit" className="add-todo-btn">
          Add Task
        </button>
      </div>
    </form>
  )
}

export default AddTodo
