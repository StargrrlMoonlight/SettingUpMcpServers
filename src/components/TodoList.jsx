import { useState } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import './TodoList.css'

function TodoList({ todos, onAddTodo, onToggleTodo, onDeleteTodo, onEditTodo }) {
  const [filter, setFilter] = useState('all') // all, active, completed

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

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

      <div className="todos-container">
        <ul className="todos-list" role="list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">
              <p>No tasks found</p>
            </li>
          ) : (
            filteredTodos.map(todo => (
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
