import React from 'react';
import serialize from 'serialize-javascript';

interface Props {
  id: string;

  data: any;
}

export function AsyncData({ id = '__ASYNC_DATA__', data }: Props) {
	return (
		<script dangerouslySetInnerHTML={{
			__html: `window['${id}'] = ${serialize(data, { isJSON: true })}`
		}}/>
	);
}
