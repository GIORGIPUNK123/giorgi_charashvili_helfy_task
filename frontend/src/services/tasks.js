export const getTasks = async () => {
  const response = await fetch('http://localhost:4000/api/tasks');
  const data = await response.json();
  return data;
};
export const toggleTask = async (id) => {
  const response = await fetch(`http://localhost:4000/api/tasks/${id}/toggle`, {
    method: 'PATCH',
    // headers: {
    //   'Content-Type': 'application/json'
    // }
  });
  const data = await response.json();
  return data;
};
export const createTask = async ({ title, description, priority }) => {
  const response = await fetch(`http://localhost:4000/api/tasks`, {
    method: 'POST',
    body: JSON.stringify({ title, description, priority }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id) => {
  const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete task');
  }

  const data = await response.json();
  return data;
};

export const updateTask = async ({ id, title, description, priority }) => {
  const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, description, priority }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
};
