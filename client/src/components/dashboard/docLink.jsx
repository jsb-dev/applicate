import React from 'react';

function DocLink({ docId, fileName }) {
  const searchParams = new URLSearchParams();
  searchParams.set('documentId', docId);
  const href = `/editor?${searchParams.toString()}`;
  return (
    <li>
      <a href={href}>{fileName}</a>
    </li>
  );
}

export default DocLink;
