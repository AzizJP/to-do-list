import { memo } from 'react';

import './Header.css';

const Header = memo(() => {
  return (
    <div className="header">
      <h1 className="header__title">Список дел</h1>
    </div>
  );
});

export default Header;
