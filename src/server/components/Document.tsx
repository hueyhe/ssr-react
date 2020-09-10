import React from 'react';

import { Head } from './Head';
import { Bundle, Scripts } from './Scripts';
import { AsyncData } from './AsyncData';

export interface DocumentProps {
  appHtml: string;
  scripts: Bundle[];
  vendors: Bundle[];
  fetchedData: any;
}

export function Document({
  appHtml = '',
  scripts = [],
  vendors = [],
  fetchedData = {},
}: DocumentProps) {
  return (
		<html>
      <Head />
			<body>
				{/* React root node */}
				<div id="react-root" dangerouslySetInnerHTML={{ __html: appHtml }} />

				{/* Server fetched data */}
        <AsyncData id="__FETCHED__" data={fetchedData} />

				{/* Vendor bundles */}
        <Scripts bundles={vendors} />

				{/* Application scripts */}
        <Scripts bundles={scripts} />
			</body>
		</html>
  );
}
