import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoImg from '../../assets/images/applicateLogo.png';
import MobileLinkButton from './parts/mobileLinkButton.jsx';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #2e393b 30%, #0dc9de 90%)',
  border: 0,
  color: 'white',
  height: '10vh',
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

function MobileNavbar() {
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
      <StyledAppBar
        position="static"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <BarTypography>
            <img
              src={LogoImg}
              alt="The applicate Logo"
              style={{
                height: 'calc(100vh / 15)',
              }}
            />
          </BarTypography>
          <IconButton onClick={toggleDrawer(true)}>
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </StyledAppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{
            background: '#182021',
            height: '100vh',
            maxWidth: '80vw',
            overflow: 'hidden',
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            style={{ position: 'absolute', right: 0, top: 0, color: 'white' }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          <div
            style={{
              marginTop: 'calc(100vh / 20)',
            }}
          >
            <PageLink to="/">
              <MobileLinkButton>Home</MobileLinkButton>
            </PageLink>
            <PageLink to="/about">
              <MobileLinkButton>About</MobileLinkButton>
            </PageLink>
            <PageLink to="/contact">
              <MobileLinkButton>Contact</MobileLinkButton>
            </PageLink>
            <PageLink to="/">
              <MobileLinkButton>Login / Signup</MobileLinkButton>
            </PageLink>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileNavbar;
