import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledDialog from '../shared/styledDialog.jsx';
import StyledButton from './styled/styledButton.jsx';
import logoutUser from '../../utils/logoutUser.js';

function ChangeEmailButton() {
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [emailData, setEmailData] = useState({
    password: '',
    newEmail: '',
    confirmEmail: '',
    error: '',
  });

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleEmailChange = async () => {
    if (emailData.newEmail !== emailData.confirmEmail) {
      setEmailData({ ...emailData, error: 'Emails do not match' });
      return;
    }
    const response = await fetch('/account/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        password: emailData.password,
        newEmail: emailData.newEmail,
      }),
    });

    const res = await response.json();

    if (res.success) {
      setEmailData({
        password: '',
        newEmail: '',
        confirmEmail: '',
        error: '',
      });
      setOpenEmailDialog(false);
      logoutUser();
    } else {
      setEmailData({ ...emailData, error: res.message });
    }
  };

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setOpenEmailDialog(true)}
      >
        Change Email
      </StyledButton>
      <StyledDialog
        open={openEmailDialog}
        onClose={() => {
          setOpenEmailDialog(false);
          setEmailData({
            password: '',
            newEmail: '',
            confirmEmail: '',
            error: '',
          });
        }}
      >
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          You will be logged out after changing your email, please log in
          afterward with your new email
          <br />
          <br />
          <FormControl>
            <TextField
              label="Password"
              type="password"
              value={emailData.password}
              onChange={(e) =>
                setEmailData({ ...emailData, password: e.target.value })
              }
            />
            <TextField
              label="New Email"
              value={emailData.newEmail}
              onChange={(e) =>
                setEmailData({ ...emailData, newEmail: e.target.value })
              }
            />
            <TextField
              label="Confirm Email"
              value={emailData.confirmEmail}
              onChange={(e) =>
                setEmailData({ ...emailData, confirmEmail: e.target.value })
              }
            />
            <FormHelperText error={Boolean(emailData.error)}>
              {emailData.error}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmailDialog(false)}>Cancel</Button>
          <Button onClick={handleEmailChange} color="primary">
            Change Email
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default ChangeEmailButton;
