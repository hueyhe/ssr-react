// /**
//  * @see https://github.com/facebook/react/pull/17322
//  */
// import {} from 'react/experimental';
// import { unstable_useOpaqueIdentifier } from 'react';

import { FunctionComponent, ComponentProps, useContext, useState } from 'react';
import sha256 from 'crypto-js/sha256';

import { ServerFetchContext } from '../contexts';

interface Identifier {
  props: ComponentProps<any>;
  component: FunctionComponent;
}

interface Options {
  id: Identifier;
  fetch: () => Promise<any>;
}

export function useServerFetch({
  id,
  fetch,
}: Options) {
  const ctx = useContext(ServerFetchContext);

  const { props, component } = id;
  const hashed = sha256(`__props__:${JSON.stringify(props)},__component__:${component.toString()}`);
  const uniqueId = hashed.toString();

  if (Array.isArray(ctx)) {
    ctx.push({
      id: uniqueId,
      fetch: fetch(),
    });
  }

  const [data, setData] = useState<any>(Array.isArray(ctx) ? null : ctx[uniqueId]);

  return data;
}
