import React from 'react';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv';
import logoutUser from '../../../../utils/logoutUser.js';
import StyledButton from '../styled/styledButton.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';

function LogoutButton() {
  const { REACT_APP_API_URL } = env;
  const navigate = useNavigate();

  const isTablet = useMediaQuery('(max-width: 960px)');

  function logout() {
    const token = localStorage.getItem('authToken');

    try {
      fetch(`${REACT_APP_API_URL}account/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            logoutUser();
            navigate('/');
          }
        });
    } catch (error) {
      console.error(error);
    }
  }

  // Desktop View
  function DesktopButton() {
    return (
      <>
        <StyledButton variant="contained" onClick={logout}>
          Log out
        </StyledButton>
      </>
    );
  }

  // Mobile View
  function MobileButton() {
    return (
      <>
        <StyledButton variant="contained" onClick={logout}>
          Logout
        </StyledButton>
      </>
    );
  }

  return <>{isTablet ? <MobileButton /> : <DesktopButton />}</>;
}

export default LogoutButton;
