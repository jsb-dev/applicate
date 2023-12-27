import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../styled/styledButton.jsx';

const AccountButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const userId = localStorage.getItem('userId');
    navigate(`/account?userId=${userId}`);
  };

  return (
    <StyledButton variant="contained" color="primary" onClick={handleClick}>
      Account
    </StyledButton>
  );
};

export default AccountButton;
