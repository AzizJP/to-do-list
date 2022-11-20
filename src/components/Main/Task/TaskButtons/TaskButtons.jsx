import { memo, useCallback, useMemo } from 'react';
import ToggleCheckbox from '../../../Shared/ToggleCheckbox/ToggleCheckbox';

import './TaskButtons.css';

const TaskButtons = memo(
  ({
    formState,
    handleCompleteTaskClick,
    handleConfirm,
    handleEditButtonClick,
    handleDeleteTask,
  }) => {
    const taskButtonChange = useMemo(() => {
      if (!formState.canEdit) {
        return (
          <ToggleCheckbox
            toggleCheckboxClick={handleCompleteTaskClick}
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
    }, [formState, handleCompleteTaskClick, handleConfirm]);

    const disableEditButton = useMemo(
      () => formState.completed || formState.canEdit,
      [formState]
    );

    const disableDeleteButton = useMemo(
      () => formState.canEdit,
      [formState]
    );

    const onDeleteButton = useCallback(
      () => handleDeleteTask(formState.id),
      [formState]
    );

    return (
      <div className="task__buttons">
        {taskButtonChange}
        <button
          type="button"
          className="task__button button-hover"
          disabled={disableEditButton}
          onClick={handleEditButtonClick}
        >
          Изменить
        </button>
        <button
          type="button"
          className="task__button button-hover"
          disabled={disableDeleteButton}
          onClick={onDeleteButton}
        >
          Удалить
        </button>
      </div>
    );
  }
);

export default TaskButtons;
