import React, { useState } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
} from '@mui/material';
import StyledDialog from '../shared/styledDialog.jsx';
import StyledDialogButton from '../shared/styledDialogButton.jsx';
import StyledTextField from '../shared/styledTextField.jsx';
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

  const fieldContainer = {
    margin: '3%',
    width: '100%',
  };

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setOpenEmailDialog(true)}
        style={{
          margin: 0,
        }}
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
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              color: 'white',
            }}
          >
            You will be logged out after changing your email, please log in
            afterward with your new email
          </p>
          <FormControl
            style={{
              padding: 0,
              margin: 0,
              width: '80%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={fieldContainer}>
              <StyledTextField
                label="Password"
                type="password"
                value={emailData.password}
                onChange={(e) =>
                  setEmailData({ ...emailData, password: e.target.value })
                }
              />
            </div>
            <div style={fieldContainer}>
              <StyledTextField
                label="New Email"
                value={emailData.newEmail}
                onChange={(e) =>
                  setEmailData({ ...emailData, newEmail: e.target.value })
                }
              />
            </div>
            <div style={fieldContainer}>
              <StyledTextField
                label="Confirm Email"
                value={emailData.confirmEmail}
                onChange={(e) =>
                  setEmailData({ ...emailData, confirmEmail: e.target.value })
                }
              />
            </div>
            <FormHelperText
              error={Boolean(emailData.error)}
              style={{
                fontSize: '12pt',
                fontWeight: 'bold',
                color: 'red',
              }}
            >
              {emailData.error}
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 5% 5% 5%',
            }}
          >
            <StyledDialogButton onClick={() => setOpenEmailDialog(false)}>
              Cancel
            </StyledDialogButton>
            <StyledDialogButton onClick={handleEmailChange}>
              Change Email
            </StyledDialogButton>
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default ChangeEmailButton;
