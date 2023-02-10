import React, { useEffect, useState } from 'react';
import checkAuth from '../utils/checkAuth.js';
import LoginPage from './loginPage.jsx';
import LoadingSpinner from '../components/global/loadingSpinner.jsx';
import NavBar from '../components/global/navBar/navBar.jsx';
import ChangePasswordButton from '../components/account/changePasswordButton.jsx';
import ChangeEmailButton from '../components/account/changeEmailButton.jsx';

const AccountPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(window.location.search);

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
        <div>
          <NavBar />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ChangePasswordButton />
          <br />
          <br />
          <br />
          <br />
          <ChangeEmailButton />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default AccountPage;
