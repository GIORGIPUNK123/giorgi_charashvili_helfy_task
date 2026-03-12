import { toggleTask } from '../services/tasks';

export const TaskItem = (props) => {
  const {
    id,
    title,
    description,
    priority,
    completed,
    createdAt,
    onToggle,
    onDelete,
    onEdit,
  } = props;
  return (
    <div className={`task-item ${completed ? 'completed' : ''}`} key={id}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={`priority ${priority}`}>{priority}</div>
      <div className='task-item-buttons-wrapper'>
        <button
          onClick={onToggle}
          className={`toggle-btn ${completed ? 'completed' : ''}`}
        >
          {completed ? '✓' : '○'}
        </button>
        <div className='task-item-buttons-right'>
          <button className='edit-btn' onClick={onEdit}>
            Edit
          </button>
          <button className='delete-btn' onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
