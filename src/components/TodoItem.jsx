import { useState } from 'react'
import './TodoItem.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium')
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '')

  // Check if task is overdue
  const isOverdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date().setHours(0, 0, 0, 0)

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, { 
        text: editText.trim(),
        priority: editPriority,
        dueDate: editDueDate || null
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setEditPriority(todo.priority || 'medium')
    setEditDueDate(todo.dueDate || '')
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
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`} data-priority={todo.priority || 'medium'}>
      <div className="todo-content">
        <button
          className="checkbox"
          role="checkbox"
          aria-checked={todo.completed}
          onClick={() => onToggle(todo.id)}
          aria-label={`Toggle ${todo.text}`}
        >
          {todo.completed && <span className="checkmark">✓</span>}
        </button>

        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              autoFocus
              placeholder="Task text"
            />
            <select
              className="edit-priority-select"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="date"
              className="edit-due-date-input"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
          </div>
        ) : (
          <div className="todo-info">
            <span
              className="todo-text"
              onClick={() => onToggle(todo.id)}
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </span>
            <div className="todo-meta">
              {todo.priority && (
                <span className={`priority-badge priority-${todo.priority}`}>
                  {todo.priority}
                </span>
              )}
              {todo.dueDate && (
                <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                  {isOverdue && ' (Overdue)'}
                </span>
              )}
            </div>
          </div>
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
              aria-label={`Edit ${todo.text}`}
            >
              ✎
            </button>
            <button
              className="delete-btn"
              onClick={() => onDelete(todo.id)}
              aria-label={`Delete ${todo.text}`}
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
