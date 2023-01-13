import React from 'react';
import { useMediaQuery } from '@mui/material';
import StyledButton from '../styled/formButtons';

const SignupButton = ({ email, password }) => {
  let isMobile = useMediaQuery('(max-width:480px)');
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
          return response.json();
        }
        throw new Error('Sign up failed');
      })
      .then((data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.user._id);
        window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={handleSignup}
      style={{ width: isMobile ? '100%' : '150%' }}
    >
      Sign up
    </StyledButton>
  );
};

export default SignupButton;
