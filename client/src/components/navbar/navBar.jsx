import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #098c9c 30%, #39d0ff 90%)',
  border: 0,
  color: 'white',
  height: '8vh',
  width: '100%',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
});

const PageLink = styled(Link)({
  color: '#182021',
  textDecoration: 'none',
  marginRight: '10px',
  '&:hover': {
    color: '#ffffff',
  },
});

const BarTypography = styled(Typography)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-between',
});

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <BarTypography
            style={{
              padding: '2% 0 2% 0',
            }}
          >
            <PageLink to="/">Home</PageLink>
          </BarTypography>
          <IconButton
            onClick={toggleDrawer(true)}
            style={{
              padding: '2% 0 2% 0',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div>
          <PageLink to="/about">About</PageLink>
          <PageLink to="/services">Services</PageLink>
          <PageLink to="/contact">Contact</PageLink>
          <PageLink to="/">Login</PageLink>
        </div>
      </Drawer>
    </div>
  );
}
