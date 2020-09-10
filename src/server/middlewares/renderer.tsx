import { Request, Response, NextFunction } from 'express';
import React, { createElement } from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from "react-router-dom";

import { App } from '../../App';
import { DataStore, Fetcher, ServerFetchContextProvider } from '../../contexts';
import { Document, Bundle } from '../components';
import manifest from '../../../dist/manifest.json';

interface ScriptBundles {
  vendors: Bundle[];
  scripts: Bundle[];
}

async function getBundles(): Promise<ScriptBundles> {
  const vendors: Bundle[] = [];
  const scripts: Bundle[] = [];
  let manifestJson = manifest;

  // TODO development env 
  manifestJson = await import('../../../dist/manifest.json');

  for (const [key, value] of Object.entries(manifestJson)) {
    if (key === 'default') {
      continue;
    }
    const bundle = { key, src: value };
    if (key.includes('app')) {
      scripts.push(bundle);
    } else {
      vendors.push(bundle);
    }
  }

  return {
    vendors,
    scripts,
  };
}

export function renderer() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { vendors, scripts } = await getBundles();

    const context: StaticRouterContext = {};
    const fetchers: Fetcher[] = [];

    const preRendered = renderToStaticMarkup(
      <ServerFetchContextProvider fetchers={fetchers}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ServerFetchContextProvider>
    );

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      });
      res.end();
      return;
    }

    const results = await Promise.all(fetchers.map(({ fetch }) => fetch));
    const data: DataStore = {};
    for (let i = 0; i < results.length; i++) {
      data[fetchers[i].id] = results[i];
    }

    const appHtml = renderToString(
      <ServerFetchContextProvider data={data}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ServerFetchContextProvider>
    );

    const html = renderToString(
      <Document
        appHtml={appHtml}
        vendors={vendors}
        scripts={scripts}
        fetchedData={data}
      />
    );

    res.set('content-type', 'text/html');
    res.send(`<!DOCTYPE html>${html}`);
  };
}
