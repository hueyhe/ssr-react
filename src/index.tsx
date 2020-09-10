import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { ServerFetchContextProvider } from './contexts';

function render() {
  const container = document.querySelector('#react-root');

  hydrate(
    <ServerFetchContextProvider data={(window as any)["__FETCHED__"] || {}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ServerFetchContextProvider>,
    container,
  );
}

render();

if ((module as any).hot) {
  (module as any).hot.accept('./App', () => {
    render();
  });
}
