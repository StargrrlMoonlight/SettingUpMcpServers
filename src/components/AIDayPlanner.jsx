import { useState } from 'react'
import './AIDayPlanner.css'

/**
 * AI Assistant Day Planner component
 * Displays prioritized tasks with focused task at the top and upcoming tasks below
 */
function AIDayPlanner() {
    // In a real implementation, these would come from props or a context
    // For now using static data as per requirements
    const [tasks] = useState([
        {
            id: 1,
            text: 'Fix bad UX on input row desktop',
            priority: 'HIGH',
            completed: false
        },
        {
            id: 2,
            text: 'Review quarterly marketing strategy',
            priority: 'HIGH',
            completed: false
        },
        {
            id: 3,
            text: 'Prepare presentation for client meeting',
            priority: 'MEDIUM',
            completed: false
        }
    ])

    // Get the focused task (first in the list) and upcoming tasks (rest)
    const focusedTask = tasks.length > 0 ? tasks[0] : null
    const upcomingTasks = tasks.slice(1)

    return (
        <div className="ai-planner">
            <h2 className="ai-planner-title">Todays Program</h2>
            <p className="ai-planner-subtitle">Delivered by your AI Assistant</p>

            {/* Focused Task */}
            {focusedTask && (
                <div className="focused-task">
                    <span className={`priority-badge priority-${focusedTask.priority.toLowerCase()}`}>
                        {focusedTask.priority}
                    </span>
                    <p className="task-text">{focusedTask.text}</p>
                </div>
            )}

            {/* Upcoming Tasks */}
            {upcomingTasks.length > 0 && (
                <>
                    <h3 className="upcoming-tasks-title">Up Next</h3>

                    {upcomingTasks.map((task) => (
                        <div key={task.id} className="upcoming-task">
                            <p className="task-text">{task.text}</p>
                            <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                                {task.priority}
                            </span>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default AIDayPlanner
