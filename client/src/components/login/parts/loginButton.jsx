import React from 'react';
import { useMediaQuery } from '@mui/material';
import StyledButton from '../styled/formButtons';

const LoginButton = ({ email, password }) => {
  let isMobile = useMediaQuery('(max-width:480px)');
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
        localStorage.setItem('userId', data.user._id);
        console.log(data.user._id);
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
      onClick={handleLogin}
      style={{ width: isMobile ? '100%' : '150%' }}
    >
      Log in
    </StyledButton>
  );
};

export default LoginButton;
