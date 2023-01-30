import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Styled from '@emotion/styled';
import NewDocButton from './newDocButton.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import DocLink from '../docLink/docLink.jsx';

function DocList({ userId }) {
  const [documents, setDocuments] = useState([]);
  const isMobile = useMediaQuery('(max-width: 820px)');

  const StyledGrid = Styled(Grid)({
    background: '#0dc9de',
    margin: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 410,
    width: '100%',
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
    return () => {
      setDocuments([]);
    };
  }, [userId]);

  const addDocument = (document) => {
    setDocuments([document, ...documents]);
  };

  return (
    <>
      <div
        style={{
          margin: '5%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 0px 30px 2px #0dc9de',
          borderRadius: 20,
          maxWidth: '95vw',
        }}
      >
        <div
          style={{
            backgroundColor: '#182021',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: isMobile ? '11vh' : '15vh',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <NewDocButton addDocument={addDocument} />
          <button>B2</button>
          <button>B3</button>
          <button>B4</button>
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          <StyledGrid container>
            <Grid container>
              {documents.length === 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    fontSize: isMobile ? '12pt' : '15pt',
                    color: 'white',
                  }}
                >
                  Your documents will appear here
                </div>
              )}
              {documents.map((document) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  lg={4}
                  xl={4}
                  key={document.id || document.documentId}
                  style={{
                    padding: isMobile ? 10 : 20,
                  }}
                >
                  <DocLink
                    docId={document.id || document.documentId}
                    fileName={document.fileName}
                    author={document.author}
                    dateCreated={document.dateCreated}
                    dateModified={document.dateModified}
                    setDocuments={setDocuments}
                  />
                </Grid>
              ))}
            </Grid>
          </StyledGrid>
        </div>
      </div>
    </>
  );
}

export default DocList;
