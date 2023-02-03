import React from 'react';
import { useMediaQuery } from '@mui/material';
import StyledButton from '../styled/formButtons';

const SignupButton = ({ email, password }) => {
  let isMobile = useMediaQuery('(max-width:480px)');
  let isTablet = useMediaQuery('(max-width:960px)');

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
        localStorage.setItem('userEmail', data.user.email);
        const userId = data.user._id;
        localStorage.setItem('userId', data.user._id);
        const searchParams = new URLSearchParams();
        searchParams.set('userId', userId);
        const href = `/dashboard?${searchParams.toString()}`;
        window.location.href = href;
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
      style={{
        width: isMobile ? '120%' : isTablet ? '130%' : '150%',
        borderRadius: 15,
      }}
    >
      Sign up
    </StyledButton>
  );
};

export default SignupButton;
