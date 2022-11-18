import { memo } from 'react';
import Header from '../Header/Header';

import './App.css';

const App = memo(() => {
  return (
    <div className="page">
      <Header />
    </div>
  );
});

export default App;
