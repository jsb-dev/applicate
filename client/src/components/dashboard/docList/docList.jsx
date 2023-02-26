import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CheckOrientation } from '../../../utils/CheckOrientation.jsx';
import { CheckDevice } from '../../../utils/CheckDevice.jsx';
import { Tooltip } from '@mui/material';
import NewDocButton from './parts/newDocButton.jsx';
import StyledButton from '../../shared/styledButton.jsx';
import StyledGrid from './styled/styledGrid.jsx';
import StyledTextField from './styled/styledTextField.jsx';
import DocLink from '../docLink/docLink.jsx';
import SearchIcon from '../../../assets/icons/search.png';
import FilterButton from './parts/filterButton.jsx';
import CloseIcon from '../../../assets/icons/close.png';

function DocList({ userId }) {
  const [documents, setDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [allDocs, setAllDocs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('dateModifiedNewest');

  const isVertical = CheckOrientation();
  const isMobile = CheckDevice();
  const isNarrow = useMediaQuery('(max-width: 600px)');

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
    setSelectedFilter('dateModifiedNewest');
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

  return isNarrow ? (
    // Mobile View
    <div
      style={{
        boxShadow:
          'inset 0 0 1rem 0.1rem rgba(255,255,255, 0.2), 0px 0px 30px 2px #0dc9de',
        backgroundColor: '#182021',
        borderRadius: '1rem',
        width: '90%',
      }}
    >
      <div
        style={{
          margin: '5%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '1rem',
        }}
      >
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#182021',
            minHeight: 200,
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            width: '85%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              border: '1px solid #fff',
              borderRadius: '1rem',
              width: '100%',
              height: '100%',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                width: '85%',
                height: '100%',
                margin: '0 1rem 0 0',
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
              />
            </div>
            <div onClick={handleSearch}>
              <StyledButton image={SearchIcon} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              height: '20%',
              alignItems: 'center',
              padding: '1rem',
              width: '110%',
              marginBottom: '1rem',
            }}
          >
            <div onClick={handleReset}>
              <StyledButton image={CloseIcon} />
            </div>
            <div>
              <FilterButton
                handleSubmit={handleSubmit}
                show={show}
                setShow={setShow}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
            </div>
            <div>
              <NewDocButton addDocument={addDocument} />
            </div>
          </div>
        </section>
        <section>
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
                    fontSize: '1rem',
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
        </section>
      </div>
    </div>
  ) : (
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // Desktop View
    <>
      <div
        style={{
          boxShadow:
            'inset 0 0 1rem 0.1rem rgba(255,255,255, 0.2), 0px 0px 30px 2px #0dc9de',
          backgroundColor: '#182021',
          borderRadius: '1rem',
          width: '90%',
        }}
      >
        <div
          style={{
            margin: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '1rem',
          }}
        >
          <section
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: '#182021',
              minHeight: 100,
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #fff',
                borderRadius: '1rem',
                width: '60%',
                height: '100%',
                padding: '1rem',
              }}
            >
              <div
                style={{
                  width: '90%',
                  height: '100%',
                  margin: '0 1rem 0 0',
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
                />
              </div>
              <div>
                <Tooltip title="Search by file name">
                  <div onClick={handleSearch}>
                    <StyledButton image={SearchIcon} />
                  </div>
                </Tooltip>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '30%',
              }}
            >
              <Tooltip title="Clear search and dashboard filters">
                <div onClick={handleReset}>
                  <StyledButton image={CloseIcon} />
                </div>
              </Tooltip>
              <div>
                <FilterButton
                  handleSubmit={handleSubmit}
                  show={show}
                  setShow={setShow}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                />
              </div>
              <div>
                <NewDocButton addDocument={addDocument} />
              </div>
            </div>
          </section>
        </div>
        <div>
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
                    fontSize: '1rem',
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
