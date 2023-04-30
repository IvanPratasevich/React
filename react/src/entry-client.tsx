import React from 'react';
import './styles/index.css';
import './styles/normalize.css';
import './styles/fonts.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hydrateRoot } from 'react-dom/client';
import store from './store';
import App from './structure/app/App';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
