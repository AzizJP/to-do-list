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

import { storage } from '../../../Firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import './Task.css';

dayjs.extend(calendar);

const Task = memo(({ task, handleDeleteTask }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    date: '',
    id: '',
    completed: false,
    timeOut: false,
    canEdit: false,
    file: '',
    ...task,
  });
  const [fileUpload, setFileUpload] = useState(null);

  const handleUploadFile = useCallback(() => {
    if (fileUpload === null) {
      return;
    }
    const fileRef = ref(storage, `files/${fileUpload.name}`);
    uploadBytes(fileRef, fileUpload).then(i => {
      getDownloadURL(i.ref).then(url => {
        const newState = {
          ...formState,
          file: url,
        };
        setFormState(newState);
        handleTaskEdit(newState);
      });
    });
  }, [fileUpload]);

  const handleDeleteFile = useCallback(() => {
    console.log('delete');
    const desertRef = ref(storage, formState.file);
    deleteObject(desertRef)
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
    const newState = {
      ...formState,
      file: '',
    };
    setFormState(newState);
    handleTaskEdit(newState);
  }, [formState]);

  useEffect(() => {
    const today = dayjs(
      dayjs().calendar(dayjs('DD/MM/YYYY'))
    ).valueOf();
    const taskCompleteDate = dayjs(formState.date).valueOf();
    setFormState({ ...formState, timeOut: today > taskCompleteDate });
  }, [formState.date]);

  const handleTaskEdit = useCallback(newState => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks.findIndex(el => el.id === formState.id);
    const copyTask = [...tasks];
    copyTask.splice(taskIndex, 1, newState);
    localStorage.setItem('tasks', JSON.stringify(copyTask));
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
    setFormState({ ...formState, canEdit: !formState.canEdit });
  }, [formState]);

  const handleTitleChange = useCallback(
    evt => {
      setFormState({ ...formState, title: evt.target.value });
    },
    [formState]
  );

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

  const handleFileChange = useCallback(
    evt => {
      setFileUpload(evt.target.files[0]);
    },
    [formState]
  );

  const handleConfirm = useCallback(
    evt => {
      const newState = {
        ...formState,
        canEdit: !formState.canEdit,
      };
      evt.preventDefault();
      handleEditButtonClick();
      handleTaskEdit(newState);
    },
    [handleEditButtonClick, handleTaskEdit, formState]
  );

  const formClassName = useMemo(() => {
    let className = 'task';
    if (formState.completed) {
      return (className += ' task_completed');
    }
    if (formState.timeOut) {
      return (className += ' task_time-out');
    }
    return className;
  }, [formState]);

  const taskTitleState = useMemo(() => {
    let res = formState.title;
    if (formState.completed) {
      return (res += ' Задача выполнена!');
    }
    if (formState.timeOut) {
      return (res += ' К сожалению, время вышло!');
    }
    return res;
  }, [formState]);

  const taskTitle = useMemo(() => {
    if (formState.canEdit) {
      return (
        <input
          type="text"
          className="task__title_input"
          value={formState.title}
          onChange={handleTitleChange}
        />
      );
    }
    return <h2 className="task__title">{taskTitleState}</h2>;
  }, [formState, handleTitleChange]);

  const dateNow = useMemo(() => {
    return `Создан: ${dayjs(dayjs().calendar('DD/MM/YYYY')).format(
      'DD/MM/YYYY'
    )}`;
  }, []);

  const taskDate = useMemo(() => {
    if (formState.canEdit) {
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
  }, [formState, handleDateChange]);

  const taskButtonChange = useMemo(() => {
    if (!formState.canEdit) {
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
  }, [formState, handleCompleteButtonClick, handleConfirm]);

  return (
    <form
      id="task-form"
      className={formClassName}
      onSubmit={handleConfirm}
    >
      <div className="task__text-group">
        <div>{taskTitle}</div>
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
          disabled={formState.canEdit ? false : true}
          spellCheck={true}
          value={formState.description}
          onChange={handleTextChange}
          form="task-form"
        ></textarea>
        {formState.canEdit && (
          <div className="task__file-container">
            <input
              type="file"
              accept=".pdf,.jpg,.png,.gif,.web"
              className="task__file-input"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="task__button button-hover"
              onClick={handleUploadFile}
              disabled={formState.completed ? true : false}
            >
              Загрузить
            </button>
            <button
              type="button"
              className="task__button button-hover"
              onClick={handleDeleteFile}
              disabled={formState.file ? false : true}
            >
              Удалить
            </button>
          </div>
        )}
        <div>
          <a
            href={formState.file}
            target="_blank"
            className="file__text text-hover"
          >
            {formState.file && 'Просмотр файла'}
          </a>
        </div>
      </div>
      <div className="task__buttons">
        {taskButtonChange}
        <button
          type="button"
          className="task__button button-hover"
          disabled={
            formState.completed || formState.canEdit ? true : false
          }
          onClick={handleEditButtonClick}
        >
          Изменить
        </button>
        <button
          type="button"
          className="task__button button-hover"
          disabled={formState.canEdit ? true : false}
          onClick={() => handleDeleteTask(formState.id)}
        >
          Удалить
        </button>
      </div>
    </form>
  );
});

export default Task;
