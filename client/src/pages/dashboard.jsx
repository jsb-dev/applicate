import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage.jsx';
import checkAuth from '../utils/checkAuth.js';
import DocList from '../components/dashboard/docList/docList.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import FullNavbar from '../components/navbar/fullNavbar.jsx';
import MobileNavbar from '../components/navbar/mobileNavbar.jsx';
import LoadingSpinner from '../components/global/loadingSpinner.jsx';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width: 820px)');
  const searchParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    const check = async () => {
      await checkAuth().then((auth) => {
        setIsAuthenticated(auth);
        setIsLoading(false);
      });
    };
    check();
    setUserId(searchParams.get('userId'));
  }, []);

  if (
    searchParams.get('userId') === null ||
    searchParams.get('userId') === '' ||
    searchParams.get('userId') === undefined
  ) {
    try {
      const localStorageUserId = localStorage.getItem('userId');
      if (localStorageUserId !== null || localStorageUserId !== undefined) {
        return (window.location.href = `/dashboard?userId=${localStorageUserId}`);
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
        <div>
          {isMobile ? <MobileNavbar /> : <FullNavbar />}
          <div
            style={{
              marginTop: isMobile ? '15vh' : '',
            }}
          >
            <DocList userId={userId} />
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Dashboard;
