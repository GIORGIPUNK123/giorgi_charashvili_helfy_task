import { useState } from 'react';

export const TaskOptions = (props) => {
  const { filterOption, setFilterOption, sortOption, setSortOption } = props;

  return (
    <div className='task-options'>
      <h3>Options</h3>
      <div className='task-options-completed'>
        <button
          className={`all ${filterOption === 'all' ? 'active' : ''}`}
          onClick={() => setFilterOption('all')}
        >
          All
        </button>
        <button
          className={`pending ${filterOption === 'pending' ? 'active' : ''}`}
          onClick={() => setFilterOption('pending')}
        >
          Pending
        </button>
        <button
          className={`completed ${filterOption === 'completed' ? 'active' : ''}`}
          onClick={() => setFilterOption('completed')}
        >
          Completed
        </button>
      </div>
      <h4>Sort by</h4>

      <div className='task-options-sort'>
        <button
          className={`date ${sortOption === 'priority' ? 'active' : ''}`}
          onClick={() => setSortOption('priority')}
        >
          Priority
        </button>
        <button
          className={`priority ${sortOption === 'date' ? 'active' : ''}`}
          onClick={() => setSortOption('date')}
        >
          Date
        </button>
      </div>
    </div>
  );
};
