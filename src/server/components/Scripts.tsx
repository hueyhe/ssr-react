import React from 'react';

export interface Bundle {
  key: string;
  src: string;
}

interface Props {
  bundles: Bundle[];
}

export function Scripts({ bundles }: Props) {
  const bundleEls = bundles.map(({ key, src }) => <script key={key} src={src} />);
  return (
    <>
      {bundleEls}
    </>
  );
}
