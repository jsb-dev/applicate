import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import UseMediaQuery from '@mui/material/useMediaQuery';
import NewDocButton from './parts/newDocButton.jsx';
import StyledButton from '../../shared/styledButton.jsx';
import StyledGrid from './styled/styledGrid.jsx';
import StyledTextField from './styled/styledTextField.jsx';
import DocLink from '../docLink/docLink.jsx';
import SearchIcon from '../../../assets/icons/search.png';
import ClearFiltersIcon from '../../../assets/icons/clearFilters.png';
import FilterButton from './parts/filterButton.jsx';

function DocList({ userId }) {
  const [documents, setDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [allDocs, setAllDocs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('dateModifiedNewest');

  const isMobile = UseMediaQuery('(max-width: 600px)');

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

  const handleClear = () => {
    setSearchValue('');
    setDocuments(allDocs);
  };

  const handleReset = () => {
    handleClear();
    setSelectedFilter('fileNameAsc');
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

  return isMobile ? (
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
          height: '25vh',
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
            padding: '0 3% 1.5% 3%',
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
              width: '70%',
            }}
          />
          <StyledButton
            style={{
              backgroundImage: `url(${SearchIcon})`,
              height: 50,
            }}
            onClick={handleSearch}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
            alignItems: 'center',
            padding: '2% 5%',
          }}
        >
          <FilterButton
            handleSubmit={handleSubmit}
            show={show}
            setShow={setShow}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <StyledButton
            onClick={handleReset}
            style={{
              backgroundImage: `url(${ClearFiltersIcon})`,
            }}
          ></StyledButton>
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
                sm={6}
                lg={4}
                xl={4}
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
    // Mobile View
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
            height: '10vw',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 1% 0.5% 1%',
              border: '1px solid #fff',
              borderRadius: 10,
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
                width: '83%',
              }}
            />
            <StyledButton
              style={{
                backgroundImage: `url(${SearchIcon})`,
              }}
              onClick={handleSearch}
            />
          </div>
          <FilterButton
            handleSubmit={handleSubmit}
            show={show}
            setShow={setShow}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
          <StyledButton
            onClick={handleClear}
            style={{
              backgroundImage: `url(${ClearFiltersIcon})`,
            }}
          ></StyledButton>
          <NewDocButton addDocument={addDocument} />
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
                  xs={6}
                  sm={6}
                  lg={4}
                  xl={4}
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
