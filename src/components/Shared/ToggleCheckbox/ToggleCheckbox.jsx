import { memo } from 'react';

import './ToggleCheckbox.css';

const ToggleCheckbox = memo(({ toggleCheckboxClick, isToggled }) => {
  return (
    <button
      type="button"
      className={`search__toggler ${isToggled ? 'search__toggler_active' : ''}`}
      onClick={toggleCheckboxClick}
    >
      <span
        className={`search__toggler-circle ${
          isToggled ? 'search__toggler-circle_active' : ''
        }`}
      ></span>
    </button>
  );
});

export default ToggleCheckbox;
