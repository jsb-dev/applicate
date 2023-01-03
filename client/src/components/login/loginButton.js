import React from 'react';
import { Button } from '@mui/material';

const LoginButton = ({ email, password }) => {
  const handleLogin = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Log in successful');
          window.location.href = '/dashboard';
          return response.json();
        }
        throw new Error('Log in failed');
      })
      .then((data) => {
        console.log(data);
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
