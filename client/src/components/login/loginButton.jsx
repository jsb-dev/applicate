import React from 'react';
import { Button } from '@mui/material';

const LoginButton = ({ email, password }) => {
  const handleLogin = () => {
    fetch('/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Log in successful');
          return response.json();
        }
        throw new Error('Log in failed');
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Log in
    </Button>
  );
};

export default LoginButton;
