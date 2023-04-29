import React from 'react';
import App from './structure/app/App';
import { RenderToPipeableStreamOptions, renderToPipeableStream } from 'react-dom/server';
import store from './store';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

const render = (options: RenderToPipeableStreamOptions, url: string) =>
  renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    options
  );

export { render };
