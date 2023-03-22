import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/normalize.css';
import './styles/fonts.css';
import { BrowserRouter } from 'react-router-dom';
import App from './structure/app/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
