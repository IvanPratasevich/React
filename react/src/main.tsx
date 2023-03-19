import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/screens/home/Home';
import './styles/index.css';
import './styles/normalize.css';
import './styles/fonts.css';
import Main from './components/main/Main';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home />
    <Main />
  </React.StrictMode>
);
