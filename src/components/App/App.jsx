import { memo } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';

import './App.css';

const App = memo(() => {
  return (
    <div className="page">
      <Header />
      <Main />
      <Footer />
    </div>
  );
});

export default App;
