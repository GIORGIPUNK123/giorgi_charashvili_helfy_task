import { useState, useRef, useEffect } from 'react';
import { TaskItem } from './TaskItem';
import { TaskOptions } from './TaskOptions';
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from '../services/tasks';
import { Loading } from './Loading';
import { DeleteModal } from './DeleteModal';
import { TaskFormModal } from './TaskFormModal';
export const TaskList = () => {
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        alert('Failed to load tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      });
  }, []);
  const [filterOption, setFilterOption] = useState('all');
  const [sortOption, setSortOption] = useState('priority');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const scrollAmount = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setCurrentTaskIndex(0);
  }, [filterOption, sortOption]);
  const filteredTasks = tasks
    ? tasks
        .filter((task) => {
          if (filterOption === 'pending') return !task.completed;
          if (filterOption === 'completed') return task.completed;
          return true;
        })
        .sort((a, b) => {
          if (sortOption === 'priority') {
            const priorityMap = { high: 3, medium: 2, low: 1 };
            return priorityMap[b.priority] - priorityMap[a.priority];
          } else if (sortOption === 'createdAt') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }
        })
    : [];
  console.log('filteredTasks: ', filteredTasks);
  const isEnoughTasks = filteredTasks.length >= 3;
  const visibleTasks = Array.from({ length: 5 }, (_, i) => {
    const index =
      (currentTaskIndex - 1 + i + filteredTasks.length) % filteredTasks.length;
    return filteredTasks[index];
  });

  const nextTask = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('slide-up');

    setTimeout(() => {
      setCurrentTaskIndex((prev) => (prev + 1) % filteredTasks.length);
      setDirection('');
      setIsAnimating(false);
    }, 400);
  };

  const prevTask = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('slide-down');

    setTimeout(() => {
      setCurrentTaskIndex(
        (prev) => (prev - 1 + filteredTasks.length) % filteredTasks.length,
      );
      setDirection('');
      setIsAnimating(false);
    }, 400);
  };

  const handleWheel = (e) => {
    scrollAmount.current += e.deltaY;

    const threshold = 120;

    if (scrollAmount.current > threshold) {
      nextTask();
      scrollAmount.current = 0;
    }

    if (scrollAmount.current < -threshold) {
      prevTask();
      scrollAmount.current = 0;
    }
  };
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [isFormModalOn, setIsFormModalOn] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    deleteTask(id).catch(() => {
      alert('Failed to delete task');
      getTasks()
        .then((data) => {
          setTasks(data);
        })
        .catch((err) => {
          alert('Failed to load tasks');
          console.error('Error fetching tasks:', err);
        });
    });
    setIsDeleteModalOn(false);
  };
  const handleSave = ({ title, description, priority }) => {
    if (activeTask) {
      const updated = { ...activeTask, title, description, priority };
      setTasks((prev) =>
        prev.map((t) => (t.id === activeTask.id ? updated : t)),
      );
      updateTask({ id: activeTask.id, title, description, priority }).catch(
        () => {
          alert('Failed to update task');
          getTasks().then(setTasks).catch(console.error);
        },
      );
    } else {
      createTask({ title, description, priority })
        .then(() => getTasks().then(setTasks))
        .catch(() => alert('Failed to create task'));
    }
    setIsFormModalOn(false);
  };
  if (!tasks) {
    return <Loading />;
  } else
    return (
      <div className='task-list'>
        {isDeleteModalOn && (
          <DeleteModal
            setIsOn={setIsDeleteModalOn}
            activeId={activeId}
            onDelete={handleDelete}
          />
        )}
        {isFormModalOn && (
          <TaskFormModal
            setIsOn={setIsFormModalOn}
            task={activeTask}
            onSave={handleSave}
          />
        )}
        <div className='task-list-wrapper'>
          <button
            className='create-btn'
            onClick={() => {
              setActiveTask(null);
              setIsFormModalOn(true);
            }}
          >
            + New Task
          </button>
          <div className='task-list-left'>
            <div className='task-list-header'>
              <h2>Task List</h2>
            </div>
            {isEnoughTasks ? (
              <div className='carousel-wrapper' onWheel={handleWheel}>
                <div className={`carousel ${direction}`}>
                  {visibleTasks.map((task, i) => (
                    <TaskItem
                      key={`${task.id}-${i}`}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      completed={task.completed}
                      createdAt={task.createdAt}
                      onToggle={() => {
                        const oldTasks = tasks;
                        setTasks((prevTasks) =>
                          prevTasks.map((t) =>
                            t.id === task.id
                              ? { ...t, completed: !t.completed }
                              : t,
                          ),
                        );
                        toggleTask(task.id).catch(() => setTasks(oldTasks));
                      }}
                      onDelete={() => {
                        setIsDeleteModalOn(true);
                        setActiveId(task.id);
                      }}
                      onEdit={() => {
                        setActiveTask(task);
                        setIsFormModalOn(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              filteredTasks.map((task, i) => (
                <TaskItem
                  key={`${task.id}-${i}`}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  completed={task.completed}
                  createdAt={task.createdAt}
                  onToggle={() => {
                    const oldTasks = tasks;
                    setTasks((prevTasks) =>
                      prevTasks.map((t) =>
                        t.id === task.id
                          ? { ...t, completed: !t.completed }
                          : t,
                      ),
                    );
                    toggleTask(task.id).catch(() => setTasks(oldTasks));
                  }}
                  onDelete={() => {
                    setIsDeleteModalOn(true);
                    setActiveId(task.id);
                  }}
                  onEdit={() => {
                    setActiveTask(task);
                    setIsFormModalOn(true);
                  }}
                />
              ))
            )}

            {isEnoughTasks && (
              <div className='task-list-buttons'>
                <button
                  className='prev-btn'
                  disabled={isAnimating}
                  onClick={prevTask}
                >
                  Previous Task
                </button>
                <button
                  className='next-btn'
                  disabled={isAnimating}
                  onClick={nextTask}
                >
                  Next Task
                </button>
              </div>
            )}
          </div>
          <div className='task-list-right'>
            <TaskOptions
              filterOption={filterOption}
              setFilterOption={setFilterOption}
              sortOption={sortOption}
              setSortOption={setSortOption}
            />
          </div>
        </div>
      </div>
    );
};
