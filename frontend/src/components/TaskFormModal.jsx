import { useState } from 'react';

export const TaskFormModal = (props) => {
  const { setIsOn, task, onSave } = props;
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [priority, setPriority] = useState(task?.priority ?? 'medium');

  const isEdit = task != null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: description.trim(), priority });
  };

  return (
    <div className='task-form-modal'>
      <div className='close' onClick={() => setIsOn(false)}>
        X
      </div>
      <h2>{isEdit ? 'Edit Task' : 'New Task'}</h2>
      <form className='task-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task title'
            required
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Task description'
            rows={3}
          />
        </div>
        <div className='form-group'>
          <label>Priority</label>
          <div className='priority-selector'>
            {['low', 'medium', 'high'].map((p) => (
              <button
                type='button'
                key={p}
                className={`priority-opt ${p} ${priority === p ? 'active' : ''}`}
                onClick={() => setPriority(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className='task-form-modal-btns'>
          <button
            type='button'
            className='cancel'
            onClick={() => setIsOn(false)}
          >
            Cancel
          </button>
          <button type='submit' className='save'>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};
