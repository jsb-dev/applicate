import React, { useState, useEffect } from 'react';
import {
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Container,
} from '@mui/material';
import { CheckDevice } from '../../../utils/CheckDevice.jsx';
import CloseIcon from '@mui/icons-material/Close';
import StyledAppBar from './styled/styledAppBar.jsx';
import StyledLink from './styled/styledLink.jsx';
import checkAuth from '../../../utils/checkAuth';
import LogoutButton from './parts/logoutButton.jsx';
import AccountButton from './parts/accountButton.jsx';
import StyledButton from './styled/styledButton.jsx';
import LogoImg from '../../../assets/images/applicateLogo.png';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  const isMobile = CheckDevice();

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
      width: '100%',
      height: '90%',
      padding: '1rem',
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
            <Container
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
                      <StyledButton>Home</StyledButton>
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
                      <StyledButton>Home</StyledButton>
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
            </Container>
          </Toolbar>
        </StyledAppBar>
      </div>
    );
  }

  // Mobile View
  function MobileNavbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const check = async () => {
      await checkAuth().then((auth) => {
        setIsAuthenticated(auth);
      });
    };

    useEffect(() => {
      check();
    }, []);

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
        <StyledAppBar>
          <Toolbar>
            <Container
              style={{
                flexGrow: 1,
                padding: 0,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: 0,
                  padding: 0,
                  margin: 0,
                }}
              >
                <img
                  src={LogoImg}
                  alt="The applicate Logo"
                  style={{
                    width: 50,
                    height: 'auto',
                    padding: 0,
                    margin: 0,
                  }}
                />
              </div>
            </Container>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div
            style={{
              background: '#182021',
              height: '100dvh',
              maxWidth: '80vw',
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

  return <>{isMobile ? <MobileNavbar /> : <FullNavbar />}</>;
}

export default NavBar;
