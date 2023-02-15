import React, { useState } from 'react';
import {
  Link,
  TextField,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import StyledDialog from '../../shared/styledDialog';
import StyledDialogButton from '../../shared/styledDialogButton';
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
      <Link onClick={handleClickOpen} style={{ color: '#0daabd' }}>
        Forgot Password
      </Link>
      <StyledDialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your email</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To recover your account, please enter the email you use to log in,
            and we'll sernd you a link to change your password.
          </DialogContentText>
          <br />
          {message && (
            <StyledAlert style={{ color: 'green' }}>{message}</StyledAlert>
          )}
          <TextField
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
          <StyledDialogButton onClick={handleClose}>Cancel</StyledDialogButton>
          <StyledDialogButton onClick={handleSubmit}>Submit</StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default ForgotPasswordLink;
