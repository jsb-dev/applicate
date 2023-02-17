import React, { useState, useEffect } from 'react';
import { Toolbar, Typography, IconButton, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledAppBar from './styled/styledAppBar.jsx';
import StyledLink from './styled/styledLink.jsx';
import checkAuth from '../../../utils/checkAuth.js';
import LogoutButton from './parts/logoutButton.jsx';
import AccountButton from './parts/accountButton.jsx';
import StyledButton from './styled/styledButton.jsx';
import LogoImg from '../../../assets/images/applicateLogo.png';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  const isTablet = useMediaQuery('(max-width: 960px)');
  const croppedScreen = useMediaQuery('(max-width: 1200px)');

  // Desktop View
  function FullNavbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const check = async () => {
      await checkAuth().then((auth) => {
        setIsAuthenticated(auth);
      });
    };

    useEffect(() => {
      check();
    }, []);

    const buttonContainer = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: croppedScreen ? '14vw' : '12vw',
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
            <Typography
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={LogoImg}
                alt="The applicate Logo"
                style={{
                  height: 'calc(100vh / 11)',
                }}
              />
            </Typography>
            <Typography
              style={{
                flexGrow: 0.5,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {isAuthenticated ? (
                <>
                  <div style={buttonContainer}>
                    <StyledLink to="/dashboard">
                      <StyledButton>Dashboard</StyledButton>
                    </StyledLink>
                  </div>
                  <div style={buttonContainer}>
                    <AccountButton />
                  </div>
                  <div style={buttonContainer}>
                    <StyledLink to="/contact">
                      <StyledButton>Contact</StyledButton>
                    </StyledLink>
                  </div>
                  <div style={buttonContainer}>
                    <StyledLink to="/about">
                      <StyledButton>About</StyledButton>
                    </StyledLink>
                  </div>
                  <div style={buttonContainer}>
                    <StyledLink to="/">
                      <StyledButton>Home / Login</StyledButton>
                    </StyledLink>
                  </div>
                  <div style={buttonContainer}>
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <div style={buttonContainer}>
                    <StyledLink to="/">
                      <StyledButton>Home / Login</StyledButton>
                    </StyledLink>
                  </div>
                  <div style={buttonContainer}>
                    <StyledLink to="/about">
                      <StyledButton>About</StyledButton>
                    </StyledLink>
                  </div>
                  <div style={buttonContainer}>
                    <StyledLink to="/contact">
                      <StyledButton>Contact</StyledButton>
                    </StyledLink>
                  </div>
                </>
              )}
            </Typography>
          </Toolbar>
        </StyledAppBar>
      </div>
    );
  }

  // Mobile View
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
            <Typography
              style={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <img
                src={LogoImg}
                alt="The applicate Logo"
                style={{
                  height: 'calc(100vh / 14)',
                }}
              />
            </Typography>
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
              style={{
                position: 'absolute',
                right: 15,
                top: 15,
                color: 'white',
              }}
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
                <>
                  <StyledLink to="/dashboard">
                    <StyledButton>Dashboard</StyledButton>
                  </StyledLink>
                  <AccountButton />
                </>
              ) : null}
              <StyledLink to="/contact">
                <StyledButton>Contact</StyledButton>
              </StyledLink>
              <StyledLink to="/about">
                <StyledButton>About</StyledButton>
              </StyledLink>
              <StyledLink to="/">
                <StyledButton>Home / Login</StyledButton>
              </StyledLink>

              {isAuthenticated ? (
                <>
                  <LogoutButton />
                </>
              ) : null}
            </div>
          </div>
        </Drawer>
      </div>
    );
  }

  return <>{isTablet ? <MobileNavbar /> : <FullNavbar />}</>;
}

export default NavBar;
