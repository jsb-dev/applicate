import React from 'react';
import { Button } from '@mui/material';

const SignupButton = ({ email, password }) => {
  const handleSignup = () => {
    fetch('/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Sign up successful');
          return response.json();
        }
        throw new Error('Sign up failed');
      })
      .then((data) => {
        console.log(data);

        // Set the authToken in session storage
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Button variant="contained" color="primary" onClick={handleSignup}>
      Sign up
    </Button>
  );
};

export default SignupButton;
