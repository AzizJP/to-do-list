import { memo, useCallback, useState } from 'react';

import './FormInput.css';

const FormInput = memo(({ handleAddTask }) => {
  const [newTask, setNewTask] = useState({
    title: '',
  });

  const handleHeaderChange = useCallback(evt => {
    setNewTask({ title: evt.target.value });
  }, []);

  const handleSubmit = useCallback(
    evt => {
      evt.preventDefault();
      handleAddTask(newTask);
      setNewTask({ title: '' });
    },
    [newTask]
  );

  return (
    <form className="form__input-wrapper" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form__input"
        placeholder="Введите заголовок задачи"
        value={newTask.title}
        onChange={handleHeaderChange}
      />
      <button
        className="form__button button-hover"
        onClick={handleSubmit}
        disabled={!newTask.title}
      >
        Добавить
      </button>
    </form>
  );
});

export default FormInput;
