import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import env from 'react-dotenv';
import StyledButton from '../styled/styledButton';
import StyledDialog from '../../shared/styledDialog';
import StyledDialogButton from '../../shared/styledDialogButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import StyledAlert from '../../shared/styledAlert';

const LoginButton = ({ email, password }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const { REACT_APP_API_URL } = env;

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter an email and password');
      setOpen(true);
      return;
    }

    const response = await fetch(`${REACT_APP_API_URL}account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || 'An error occurred');
      setOpen(true);
      return;
    }

    const data = await response.json();
    if (!data.success) {
      setError(data.message);
      setOpen(true);
      return;
    }

    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userEmail', data.user.email);
    const userId = data.user._id;
    localStorage.setItem('userId', userId);
    navigate(`/dashboard?userId=${userId}`);
  };

  return (
    <>
      <StyledButton variant="contained" color="primary" onClick={handleLogin}>
        Log in
      </StyledButton>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Whoops!</DialogTitle>
        {error && (
          <DialogContent>
            <StyledAlert
              style={{
                color: 'red',
              }}
            >
              {error}
            </StyledAlert>
          </DialogContent>
        )}
        <DialogActions>
          <StyledDialogButton onClick={handleClose}>Close</StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default LoginButton;
