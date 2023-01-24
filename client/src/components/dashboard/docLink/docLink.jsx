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
import DocIcon from '../../../assets/icons/docs.png';
import UserIcon from '../../../assets/icons/user.png';

const DocLink = ({ docId, fileName, author, dateCreated, dateModified }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const searchParams = new URLSearchParams();
  searchParams.set('docId', docId);
  const href = `/editor?${searchParams.toString()}`;

  const isMobile = useMediaQuery('(max-width: 820px)');

  const StyledCard = styled(Card)({
    background: 'transparent',
    borderRadius: 20,
    border: 'solid 2px #2e393b',
    boxShadow: '0px 0px 10px 4px #2e393b',
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
    fontSize: isMobile ? '12pt' : '15pt',
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCard>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          backgroundColor: 'transparent',
        }}
      >
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
            marginTop: '5%',
          }}
        >
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon fontSize="large" />
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
              padding: 10,
              borderRadius: 20,
              boxShadow: '2px 6px 15px 0px rgba(40, 0, 0, .6)',
              display: 'block',
            },
          }}
        >
          <p>Author: {author}</p>
          <p>Date Created: {dateCreated}</p>
        </Menu>
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
          }}
        >
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
            <Tooltip title="Only one person has access to this file">
              <img
                src={UserIcon}
                alt="User icon"
                style={{ display: 'block', width: '30%' }}
              />
            </Tooltip>
          </div>
          <StyledTypography variant="h5" component="h2">
            <p>
              <b>{fileName}</b>
            </p>
            <p>Modified: {dateModified}</p>
          </StyledTypography>
        </CardContent>
      </a>
    </StyledCard>
  );
};

export default DocLink;
