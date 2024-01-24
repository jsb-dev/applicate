import React, { useState, useEffect } from 'react';
import env from 'react-dotenv';
import LoginPage from './loginPage.jsx';
import ResetPasswordCard from '../components/recovery/resetPasswordCard.jsx';
import NavBar from '../components/global/navBar/navBar.jsx';
import Footer from '../components/global/footer.jsx';

const RecoveryPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { REACT_APP_API_URL } = env;

  const searchParams = new URLSearchParams(window.location.search);
  const auth = searchParams.get('auth');

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}account/resetAuth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          return <LoginPage />;
        }
      });
  }, [REACT_APP_API_URL, auth]);

  return (
    <div className="page-container">
      {isAuthenticated ? (
        <div
          style={{
            maxHeight: '100vh',
          }}
        >
          <NavBar />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ResetPasswordCard auth={auth} />
          </div>
          <Footer />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default RecoveryPage;
