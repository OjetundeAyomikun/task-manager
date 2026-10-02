import { useContext, useRef, useState } from 'react';
import './AddTask.css';
import { TaskContext } from '../contexts/TaskContext';

export default function AddTask({ onCancel, type = 'Save', task }) {
    const titleRef = useRef();
    const descRef = useRef();
    const priorityRef = useRef();
    
    const { tasksObject = [], setTasksObject } = useContext(TaskContext);
    const [duplicate, setDuplicate] = useState(false);

    const onSave = () => {
        const titleValue = titleRef.current.value.trim();

        if (titleValue === "") {
            titleRef.current.style.border = '1px solid #ef4444';
            return;
        }

        const priorityValue = priorityRef.current.value;
        const priorityNum = priorityValue === 'High' ? 3 : priorityValue === 'Medium' ? 2 : 1;

        if (type === "Save") {
            const isTaskDuplicate = tasksObject.some(
                item => item.title.toLowerCase() === titleValue.toLowerCase()
            );

            if (isTaskDuplicate) {
                setDuplicate(true);
                return;
            }

            const newTask = {
                id: crypto.randomUUID(),
                title: titleValue,
                description: descRef.current.value.trim(),
                priority: priorityValue,
                priorityNumber: priorityNum,
                status: 'Progress'
            };

            
            setTasksObject(prev => [...prev, newTask]);
        } 

        if (type === 'Edit') {
            const updatedTask = {
                ...task,
                title: titleValue,
                description: descRef.current.value.trim(),
                priority: priorityValue,
                priorityNumber: priorityNum
            };

            setTasksObject(prev => 
                prev.map(item => item.id === task.id ? updatedTask : item)
            );
            
        }

        onCancel();
    };

    return (
  <div className="prompt-overlay" onClick={()=>onCancel()}>
    <div className="prompt" onClick={(e) => e.stopPropagation()}>
      <div className="title">
        <p>Task Title</p>
        <input 
          type="text" 
          placeholder="Enter task title" 
          ref={titleRef} 
          defaultValue={type === 'Edit' ? task?.title : ''}
          onChange={() => {
            if (duplicate) setDuplicate(false);
            titleRef.current.style.border = '1px solid var(--textColor)';
          }}
        />
        {duplicate && (
          <span style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#ef4444' }}>
            Cannot add duplicate task
          </span>
        )}
      </div>

      <div className="desc">
        <p>Description (optional)</p>
        <textarea 
          placeholder="Enter description" 
          ref={descRef} 
          defaultValue={type === 'Edit' ? task?.description : ''}
        ></textarea>
      </div>

      <div className="priority">
        <label htmlFor="priority">Priority</label>
        <select 
          name="priority" 
          id="priority" 
          ref={priorityRef} 
          defaultValue={type === 'Edit' ? task?.priority : 'Low'}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="buttons">
        <div className="save" role="button" tabIndex={0} onClick={onSave}>
          {type} Task
        </div>
        <div className="cancel" role="button" tabIndex={0} onClick={onCancel}>
          Cancel
        </div>
      </div>
    </div>
  </div>
);
}