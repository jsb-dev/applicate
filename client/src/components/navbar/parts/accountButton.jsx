import React from 'react';
import Button from '@mui/material/Button';

const AccountButton = () => {
  const handleClick = () => {
    const userId = localStorage.getItem('userId');
    const searchParams = new URLSearchParams();
    searchParams.set('userId', userId);
    const href = `/account?${searchParams.toString()}`;
    window.location.href = href;
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        handleClick();
      }}
    >
      Account
    </Button>
  );
};

export default AccountButton;
