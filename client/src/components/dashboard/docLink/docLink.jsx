import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Tooltip } from '@mui/material';
import ShowCollaboratorsButton from './parts/showCollaboratorsButton.jsx';
import DocIcon from '../../../assets/icons/docs.png';
import UserIcon from '../../../assets/icons/user.png';
import UsersIcon from '../../../assets/icons/users.png';
import DeleteDocButton from './parts/deleteDocButton.jsx';
import RenameDocButton from './parts/renameDocButton.jsx';
import CollabButton from './parts/collabButton.jsx';

const DocLink = ({
  docId,
  fileName,
  author,
  collaborators,
  dateCreated,
  dateModified,
  setDocuments,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const searchParams = new URLSearchParams();
  searchParams.set('docId', docId);
  const href = `/editor?${searchParams.toString()}`;

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const StyledCard = styled(Card)({
    background: 'transparent',
    borderRadius: 20,
    border: 'solid 2px #2e393b',
    boxShadow: '0px 0px 10px 4px #2e393b',
    width: '100%',
    minHeight: 'fit-content',
    height: 'calc(100vw / 100vh)',
    '&:hover': {
      boxShadow: '0px 0px 12px 5px #fff',
      border: 'solid 2px #fff',
      transition: 'all 0.4s ease-in-out',
    },
  });

  const StyledTypography = styled(Typography)({
    color: 'black',
    fontFamily: 'Raleway, sans-serif',
    letterSpacing: '0.1rem',
    fontSize: isTablet ? '12pt' : '15pt',
    width: '95%',
  });

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.5)',
          padding: isMobile ? '5%' : isTablet ? '3%' : '2%',
          margin: isMobile ? '3%' : isTablet ? '2%' : '1%',
        }}
      >
        <MoreVertIcon fontSize={isMobile ? 'medium' : 'large'} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: 20,
            boxShadow: '2px 6px 15px 0px rgba(40, 0, 0, .6)',
            width: 'fit-content',
            overflow: 'hidden',
            padding: isTablet ? '2% 5%' : '1% 2%',
          },
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={UserIcon}
              alt="User icon"
              style={{
                width: 30,
                marginRight: '5%',
              }}
            />
            <p>'{author}'</p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={DocIcon}
              alt="User icon"
              style={{
                width: 30,
                marginRight: '5%',
              }}
            />
            <p>'{dateCreated}'</p>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <DeleteDocButton
              docId={docId}
              fileName={fileName}
              author={author}
              setDocuments={setDocuments}
            />
            <RenameDocButton
              docId={docId}
              author={author}
              fileName={fileName}
              setDocuments={setDocuments}
            />
            <CollabButton docId={docId} fileName={fileName} />
            <ShowCollaboratorsButton
              fileName={fileName}
              collaborators={collaborators}
              docId={docId}
            />
          </div>
        </div>
      </Menu>
      <StyledCard>
        <div>
          {/* eslint-disable-next-line */}
          <a
            href={href}
            style={{
              textDecoration: 'none',
              width: '100%',
            }}
          ></a>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '5%',
              marginTop: isTablet ? '25%' : '20%',
            }}
          ></div>
        </div>
        <a
          href={href}
          style={{
            textDecoration: 'none',
          }}
        >
          <CardContent
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5%',
            }}
          >
            <div
              style={{
                marginBottom: isMobile ? '15%' : 0,
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                background: 'white',
                padding: '10%',
                borderRadius: 20,
              }}
            >
              <Tooltip title="Click to access this document">
                <img
                  src={DocIcon}
                  alt="Document icon"
                  style={{
                    display: 'block',
                    width: '30%',
                  }}
                />
              </Tooltip>
              {collaborators.length > 0 ? (
                <Tooltip title="Multiple people have access to this file">
                  <img
                    src={UsersIcon}
                    alt="Users icon"
                    style={{
                      display: 'block',
                      width: '30%',
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Only one person has access to this file">
                  <img
                    src={UserIcon}
                    alt="User icon"
                    style={{ display: 'block', width: '30%' }}
                  />
                </Tooltip>
              )}
            </div>
            <StyledTypography variant="h5" component="h2">
              <p>
                <b
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    overflowWrap: 'break-word',
                    fontSize: isTablet ? '10pt' : '12pt',
                  }}
                >
                  {fileName.length > 30
                    ? fileName.substring(0, 30) + '...'
                    : fileName}
                </b>
              </p>
              <p
                style={{
                  fontSize: isTablet ? '10pt' : '12pt',
                }}
              >
                Modified: {dateModified}
              </p>
            </StyledTypography>
          </CardContent>
        </a>
      </StyledCard>
    </>
  );
};

export default DocLink;
