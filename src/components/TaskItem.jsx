import React from 'react';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-title">
          {task.title}
        </div>
        {task.description && (
          <div className="task-description">
            {task.description}
          </div>
        )}
        <div className="task-meta">
          <svg style={{ width: '14px', height: '14px', marginRight: '0.25rem' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
          {formatDate(task.createdAt)}
        </div>
      </div>
      
      <div className="task-actions">
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id)}
            style={{ marginRight: '0.5rem' }}
          />
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
            {task.completed ? 'Done' : 'Mark as done'}
          </span>
        </label>
        
        <button 
          className="btn-secondary btn-sm"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        
        <button 
          className="btn-danger btn-sm"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3,6 5,6 21,6"/>
            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
