import { memo, useCallback, useState } from 'react';

import './FormInput.css';

const FormInput = memo(({ handleAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
  });

  const handleHeaderChange = useCallback(evt => {
    setNewTask({ title: evt.target.value });
  }, []);

  return (
    <div className="form__input-wrapper">
      <input
        type="text"
        className="form__input"
        placeholder="Введите заголовок задачи"
        value={newTask.title}
        onChange={handleHeaderChange}
      />
      <button
        className="form__button button-hover"
        onClick={() => handleAddTask(newTask)}
        disabled={!newTask.title}
      >
        Добавить
      </button>
    </div>
  );
});

export default FormInput;
