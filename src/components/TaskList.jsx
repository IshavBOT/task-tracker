import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, ...actions }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"/>
          <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"/>
          <path d="M12 3c0 1-1 2-2 2s-2-1-2-2 1-2 2-2 2 1 2 2z"/>
          <path d="M12 21c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z"/>
        </svg>
        <h3>No tasks found</h3>
        <p>Get started by adding your first task above!</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} {...actions} />
      ))}
    </div>
  );
};

export default TaskList;
