import React, { useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import StyledCard from './styled/styledCard.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Tooltip } from '@mui/material';
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

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isBetween = useMediaQuery('(max-width: 800px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const email = localStorage.getItem('userEmail');

  let fileNameLength;
  if (isMobile) {
    fileNameLength = 11;
  } else if (isTablet) {
    fileNameLength = 15;
  } else {
    fileNameLength = 19;
  }

  const handleClick = (event) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          width: isMobile ? '40%' : isTablet ? '25%' : '20%',
          marginTop: isMobile ? '6%' : isTablet ? '3%' : '2%',
        }}
      >
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255,255,255,0.5)',
            marginLeft: isMobile ? '5%' : '5%',
          }}
        >
          <MoreVertIcon
            fontSize={isMobile ? 'medium' : isTablet ? 'small' : 'medium'}
          />
        </IconButton>
      </div>
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
                marginRight: '3%',
              }}
            />
            <p
              style={{
                fontSize: isMobile ? '10pt' : isTablet ? '12pt' : '15pt',
              }}
            >
              '{author}'
            </p>
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
                marginRight: '3%',
              }}
            />
            <p
              style={{
                fontSize: isMobile ? '10pt' : isTablet ? '12pt' : '15pt',
              }}
            >
              '{dateCreated}'
            </p>
          </div>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {email === author ? (
              <>
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
              </>
            ) : (
              <>
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
              </>
            )}
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
          />
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
              padding: '4%',
              paddingTop: isMobile ? '4%' : 0,
            }}
          >
            <div
              style={{
                marginTop: isMobile ? '5%' : 0,
                display: 'flex',
                justifyContent: 'space-around',
                background: 'white',
                padding: '5%',
                borderRadius: 20,
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
                fontSize: isMobile
                  ? '10pt'
                  : isBetween
                  ? '8pt'
                  : isTablet
                  ? '12pt'
                  : '13pt',
                width: '95%',
              }}
            >
              <p>
                <b
                  style={{
                    display: 'inline-block',
                    width: '100%',
                    overflowWrap: 'break-word',
                  }}
                >
                  {fileName.length > fileNameLength
                    ? fileName.substring(0, fileNameLength) + '...'
                    : fileName}
                </b>
              </p>
              <p
                style={{
                  fontSize: isMobile ? '8pt' : isTablet ? '10pt' : '12pt',
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
