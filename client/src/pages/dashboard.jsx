import React, { useEffect, useState } from 'react';
import LoginPage from './login/loginPage.jsx';
import checkAuth from '../auth/checkAuth.js';
import DocList from '../components/dashboard/docList.jsx';

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
          <DocList />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
