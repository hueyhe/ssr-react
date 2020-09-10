import React, { createContext, FunctionComponent } from 'react';

export interface DataStore {
  [key: string]: any;
}

export interface Fetcher {
  id: string;
  fetch: Promise<any>;
}

type Context = DataStore | Fetcher[];

interface ProviderProps {
  fetchers?: Fetcher[];

  data?: DataStore;
}

export const ServerFetchContext = createContext<Context>(null);

export const ServerFetchContextProvider: FunctionComponent<ProviderProps> = ({
  children,
  fetchers,
  data,
}) => {
  const context = Array.isArray(fetchers) ? fetchers : (data || {});

  return (
    <ServerFetchContext.Provider value={context}>
      {children}
    </ServerFetchContext.Provider>
  );
}
