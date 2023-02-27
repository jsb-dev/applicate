import React, { useState } from 'react';
import { CheckOrientation } from '../../../utils/CheckOrientation.jsx';
import { CheckDevice } from '../../../utils/CheckDevice.jsx';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import StyledCard from './styled/styledCard.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import ShowCollaboratorsButton from './parts/showCollaboratorsButton.jsx';
import DocIcon from '../../../assets/icons/docs.png';
import UserIcon from '../../../assets/icons/user.png';
import UsersIcon from '../../../assets/icons/users.png';
import DeleteDocButton from './parts/deleteDocButton.jsx';
import LeaveButton from './parts/leaveButton.jsx';
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

  const isMobile = CheckDevice();
  const isVertical = CheckOrientation();
  const isNarrow = useMediaQuery('(max-width: 600px)');

  const email = localStorage.getItem('userEmail');

  let fileNameLength;
  if (isNarrow) {
    fileNameLength = 10;
  } else if (isMobile) {
    fileNameLength = 13;
  } else {
    fileNameLength = 17;
  }

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonRowStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  };

  const infoTagStyles = {
    display: 'flex',
    alignItems: 'center',
  };

  const infoTagImg = {
    width: '10%',
    margin: '1rem',
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          marginLeft: '0.5rem',
          marginTop: '0.5rem',
        }}
      >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            overflow: 'hidden',
            backgroundColor: 'rgba(0,0,0,0.85)',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            width: '30rem',
            boxShadow: '0 0 100rem 100rem rgba(0,0,0,0.85)',
          },
        }}
      >
        <section
          style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '1rem',
            borderTopRightRadius: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={infoTagStyles}>
              <img src={UserIcon} alt="User icon" style={infoTagImg} />
              <p
                style={{
                  fontSize: '1rem',
                }}
              >
                '{author}'
              </p>
            </div>
            <div style={infoTagStyles}>
              <img src={DocIcon} alt="User icon" style={infoTagImg} />
              <p
                style={{
                  fontSize: '1rem',
                }}
              >
                '{dateCreated}'
              </p>
            </div>
          </div>
          <Button
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: '1.2rem',
              top: '1.8rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#161a19',
              boxShadow: '0 0 0.5rem 0.2rem rgba(0,0,0,0.85)',
              borderRadius: '0.5rem',
              padding: '1.2rem',
            }}
          >
            CLOSE
          </Button>
        </section>
        <section
          style={{
            height: '6rem',
            backgroundColor: '#161a19',
            borderBottomLeftRadius: '1rem',
            borderBottomRightRadius: '1rem',
            padding: '0 1.8rem',
          }}
        >
          {email === author ? (
            <div style={buttonRowStyles}>
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
              <CollabButton docId={docId} fileName={fileName} email={email} />
              <ShowCollaboratorsButton
                fileName={fileName}
                email={email}
                author={author}
                collaborators={collaborators}
                docId={docId}
              />
            </div>
          ) : (
            <div style={buttonRowStyles}>
              <LeaveButton
                docId={docId}
                fileName={fileName}
                email={email}
                setDocuments={setDocuments}
              />
              <ShowCollaboratorsButton
                fileName={fileName}
                email={email}
                author={author}
                collaborators={collaborators}
                docId={docId}
              />
            </div>
          )}
        </section>
      </Menu>
      <StyledCard>
        <div>
          {/* eslint-disable-next-line */}
          <a
            href={href}
            style={{
              textDecoration: 'none',
            }}
          />
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
              padding: '0.5rem',
            }}
          >
            <div
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                justifyContent: 'space-around',
                background: 'white',
                padding: '0.5rem',
                borderRadius: '0.3rem',
              }}
            >
              <Tooltip title="Click to access this document">
                <img
                  src={DocIcon}
                  alt="Document icon"
                  style={{
                    display: 'block',
                    width: '20%',
                    height: '20%',
                  }}
                />
              </Tooltip>
              {collaborators.length > 0 ? (
                <Tooltip title="Multiple people have access to this file">
                  <img
                    src={UsersIcon}
                    alt="Users icon"
                    style={{
                      width: '20%',
                      height: '20%',
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Only one person has access to this file">
                  <img
                    src={UserIcon}
                    alt="User icon"
                    style={{ width: '20%', height: '20%' }}
                  />
                </Tooltip>
              )}
            </div>
            <Typography
              variant="h5"
              component="h2"
              style={{
                color: 'black',
                fontFamily: 'Raleway, sans-serif',
                letterSpacing: '0.1rem',
                fontSize: '0.6rem',
                width: '95%',
              }}
            >
              <p>
                <b
                  style={{
                    color: 'white',
                  }}
                >
                  {fileName.length > fileNameLength
                    ? fileName.substring(0, fileNameLength) + '...'
                    : fileName}
                </b>
              </p>
              <p
                style={{
                  fontSize: '0.6rem',
                  color: 'white',
                }}
              >
                Modified: {isMobile ? <br /> : null}
                {dateModified}
              </p>
            </Typography>
          </CardContent>
        </a>
      </StyledCard>
    </>
  );
};

export default DocLink;
