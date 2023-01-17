import React, { useState, useEffect } from 'react';
import { List } from '@mui/material';
import Styled from '@emotion/styled';
import NewDocButton from './newDocButton.jsx';
import DocLink from './docLink/docLink.jsx';

const StyledList = Styled(List)({
  minHeight: '50vh',
  maxWidth: '70vw',
  borderRadius: 10,
  boxShadow: '2px 6px 15px 0px rgba(40, 0, 0, .6)',
});

function DocList() {
  const [documents, setDocuments] = useState([]);
  const [docLinks, setDocLinks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch('/api/documents', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDocuments(data.documents);
        } else {
          console.error('Could not fetch documents');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setDocLinks(
      documents.map((document) => (
        <DocLink
          key={document.id}
          docId={document.id}
          fileName={document.fileName}
        />
      ))
    );
    // eslint-disable-next-line
  }, []);

  const addDocument = (document) => {
    setDocLinks([
      ...docLinks,
      <DocLink
        key={document.id}
        docId={document.id}
        fileName={document.fileName}
        author={document.author}
        dateCreated={document.dateCreated}
        dateModified={document.dateModified}
      />,
    ]);
  };

  return (
    <StyledList>
      {docLinks}
      <NewDocButton addDocument={addDocument} />

      {documents.map((document) => (
        <DocLink
          key={document.id}
          docId={document.id}
          fileName={document.fileName}
          author={document.author}
          dateCreated={document.dateCreated}
          dateModified={document.dateModified}
        />
      ))}
    </StyledList>
  );
}

export default DocList;
