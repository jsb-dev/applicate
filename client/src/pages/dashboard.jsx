import React, { useEffect, useState } from 'react';
import LoginPage from './login/loginPage.jsx';
import checkAuth from '../utils/checkAuth.js';
import DocList from '../components/dashboard/docList.jsx';
import LogoutButton from '../components/dashboard/logoutButton.jsx';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth().then((auth) => {
      setIsAuthenticated(auth);
    });
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <LogoutButton />
          <DocList />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
