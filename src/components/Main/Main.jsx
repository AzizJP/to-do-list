import { memo, useCallback, useState } from 'react';
import FormInput from '../Shared/FormInput/FormInput';

import './Main.css';
import Task from './Task/Task';

const Main = memo(() => {
  const [taskCards, setTaskCards] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  const handleAddTask = useCallback(
    newTask => {
      const newState = [
        ...taskCards,
        { ...newTask, id: `${Math.random()}` },
      ];
      setTaskCards(newState);
      localStorage.setItem('tasks', JSON.stringify(newState));
    },
    [taskCards]
  );

  const handleDeleteTask = useCallback(
    id => {
      const copyTasks = [...taskCards];
      const taskIndex = copyTasks.findIndex(el => el.id === id);
      copyTasks.splice(taskIndex, 1);
      setTaskCards(copyTasks);
      localStorage.setItem('tasks', JSON.stringify(copyTasks));
    },
    [taskCards]
  );

  return (
    <main className="main">
      <section className="main__container">
        <FormInput handleAddTask={handleAddTask} />
        <div className="main__tasks">
          {taskCards.map(task => (
            <Task
              task={task}
              key={task.id}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </section>
    </main>
  );
});

export default Main;
