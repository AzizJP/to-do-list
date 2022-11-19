import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import ToggleCheckbox from '../../Shared/ToggleCheckbox/ToggleCheckbox';

import './Task.css';

dayjs.extend(calendar);

const Task = memo(({ task, handleDeleteTask }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: '',
    id: '',
    completed: false,
    ...task,
  });
  const [canEdit, setCanEdit] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);

  const handleTaskEdit = useCallback(newState => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks.findIndex(el => el.id === formState.id);
    const kek = [...tasks];
    kek.splice(taskIndex, 1, newState);
    localStorage.setItem('tasks', JSON.stringify(kek));
  }, []);

  const handleCompleteButtonClick = useCallback(() => {
    const newState = {
      ...formState,
      completed: !formState.completed,
    };
    setFormState(newState);
    handleTaskEdit(newState);
  }, [formState, handleTaskEdit]);

  const handleEditButtonClick = useCallback(() => {
    setCanEdit(!canEdit);
  }, [canEdit]);

  useEffect(() => {
    const today = dayjs(
      dayjs().calendar(dayjs('DD/MM/YYYY'))
    ).valueOf();
    const taskCompleteDate = dayjs(formState.date).valueOf();
    setIsTimeOut(today > taskCompleteDate);
  }, [formState.date]);

  const handleDateChange = useCallback(
    evt => {
      setFormState({ ...formState, date: evt.target.value });
    },
    [formState]
  );

  const handleTextChange = useCallback(
    evt => {
      setFormState({ ...formState, description: evt.target.value });
    },
    [formState]
  );

  const handleConfirm = useCallback(() => {
    handleTaskEdit(formState);
    handleEditButtonClick();
  }, [handleEditButtonClick, handleTaskEdit, formState]);

  const formClassName = useMemo(() => {
    let className = 'task';
    if (formState.completed) {
      return (className += ' task_completed');
    }
    if (isTimeOut) {
      return (className += ' task_time-out');
    }
    return className;
  }, [formState, isTimeOut]);

  const taskTitle = useMemo(() => {
    let res = formState.title;
    if (formState.completed) {
      return (res += ' Задача выполнена!');
    }
    if (isTimeOut) {
      return (res += ' К сожалению, время вышло!');
    }
    return res;
  }, [formState, isTimeOut]);

  const dateNow = useMemo(() => {
    return `Создан: ${dayjs(dayjs().calendar('DD/MM/YYYY')).format(
      'DD/MM/YYYY'
    )}`;
  }, []);

  const taskDate = useMemo(() => {
    if (canEdit) {
      return (
        <input
          id="input-date"
          className="task__date-input"
          type="date"
          value={formState.date}
          onChange={handleDateChange}
        />
      );
    }
    if (!formState.date) {
      return 'Введите дату окончания задачи';
    }
    return dayjs(dayjs(formState.date).calendar('DD/MM/YYYY')).format(
      'DD/MM/YYYY'
    );
  }, [canEdit, formState, handleDateChange]);

  const taskButtonChange = useMemo(() => {
    if (!canEdit) {
      return (
        <ToggleCheckbox
          toggleCheckboxClick={handleCompleteButtonClick}
          isToggled={formState.completed}
        />
      );
    }
    return (
      <button
        type="button"
        className="task__button button-hover"
        onClick={handleConfirm}
      >
        Принять
      </button>
    );
  }, [canEdit, formState, handleCompleteButtonClick, handleConfirm]);

  return (
    <form
      id="task-form"
      className={formClassName}
      onSubmit={handleConfirm}
    >
      <div className="task__text-group">
        <h2 className="task__title">{taskTitle}</h2>
        <h3 className="task__date">{dateNow}</h3>
        <label className="task__date">
          {'Завершить до: '}
          {taskDate}
        </label>
        <textarea
          className="task__description"
          maxLength={150}
          minLength={2}
          placeholder="Распишите задачу подробнее"
          disabled={canEdit ? false : true}
          spellCheck={true}
          value={formState.description || ''}
          onChange={handleTextChange}
          form="task-form"
        ></textarea>
      </div>
      <div className="task__buttons">
        {taskButtonChange}
        <button
          type="button"
          className="task__button button-hover"
          disabled={formState.completed || canEdit ? true : false}
          onClick={handleEditButtonClick}
        >
          Изменить
        </button>
        <button
          type="button"
          className="task__button button-hover"
          disabled={canEdit ? true : false}
          onClick={() => handleDeleteTask(formState.id)}
        >
          Удалить
        </button>
      </div>
    </form>
  );
});

export default Task;
