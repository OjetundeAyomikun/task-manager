import { FaEllipsis } from "react-icons/fa6";
import { FaCheckCircle, FaCircle, FaPen, FaTrashAlt, FaClock, FaFlag, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import './Task.css';
import { Notification } from "./Notification";

export default function Task({ task, onEditRequest }) {
    const [showOptions, setShowOptions] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [toastNotification, setToastNotification] = useState('');
    
    const taskArr = useContext(TaskContext);

    const handleDelete = () => {
        setShowOptions(false);
        setToastNotification('Task deleted successfully!');
        setTimeout(() => {

            taskArr.setTasksObject(prev => prev.filter(item => item.id !== task.id));
        }, 700)
    };

    const handleEdit = () => {
        setShowOptions(false);
        if (onEditRequest) onEditRequest();
    };

    const handleToggleComplete = () => {
        setShowOptions(false);
        const newStatus = task.status === 'Progress' ? 'Completed' : 'Progress';
        setToastNotification(`Task marked as ${newStatus.toLowerCase()}!`);
        
        taskArr.setTasksObject(prev => 
            prev.map(item => item.id === task.id ? { ...item, status: newStatus } : item)
        );
    };

    const isCompleted = task.status === 'Completed';

    return (
        <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
            <Notification message={toastNotification} onClose={() => setToastNotification('')} />
            <div className="task-header">
                <div 
                    className="task-title-wrapper" 
                    onClick={() => setShowDesc(prev => !prev)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowDesc(prev => !prev)}
                >
                    <p className="task-title">{task.title}</p>
                    <span className="expand-icon">
                        {showDesc ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                </div>

                <div 
                    className="options-btn" 
                    role="button"
                    tabIndex={0}
                    onClick={() => setShowOptions(prev => !prev)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowOptions(prev => !prev)}
                    aria-label="Task options"
                >
                    <FaEllipsis />
                </div>

                {showOptions && (
                    <div className="options-dropdown">
                        <div 
                            className="option-item" 
                            role="button"
                            tabIndex={0}
                            onClick={handleEdit}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleEdit()}
                        >
                            <FaPen /> Edit
                        </div>

                        <div 
                            className="option-item" 
                            role="button"
                            tabIndex={0}
                            onClick={handleToggleComplete}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleToggleComplete()}
                        >
                            {isCompleted ? <FaCircle /> : <FaCheckCircle />}
                            {isCompleted ? ' Mark Incomplete' : ' Mark Complete'}
                        </div>

                        <div 
                            className="option-item delete" 
                            role="button"
                            tabIndex={0}
                            onClick={handleDelete}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDelete()}
                        >
                            <FaTrashAlt /> Delete
                        </div>
                    </div>
                )}
            </div>

            
            {showDesc && (
                <div className="task-desc">
                    {task.description || "No additional details provided."}
                </div>
            )}

            
            <div className="task-details">
                {task.priority && (
                    <span className="badge priority" data-priority={task.priority.toLowerCase()}>
                        <FaFlag className="badge-icon" /> {task.priority}
                    </span>
                )}

                <span className="badge status" data-status={task.status ? task.status.toLowerCase() : 'progress'}>
                    {task.status || 'Progress'}
                </span>

                {task.dueDate && (
                    <span className="badge due-date">
                        <FaClock className="badge-icon" /> {task.dueDate}
                    </span>
                )}
            </div>
        </div>
    );
}