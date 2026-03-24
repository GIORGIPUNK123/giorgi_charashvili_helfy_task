import { TaskList } from './components/TaskList';

export const App = () => {
  return (
    <div className='main'>
      <h1 className='heading'>Task Manager</h1>
      <TaskList />
    </div>
  );
};
