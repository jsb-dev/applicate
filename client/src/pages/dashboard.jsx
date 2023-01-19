import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage.jsx';
import checkAuth from '../utils/checkAuth.js';
import DocList from '../components/dashboard/docList/docList.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import FullNavbar from '../components/navbar/fullNavbar.jsx';
import MobileNavbar from '../components/navbar/mobileNavbar.jsx';
import LogoutButton from '../components/dashboard/logoutButton.jsx';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  const ismobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    checkAuth().then((auth) => {
      setIsAuthenticated(auth);
    });

    const searchParams = new URLSearchParams(window.location.search);
    setUserId(searchParams.get('userId'));
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {ismobile ? <MobileNavbar /> : <FullNavbar />}
          <LogoutButton />
          <DocList userId={userId} />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
