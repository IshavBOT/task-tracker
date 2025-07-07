import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, editingTask }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDesc(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Task title is required');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      onSubmit({ title: title.trim(), description: desc.trim() });
      setTitle('');
      setDesc('');
      setIsSubmitting(false);
    }, 300);
  };

  const handleCancel = () => {
    setTitle('');
    setDesc('');
    if (editingTask) {
      onSubmit(null); // Signal to cancel editing
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3 style={{ marginTop: 0, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        {editingTask ? 'Edit Task' : 'Add New Task'}
      </h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="task-title">Task Title *</label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            required
            autoFocus={editingTask}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <input
            id="task-description"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Enter task description (optional)..."
          />
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
        {editingTask && (
          <button 
            type="button" 
            className="btn-secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button 
          type="submit" 
          className="btn-primary"
          disabled={isSubmitting || !title.trim()}
        >
          {isSubmitting ? (
            <>
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 12 12"
                    to="360 12 12"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
              {editingTask ? 'Updating...' : 'Adding...'}
            </>
          ) : (
            <>
              <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              {editingTask ? 'Update Task' : 'Add Task'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
