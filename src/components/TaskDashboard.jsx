import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { getTasks, saveTasks } from '../utils/localStorage';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState(getTasks());
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleAddOrEdit = (data) => {
    if (data === null) {
      // Cancel editing
      setEditingTask(null);
      return;
    }
    
    if (editingTask) {
      setTasks(prev =>
        prev.map(t => (t.id === editingTask.id ? { ...t, ...data } : t))
      );
      setEditingTask(null);
    } else {
      setTasks(prev => [
        ...prev,
        { ...data, id: Date.now(), completed: false, createdAt: new Date().toISOString() }
      ]);
    }
  };

  const handleToggle = (id) =>
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?'))
      setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('username');
      navigate('/');
    }
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true :
    filter === 'Completed' ? task.completed :
    !task.completed
  );

  const countTasks = {
    All: tasks.length,
    Completed: tasks.filter(t => t.completed).length,
    Pending: tasks.filter(t => !t.completed).length
  };

  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {username}! 👋</h2>
          <p className="welcome-text">Manage your tasks and stay organized</p>
        </div>
        <button 
          className="btn-secondary btn-sm"
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{countTasks.All}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--accent-color)' }}>
            {countTasks.Completed}
          </div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--warning-color)' }}>
            {countTasks.Pending}
          </div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: 'var(--primary-color)' }}>
            {countTasks.All > 0 ? Math.round((countTasks.Completed / countTasks.All) * 100) : 0}%
          </div>
          <div className="stat-label">Progress</div>
        </div>
      </div>

      <TaskForm onSubmit={handleAddOrEdit} editingTask={editingTask} />
      <TaskFilter current={filter} setFilter={setFilter} counts={countTasks} />
      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggle}
        onEdit={setEditingTask}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TaskDashboard;
