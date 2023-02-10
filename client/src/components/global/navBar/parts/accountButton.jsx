import React from 'react';
import StyledButton from '../styled/styledButton.jsx';

const AccountButton = () => {
  const handleClick = () => {
    const userId = localStorage.getItem('userId');
    const searchParams = new URLSearchParams();
    searchParams.set('userId', userId);
    const href = `/account?${searchParams.toString()}`;
    window.location.href = href;
  };

  return (
    <StyledButton
      variant="contained"
      color="primary"
      onClick={() => {
        handleClick();
      }}
    >
      Account
    </StyledButton>
  );
};

export default AccountButton;
