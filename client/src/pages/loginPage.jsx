import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../components/navbar/navBar.jsx';
import LoginForm from '../components/login/loginForm.jsx';

const LoginPage = () => {
  let isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <div>
      <Navbar />
      <main
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <div
          style={{
            color: 'white',
            width: isMobile ? '90vw' : '50vw',
          }}
        >
          This is the home content next to where the user will be able to login.
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '3%',
          }}
        >
          <LoginForm />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
