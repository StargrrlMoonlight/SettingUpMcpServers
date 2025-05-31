import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          className="checkbox"
          role="checkbox"
          aria-checked={todo.completed}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <span className="checkmark">✓</span>}
        </button>

        {isEditing ? (
          <>
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
            />
          </>
        ) : (
          <span
            className="todo-text"
            onClick={() => onToggle(todo.id)}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              className="save-btn"
              onClick={handleSave}
              aria-label="Save"
            >
              Save
            </button>
            <button
              className="cancel-btn"
              onClick={handleCancel}
              aria-label="Cancel"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
              aria-label="Edit task"
            >
              ✎
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
              aria-label="Delete task"
            >
              ×
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default TodoItem
