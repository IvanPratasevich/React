import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/screens/home/Home';
import './styles/index.css';
import './styles/normalize.css';
import './styles/fonts.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
