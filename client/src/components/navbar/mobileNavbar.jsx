import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';
import checkAuth from '../../utils/checkAuth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoImg from '../../assets/images/applicateLogo.png';
import MobileLinkButton from './parts/mobileLinkButton.jsx';
import MobileLogoutButton from './parts/mobileLogoutButton.jsx';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #2e393b 30%, #0dc9de 90%)',
  border: 0,
  color: 'white',
  height: '10vh',
  width: '100%',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  transition: 'transform 0.3s ease-in-out',
  zIndex: '999',
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
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [transformValue, setTransformValue] = useState('translateY(0)');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const check = async () => {
    await checkAuth().then((auth) => {
      setIsAuthenticated(auth);
    });
  };

  useEffect(() => {
    check();
    const handleScroll = () => {
      const currentScrollTop = window.scrollY;
      if (currentScrollTop > lastScrollTop) {
        setTransformValue('translateY(-100%)');
      } else {
        setTransformValue('translateY(0)');
      }
      setLastScrollTop(currentScrollTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

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
      <StyledAppBar style={{ transform: transformValue }}>
        <Toolbar>
          <BarTypography>
            <img
              src={LogoImg}
              alt="The applicate Logo"
              style={{
                height: 'calc(100vh / 14)',
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
            style={{ position: 'absolute', right: 15, top: 15, color: 'white' }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>

          <div
            style={{
              marginTop: 'calc(100vh / 13)',
              paddingLeft: '10%',
            }}
          >
            {isAuthenticated ? (
              <PageLink to="/dashboard">
                <MobileLinkButton>Dashboard</MobileLinkButton>
              </PageLink>
            ) : null}
            <PageLink to="/">
              <MobileLinkButton>Home</MobileLinkButton>
            </PageLink>
            <PageLink to="/about">
              <MobileLinkButton>About</MobileLinkButton>
            </PageLink>
            <PageLink to="/contact">
              <MobileLinkButton>Contact</MobileLinkButton>
            </PageLink>
            {isAuthenticated ? <MobileLogoutButton /> : null}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default MobileNavbar;
