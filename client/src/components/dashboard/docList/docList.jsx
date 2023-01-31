import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Styled from '@emotion/styled';
import NewDocButton from './parts/newDocButton.jsx';
import StyledButton from './styled/styledButton.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import DocLink from '../docLink/docLink.jsx';
import TextField from '@mui/material/TextField';
import SearchIcon from '../../../assets/icons/search.png';
import FilterButton from './parts/filterButton.jsx';

function DocList({ userId }) {
  const [documents, setDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [allDocs, setAllDocs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('fileNameAsc');

  const isMobile = useMediaQuery('(max-width: 820px)');

  const StyledGrid = Styled(Grid)({
    background: '#0dc9de',
    margin: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    minHeight: 100,
    width: '100%',
  });

  const StyledTextField = Styled(TextField)({
    '& label': {
      color: '#ffffff',
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
    },
    '& label.Mui-focused': {
      color: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: '#00aec2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#39d0ff ',
      },
    },
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
          setAllDocs(data.documents);
        } else {
          console.error('Could not fetch documents');
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      setDocuments([]);
      setAllDocs([]);
    };
  }, [userId]);

  const addDocument = (document) => {
    setDocuments([document, ...documents]);
  };

  const handleSearch = () => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((doc) =>
        doc.fileName.toLowerCase().includes(searchValue.toLowerCase())
      )
    );

    documents.map((doc) => (
      <DocLink
        key={doc.documentId}
        documentId={doc.documentId}
        dateCreated={doc.dateCreated}
        dateModified={doc.dateModified}
        fileName={doc.fileName}
        author={doc.author}
      />
    ));
  };

  const handleClear = () => {
    setSearchValue('');
    setDocuments(allDocs);
  };

  const handleSubmit = () => {
    setShow(false);
    if (selectedFilter === 'fileNameAsc') {
      setDocuments(
        documents.sort((a, b) => {
          if (a.fileName < b.fileName) {
            return -1;
          }
          if (a.fileName > b.fileName) {
            return 1;
          }
          return 0;
        })
      );
    } else if (selectedFilter === 'fileNameDesc') {
      setDocuments(
        documents.sort((a, b) => {
          if (a.fileName < b.fileName) {
            return 1;
          }
          if (a.fileName > b.fileName) {
            return -1;
          }
          return 0;
        })
      );
    } else if (selectedFilter === 'dateModifiedOldest') {
      setDocuments(
        documents.sort((a, b) => {
          if (a.dateModified < b.dateModified) {
            return -1;
          }
          if (a.dateModified > b.dateModified) {
            return 1;
          }
          return 0;
        })
      );
    } else if (selectedFilter === 'dateModifiedNewest') {
      setDocuments(
        documents.sort((a, b) => {
          if (a.dateModified < b.dateModified) {
            return 1;
          }
          if (a.dateModified > b.dateModified) {
            return -1;
          }
          return 0;
        })
      );
    }
    documents.map((doc) => (
      <DocLink
        key={doc.documentId}
        documentId={doc.documentId}
        dateCreated={doc.dateCreated}
        dateModified={doc.dateModified}
        fileName={doc.fileName}
        author={doc.author}
      />
    ));
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
          <FilterButton
            handleSubmit={handleSubmit}
            show={show}
            setShow={setShow}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <StyledTextField
            autoFocus
            margin="dense"
            id="search"
            label="Search"
            type="text"
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{
              width: '60%',
            }}
          />
          {searchValue.length > 0 ? (
            <StyledButton onClick={handleClear}>Clear</StyledButton>
          ) : null}

          <StyledButton
            style={{
              backgroundImage: `url(${SearchIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundColor: 'white',
              boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
              width: 50,
              height: 50,
            }}
            onClick={handleSearch}
          />
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
