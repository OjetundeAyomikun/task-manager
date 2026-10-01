import { FaPlus } from 'react-icons/fa6'
import Task from '../components/Task'
import './Tasks.css'
import AddTask from '../components/AddTask'
import { useContext, useEffect, useMemo, useState } from 'react'
import { TaskContext } from '../contexts/TaskContext'

export default function Tasks() {
    const { tasksObject: TaskList = [] } = useContext(TaskContext);
    
    
    const [activeFilter, setActiveFilter] = useState('All'); 
    const [addNewTask, setAddNewTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    
    useEffect(() => {
        if (TaskList.length > 0) {
            localStorage.setItem('Tasks', JSON.stringify(TaskList));
        } else {
            localStorage.setItem('Tasks', JSON.stringify([]));
        }
    }, [TaskList]);

    
    const displayedTasks = useMemo(() => {
        if (activeFilter === 'Progress') {
            return TaskList.filter(task => task.status === 'Progress');
        }
        if (activeFilter === 'Completed') {
            return TaskList.filter(task => task.status === 'Completed');
        }
        if (activeFilter === 'Priority') {
            return [...TaskList].sort((a, b) => (b.priorityNumber) - (a.priorityNumber));
        }
        return TaskList;
    }, [TaskList, activeFilter]);

    
    const progressCount = TaskList.filter(t => t.status === 'Progress').length;
    const completedCount = TaskList.filter(t => t.status === 'Completed').length;

    return (
        <div className='tasks-container' >
            <div className="filters">
                <div 
                    className={`filter ${activeFilter === 'All' ? 'active' : ''}`}
                    style={{'--c': 'var(--textColor)'}}
                    onClick={() => setActiveFilter('All')}
                >
                    All <span className="task-number" style={{background: 'var(--textColor)'}}>{TaskList.length}</span>
                </div>

                <div 
                    className={`filter ${activeFilter === 'Progress' ? 'active' : ''}`}
                    style={{'--c': 'var(--progress)'}}
                    onClick={() => setActiveFilter('Progress')}
                >
                    In Progress <span className="task-number" style={{background: 'var(--progress)'}}>{progressCount}</span>
                </div>

                <div 
                    className={`filter ${activeFilter === 'Completed' ? 'active' : ''}`}
                    style={{'--c': 'var(--complete)'}}
                    onClick={() => setActiveFilter('Completed')}
                >
                    Complete <span className="task-number" style={{background: 'var(--complete)'}}>{completedCount}</span>
                </div>

                <div 
                    className={`filter ${activeFilter === 'Priority' ? 'active' : ''}`}
                    style={{'--c': 'var(--textColor)'}}
                    onClick={() => setActiveFilter('Priority')}
                >
                    Priority
                </div>
            </div>

            <div className="displayTaskBox">
                {displayedTasks.length > 0 ? (
                    displayedTasks.map(task => (
                        <Task 
                            task={task} 
                            key={task.id} 
                            onEditRequest={() => setEditingTask(task)} 
                        />
                    ))
                ) : (
                    <span style={{fontStyle: 'italic', color: 'var(--textColor)', opacity: '0.6'}}>
                        No tasks found
                    </span>
                )}
            </div>

            
            <div 
                className="add"
                onClick={() => setAddNewTask(true)}
                style={{
                    padding: '0.75rem', 
                    borderRadius: '1rem', 
                    background: 'var(--textColor)', 
                    color: 'var(--color)', 
                    fontSize: '1.5rem', 
                    position: 'absolute', 
                    bottom: '10%', 
                    right: '3%', 
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
            >
                <FaPlus />
            </div>

           
            {addNewTask && (
                <AddTask 
                    onCancel={() => setAddNewTask(false)} 
                    type="Save" 
                />
            )}

            
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