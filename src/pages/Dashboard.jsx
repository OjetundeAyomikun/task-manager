import { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import Task from '../components/Task';
import AddTask from '../components/AddTask';
import './Dashboard.css';

export default function Dashboard() {
    const { tasksObject, userName } = useContext(TaskContext);
    const [editingTask, setEditingTask] = useState(null);

    const inProgressCount = tasksObject.filter(task => task.status === 'Progress').length;
    const completedCount = tasksObject.filter(task => task.status === 'Completed').length;

    return (
        <div className="dashboard-container">
            <div className="task-summary">
                <h2 style={{ color: 'var(--textColor)', fontStyle: 'italic' }}>Hello, { userName || 'User'}</h2>
                <p style={{color: 'var(--textColor)'}}>Here is your task summary for today</p>
                <div className="task-status">
                    <div className="task-pending">
                        <span className="task-number">
                            {inProgressCount} 
                        </span>
                        <span className="task-type">In Progress</span>
                    </div>
                    <div className="task-completed">
                        <span className="task-number">
                            {completedCount} 
                        </span>
                        <span className="task-type">Completed</span>
                    </div>
                </div>
            </div>
            
            <p className='p' style={{ color: 'var(--textColor)', fontWeight: 500, marginBottom: '0.5rem' }}>Tasks</p>
            <div className="tasks">
                {tasksObject.length > 0 ? (
                    tasksObject.map(task => (
                        <Task 
                            task={task} 
                            key={task.id} 
                            onEditRequest={() => setEditingTask(task)} 
                        />
                    ))
                ) : (
                    <span style={{ fontStyle: 'italic', fontWeight: 'lighter', color: 'var(--textColor)', padding: '1rem' }}>
                        No recent tasks...
                    </span>
                )}
            </div>

            {/* Standalone Edit Modal rendered cleanly at the root level */}
            {editingTask && (
                <AddTask 
                    type="Edit" 
                    task={editingTask} 
                    onCancel={() => setEditingTask(null)} 
                />
            )}
        </div>      
    );
}