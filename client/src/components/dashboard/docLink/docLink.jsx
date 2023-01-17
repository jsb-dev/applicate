import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import styled from '@emotion/styled';

const StyledTypography = styled(Typography)({
  color: 'white',
  fontSize: '1.5rem',
});

const StyledCard = styled(Card)({
  background: 'linear-gradient(45deg, #098c9c 30%, #39d0ff 90%)',
  border: 0,
  color: 'white',
  height: 'auto',
  width: '30%',
  margin: '1em',
  padding: '1em',
  '&:hover': {
    background: 'linear-gradient(45deg, #098c9c 30%, #39d0ff 90%)',
    border: 0,
    boxShadow: '0px 0px 10px 2px #fff',
    color: 'white',
  },
});

const DocLink = ({ docId, fileName, author, dateCreated, dateModified }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const searchParams = new URLSearchParams();
  searchParams.set('docId', docId);
  const href = `/editor?${searchParams.toString()}`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCard>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="large" style={{ color: 'white' }} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <p>Author: {author}</p>
        <p>Date Created: {dateCreated}</p>
      </Menu>
      <a
        href={href}
        style={{
          textDecoration: 'none',
        }}
      >
        <CardContent>
          <StyledTypography variant="h5" component="h2">
            <p>{fileName}</p>
            <p>Modified: {dateModified}</p>
          </StyledTypography>
        </CardContent>
      </a>
    </StyledCard>
  );
};

export default DocLink;
