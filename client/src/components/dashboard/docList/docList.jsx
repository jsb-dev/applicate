import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import UseMediaQuery from '@mui/material/useMediaQuery';
import { Tooltip } from '@mui/material';
import NewDocButton from './parts/newDocButton.jsx';
import StyledButton from '../../shared/styledButton.jsx';
import StyledGrid from './styled/styledGrid.jsx';
import StyledTextField from './styled/styledTextField.jsx';
import DocLink from '../docLink/docLink.jsx';
import SearchIcon from '../../../assets/icons/search.png';
import FilterButton from './parts/filterButton.jsx';
import CloseIcon from '@mui/icons-material/Close';

function DocList({ userId }) {
  const [documents, setDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [allDocs, setAllDocs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('dateModifiedNewest');

  const isMobile = UseMediaQuery('(max-width: 600px)');
  const isTablet = UseMediaQuery('(max-width: 960px)');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    try {
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
        });
    } catch (error) {
      console.error(error);
    }

    return () => {
      setDocuments([]);
      setAllDocs([]);
    };
  }, [userId]);

  const addDocument = (document) => {
    setDocuments([document, ...documents]);
    setAllDocs([document, ...allDocs]);
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
        collaborators={doc.collaborators}
      />
    ));
  };

  const handleReset = () => {
    setSearchValue('');
    setSelectedFilter('fileNameAsc');
    setDocuments(allDocs);
  };

  const handleSubmit = () => {
    setShow(false);
    if (selectedFilter === 'dateModifiedNewest') {
      setDocuments(
        documents.sort((a, b) => {
          const dateA = new Date(a.dateModified.split('-').reverse().join('/'));
          const dateB = new Date(b.dateModified.split('-').reverse().join('/'));
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
          return 0;
        })
      );
    } else if (selectedFilter === 'dateModifiedOldest') {
      setDocuments(
        documents.sort((a, b) => {
          const dateA = new Date(a.dateModified.split('-').reverse().join('/'));
          const dateB = new Date(b.dateModified.split('-').reverse().join('/'));
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
          return 0;
        })
      );
    } else if (selectedFilter === 'fileNameAsc') {
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
    }

    documents.map((doc) => (
      <DocLink
        key={doc.documentId}
        documentId={doc.documentId}
        dateCreated={doc.dateCreated}
        dateModified={doc.dateModified}
        fileName={doc.fileName}
        author={doc.author}
        collaborators={doc.collaborators}
      />
    ));
  };

  return isTablet ? (
    // Mobile View
    <div
      style={{
        margin: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 0px 30px 2px #0dc9de',
        borderRadius: 20,
        maxWidth: '95vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#182021',
          width: '100%',
          height: isMobile ? '25vh' : '20vh',
          minHeight: '200px',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '90%',
            padding: isMobile ? '5% 2%' : '2%',
            border: '1px solid #fff',
            borderRadius: 10,
          }}
        >
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
              margin: 0,
              width: isMobile ? '70%' : isTablet ? '82.5%' : '',
            }}
          />
          <div
            style={{
              height: '80%',
              width: isMobile ? '25%' : isTablet ? '15%' : '',
            }}
          >
            <StyledButton
              style={{
                backgroundImage: `url(${SearchIcon})`,
                backgroundSize: isMobile ? '45%' : '35%',
                width: '100%',
              }}
              onClick={handleSearch}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '93%',
            height: '20%',
            alignItems: 'center',
            padding: '2% 5%',
          }}
        >
          <StyledButton onClick={handleReset}>
            <CloseIcon fontSize="large" />
          </StyledButton>
          <FilterButton
            handleSubmit={handleSubmit}
            show={show}
            setShow={setShow}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <NewDocButton addDocument={addDocument} />
        </div>
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
                  fontSize: '12pt',
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
                sm={4}
                key={document.id || document.documentId}
                style={{
                  padding: 10,
                }}
              >
                <DocLink
                  docId={document.id || document.documentId}
                  fileName={document.fileName}
                  author={document.author}
                  collaborators={document.collaborators}
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
  ) : (
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // Desktop View
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
            height: '20vh',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 2%',
              border: '1px solid #fff',
              borderRadius: 10,
              height: '70%',
              width: '60%',
            }}
          >
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
                width: '87.5%',
                margin: 0,
              }}
            />
            <div
              style={{
                height: '60%',
              }}
            >
              <Tooltip title="Search by file name">
                <StyledButton
                  style={{
                    backgroundImage: `url(${SearchIcon})`,
                    backgroundSize: '45%',
                  }}
                  onClick={handleSearch}
                />
              </Tooltip>
            </div>
          </div>
          <div
            style={{
              height: '60%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '30%',
            }}
          >
            <Tooltip title="Clear search and dashboard filters">
              <StyledButton onClick={handleReset}>
                <CloseIcon fontSize="large" />
              </StyledButton>
            </Tooltip>
            <FilterButton
              handleSubmit={handleSubmit}
              show={show}
              setShow={setShow}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
            <NewDocButton addDocument={addDocument} />
          </div>
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
                    fontSize: '15pt',
                    color: 'white',
                  }}
                >
                  Your documents will appear here
                </div>
              )}
              {documents.map((document) => (
                <Grid
                  item
                  sm={4}
                  lg={3}
                  key={document.id || document.documentId}
                  style={{
                    padding: 20,
                  }}
                >
                  <DocLink
                    docId={document.id || document.documentId}
                    fileName={document.fileName}
                    author={document.author}
                    collaborators={document.collaborators}
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
