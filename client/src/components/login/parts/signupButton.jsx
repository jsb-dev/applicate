import React, { useState } from 'react';
import StyledButton from '../styled/styledButton';
import StyledDialog from '../../shared/styledDialog';
import StyledDialogButton from '../../shared/styledDialogButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import StyledAlert from '../../shared/styledAlert';

const SignupButton = ({ email, password }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Please enter an email and password');
      setOpen(true);
      return;
    }
    try {
      const response = await fetch('/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        setError(response.message);
        setOpen(true);
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
      localStorage.setItem('userId', data.user._id);
      const searchParams = new URLSearchParams();
      searchParams.set('userId', userId);
      const href = `/dashboard?${searchParams.toString()}`;
      window.location.href = href;
    } catch (error) {
      console.error(error);
      setError(error);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledButton variant="contained" color="primary" onClick={handleSignup}>
        Sign up
      </StyledButton>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Whoops!</DialogTitle>
        <DialogContent>
          {error && (
            <StyledAlert
              style={{
                color: 'red',
              }}
            >
              {error}
            </StyledAlert>
          )}
        </DialogContent>
        <DialogActions>
          <StyledDialogButton onClick={handleClose}>Close</StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default SignupButton;
