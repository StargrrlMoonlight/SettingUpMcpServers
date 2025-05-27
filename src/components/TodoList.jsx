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

  return (
    <div className="todo-list">
      <AddTodo onAddTodo={onAddTodo} />
      
      <div className="todo-stats">
        <span className="stats-text">
          {activeCount} active, {completedCount} completed
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
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              onEdit={onEditTodo}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList
