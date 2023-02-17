import React, { useState } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import StyledDialog from '../../shared/styledDialog';
import StyledDialogButton from '../../shared/styledDialogButton';
import StyledTextField from '../../shared/styledTextField';
import StyledAlert from '../../shared/styledAlert';

const ForgotPasswordLink = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmail('');
    setError('');
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      const response = await fetch('/account/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          'Recovery email sent successfully! Check your email inbox/junk for steps to recover your account'
        );
        setError('');
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
    setEmail('');
  };

  return (
    <>
      {/* eslint-disable-next-line */}
      <a
        href="#"
        onClick={handleClickOpen}
        style={{
          color: '#0daabd',
          '& hover': {
            color: '#0daabd',
          },
        }}
      >
        Forgot Password
      </a>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p
              style={{
                color: 'white',
              }}
            >
              To recover your account, please enter the email you use to log in,
              and we'll sernd you a link to change your password.
            </p>
          </DialogContentText>
          {message && (
            <StyledAlert style={{ color: 'green' }}>{message}</StyledAlert>
          )}
          <StyledTextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 3% 1% 3%',
            }}
          >
            <StyledDialogButton onClick={handleClose}>
              Cancel
            </StyledDialogButton>
            <StyledDialogButton onClick={handleSubmit}>
              Submit
            </StyledDialogButton>
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default ForgotPasswordLink;
