import { useState } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import './TodoList.css'

function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo, onEditTodo }) {
  const [filter, setFilter] = useState('all') // all, active, completed
  const [sortBy, setSortBy] = useState('created') // created, priority, dueDate, alphabetical

  const sortTodos = (todos) => {
    const sortedTodos = [...todos]
    
    switch (sortBy) {
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return sortedTodos.sort((a, b) => {
          const aPriority = priorityOrder[a.priority] || 2
          const bPriority = priorityOrder[b.priority] || 2
          return bPriority - aPriority // High priority first
        })
      }
      
      case 'dueDate':
        return sortedTodos.sort((a, b) => {
          // Tasks without due dates go last
          if (!a.dueDate && !b.dueDate) return 0
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        })
      
      case 'alphabetical':
        return sortedTodos.sort((a, b) => a.text.localeCompare(b.text))
      
      case 'created':
      default:
        return sortedTodos.sort((a, b) => b.id - a.id) // Newest first
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const sortedAndFilteredTodos = sortTodos(filteredTodos)

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.length - completedCount

  const completionPercentage = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0

  return (
    <main className="todo-list" role="main">
      <AddTodo onAddTodo={onAddTodo} />

      <div className="todo-stats">
        <span className="stats-text">
          {activeCount} active, {completedCount} completed ({completionPercentage}%)
        </span>
      </div>

      <div className="controls-row">
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        <div className="sort-controls">
          <label htmlFor="sort-select" className="sort-label">Sort by:</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created">Created</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>

      <div className="todos-container">
        <ul className="todos-list" role="list">
          {sortedAndFilteredTodos.length === 0 ? (
            <li className="empty-state">
              <p>No tasks found</p>
            </li>
          ) : (
            sortedAndFilteredTodos.map(todo => (
              <li key={todo.id} role="listitem">
                <TodoItem
                  todo={todo}
                  onToggle={onToggleTodo}
                  onDelete={onDeleteTodo}
                  onEdit={onEditTodo}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  )
}

export default TodoList
