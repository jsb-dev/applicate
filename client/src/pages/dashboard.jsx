import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage.jsx';
import checkAuth from '../utils/checkAuth.js';
import DocList from '../components/dashboard/docList/docList.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import FullNavbar from '../components/navbar/fullNavbar.jsx';
import MobileNavbar from '../components/navbar/mobileNavbar.jsx';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ismobile = useMediaQuery('(max-width: 820px)');

  useEffect(() => {
    checkAuth().then((auth) => {
      setIsAuthenticated(auth);
    });
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          {ismobile ? <MobileNavbar /> : <FullNavbar />}
          <DocList />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
