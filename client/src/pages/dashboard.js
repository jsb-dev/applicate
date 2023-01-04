import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage.js';
import checkAuth from '../auth/dashboard.js';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('Checking authentication status');
    checkAuth().then((auth) => {
      setIsAuthenticated(auth);
    });
  }, []);

  return (
    <div>
      {/* Render the dashboard if authenticated, or the login page if not */}
      {isAuthenticated ? (
        <div>
          <h1>Dashboard</h1>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
