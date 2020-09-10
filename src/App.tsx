import React from 'react';

import { useServerFetch } from './hooks';

function mockResolve<T>(arg?: T): Promise<T> {
  return new Promise(r => setTimeout(() => r(arg), 1000));
}

export function App(props: {}) {
  const data = useServerFetch({
    id: {
      props,
      component: App,
    },
    fetch: () => mockResolve('aaa'),
  });

  return (
    <>
      Welcome Home {data}
    </>
  );
}
