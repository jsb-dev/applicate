import React, { useState, useEffect } from 'react';
import LoginPage from './loginPage.jsx';
import ResetPasswordCard from '../components/recovery/resetPasswordCard.jsx';
import NavBar from '../components/global/navBar/navBar.jsx';
import Footer from '../components/global/footer.jsx';

const RecoveryPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const auth = searchParams.get('auth');

  useEffect(() => {
    fetch('/account/resetAuth', {
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
  }, []);

  return (
    <>
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
    </>
  );
};

export default RecoveryPage;
