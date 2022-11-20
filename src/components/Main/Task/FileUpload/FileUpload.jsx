import { memo, useMemo } from 'react';

import './FileUpload.css';

const FileUpload = memo(
  ({
    formState,
    handleFileChange,
    handleUploadFile,
    handleDeleteFile,
  }) => {
    const disableButtonIfCoplited = useMemo(
      () => formState.completed,
      [formState.completed]
    );

    const disableButtonIfNoFile = useMemo(
      () => !formState.file,
      [formState.file]
    );

    return (
      formState.canEdit && (
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
            disabled={disableButtonIfCoplited}
          >
            Загрузить
          </button>
          <button
            type="button"
            className="task__button button-hover"
            onClick={handleDeleteFile}
            disabled={disableButtonIfNoFile}
          >
            Удалить
          </button>
        </div>
      )
    );
  }
);

export default FileUpload;
