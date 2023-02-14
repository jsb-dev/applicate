import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import checkAuth from '../utils/checkAuth.js';
import LoginPage from './loginPage.jsx';
import LoadingSpinner from '../components/global/loadingSpinner.jsx';
import NavBar from '../components/global/navBar/navBar.jsx';
import Footer from '../components/global/footer.jsx';
import ChangePasswordButton from '../components/account/changePasswordButton.jsx';
import ChangeEmailButton from '../components/account/changeEmailButton.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';

const AccountPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const searchParams = new URLSearchParams(window.location.search);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const check = async () => {
      await checkAuth().then((auth) => {
        setIsAuthenticated(auth);
        setIsLoading(false);
      });
    };
    check();
    // eslint-disable-next-line
  }, []);

  if (!searchParams.get('userId')) {
    try {
      const localStorageUserId = localStorage.getItem('userId');
      if (localStorageUserId) {
        return (window.location.href = `/account?userId=${localStorageUserId}`);
      }
    } catch {
      return (window.location.href = '/');
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavBar />
          <section
            style={{
              backgroundImage: `url(${GalaxyBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '90vh',
              maxWidth: '100vw',
            }}
          >
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
                backgroundRepeat: 'no-repeat',
                minHeight: '90vh',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '90vh',
                }}
              >
                <Card
                  style={{
                    margin: isMobile ? '30% 0' : isTablet ? 0 : '10%',
                    padding: '2%',
                    backgroundColor: '#222c30',
                    color: '#fff',
                    borderRadius: 20,
                    boxShadow: '0 0 10px 1 #fff',
                  }}
                >
                  <CardHeader
                    title={userEmail}
                    avatar={
                      <Avatar>
                        <IconButton>
                          <Typography>U</Typography>
                        </IconButton>
                      </Avatar>
                    }
                  />
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    <CardContent
                      style={{
                        maxWidth: '70vw',
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: '15pt',
                        }}
                      >
                        Below you will find options to change your account
                        password and email, or delete your account
                      </Typography>
                    </CardContent>
                    <CardActions
                      style={{
                        height: '30vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '100%',
                      }}
                    >
                      <ChangePasswordButton />
                      <ChangeEmailButton />
                    </CardActions>
                  </div>
                </Card>
              </div>
            </div>
          </section>
          <Footer />
        </>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default AccountPage;
