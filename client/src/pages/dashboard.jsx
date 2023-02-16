import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage.jsx';
import checkAuth from '../utils/checkAuth.js';
import DocList from '../components/dashboard/docList/docList.jsx';
import NavBar from '../components/global/navBar/navBar.jsx';
import Footer from '../components/global/footer.jsx';
import LoadingSpinner from '../components/global/loadingSpinner.jsx';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
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
    setUserId(searchParams.get('userId'));
    // eslint-disable-next-line
  }, []);

  if (!searchParams.get('userId')) {
    try {
      const localStorageUserId = localStorage.getItem('userId');
      if (localStorageUserId) {
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
          <NavBar />
          <div
            style={{
              marginTop: '15vh',
            }}
          >
            <DocList userId={userId} />
          </div>
          <Footer />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Dashboard;
