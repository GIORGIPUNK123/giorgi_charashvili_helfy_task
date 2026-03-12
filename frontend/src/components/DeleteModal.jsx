export const DeleteModal = (props) => {
  const { setIsOn, activeId, onDelete } = props;
  return (
    <div className='delete-modal'>
      <div
        className='close'
        onClick={() => {
          setIsOn(false);
        }}
      >
        X
      </div>
      <h2>Are you sure you want to delete this item?</h2>
      <div className='delete-modal-btns'>
        <button className='cancel' onClick={() => setIsOn(false)}>
          Cancel
        </button>
        <button className='delete' onClick={() => onDelete(activeId)}>
          Delete
        </button>
      </div>
    </div>
  );
};
