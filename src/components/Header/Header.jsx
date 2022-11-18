import { memo } from 'react';

import './Header.css';

const Header = memo(() => {
  return <div className="header">Привет, я Header</div>;
});

export default Header;
