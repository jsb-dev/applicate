import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import NewDocButton from './newDocButton.jsx';
import DocLink from '../docLink/docLink.jsx';

function DocList({ userId }) {
  const [documents, setDocuments] = useState([]);
  const isMobile = useMediaQuery('(max-width: 820px)');

  const StyledGrid = Styled(Grid)({
    boxShadow: '0px 0px 30px 2px #0dc9de',
    background: '#0dc9de',
    borderRadius: 20,
    maxWidth: '95vw',
    minHeight: '50vh',
    margin: 0,
    padding: isMobile ? 0 : 15,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch(`/api/documents`, {
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
    // Add cleanup function
    return () => {
      setDocuments([]);
    };
  }, [userId]);

  const addDocument = (document) => {
    setDocuments([document, ...documents]);
  };

  return (
    <div
      style={{
        margin: '5% 0 5% 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledGrid container spacing={4}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Grid
            item
            xs={6}
            sm={4}
            lg={3}
            xl={2}
            style={{
              padding: isMobile ? 5 : 20,
            }}
          >
            <NewDocButton addDocument={addDocument} />
          </Grid>
          {documents.map((document) => (
            <Grid
              item
              xs={6}
              sm={4}
              lg={3}
              xl={2}
              key={document._id}
              style={{
                padding: isMobile ? 5 : 20,
              }}
            >
              <DocLink
                key={document.id}
                docId={document.id}
                fileName={document.fileName}
                author={document.author}
                dateCreated={document.dateCreated}
                dateModified={document.dateModified}
              />
            </Grid>
          ))}
        </div>
      </StyledGrid>
    </div>
  );
}

export default DocList;
