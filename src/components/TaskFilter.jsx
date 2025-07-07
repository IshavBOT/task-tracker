import React from 'react';

const TaskFilter = ({ current, setFilter, counts }) => {
  const filterOptions = [
    { key: 'All', icon: '📋', label: 'All Tasks' },
    { key: 'Pending', icon: '⏳', label: 'Pending' },
    { key: 'Completed', icon: '✅', label: 'Completed' }
  ];

  return (
    <div className="filters">
      {filterOptions.map(filter => (
        <button
          key={filter.key}
          onClick={() => setFilter(filter.key)}
          className={current === filter.key ? 'active' : ''}
          title={filter.label}
        >
          <span style={{ marginRight: '0.5rem' }}>{filter.icon}</span>
          {filter.label} ({counts[filter.key] || 0})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;

