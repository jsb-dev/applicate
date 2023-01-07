import React, { useEffect, useState } from 'react';
import LoginPage from './loginPage.jsx';
import checkAuth from '../auth/dashboard.js';
import CreateButton from '../components/dashboard/createButton.jsx';

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
          <CreateButton />
          <div>
            <h2>My Documents</h2>
            <p>Here are your documents</p>
            <ul id="docList"></ul>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Dashboard;
