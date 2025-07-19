import React from 'react';

interface Props {
  json: unknown;
}
export const JSONPreview: React.FC<Props> = ({ json }) => (
  <pre className='w-120' style={{
    background: '#23272e', color: '#fff', padding: 16, borderRadius: 6, fontSize: 16
  }}>{JSON.stringify(json, null, 2)}</pre>
);
