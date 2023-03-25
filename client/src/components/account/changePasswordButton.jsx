import React, { useState } from 'react';
import env from 'react-dotenv';
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

function ChangePasswordButton() {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: '',
  });

  const { REACT_APP_API_URL } = env;

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordData({ ...passwordData, error: 'Passwords do not match' });
      return;
    } else if (passwordData.newPassword.length < 7) {
      setPasswordData({
        ...passwordData,
        error: 'Password must be at least 7 characters',
      });
      return;
    } else if (passwordData.newPassword === passwordData.currentPassword) {
      setPasswordData({
        ...passwordData,
        error: 'New password cannot be the same as the current password',
      });
      return;
    }

    const response = await fetch(`${REACT_APP_API_URL}account/password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }),
    });

    const res = await response.json();

    if (res.success) {
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        error: '',
      });
      setOpenPasswordDialog(false);
      logoutUser();
    } else {
      setPasswordData({ ...passwordData, error: res.message });
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
        onClick={() => setOpenPasswordDialog(true)}
        style={{
          margin: 0,
        }}
      >
        Change Password
      </StyledButton>
      <StyledDialog
        open={openPasswordDialog}
        onClose={() => {
          setOpenPasswordDialog(false);
          setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: '',
          });
        }}
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <p
            style={{
              color: 'white',
            }}
          >
            You will be logged out after changing your password, please log in
            afterward with your new password
          </p>
          <FormControl
            style={{
              padding: 0,
              margin: 0,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={fieldContainer}>
              <StyledTextField
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />
            </div>
            <div style={fieldContainer}>
              <StyledTextField
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
            </div>
            <div style={fieldContainer}>
              <StyledTextField
                label="Confirm Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            {passwordData.error ? (
              <FormHelperText
                error
                style={{
                  fontSize: '12pt',
                  fontWeight: 'bold',
                  color: 'red',
                }}
              >
                {passwordData.error}
              </FormHelperText>
            ) : null}
          </FormControl>
        </DialogContent>

        <DialogActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '5%',
            }}
          >
            <StyledDialogButton
              onClick={() => {
                setOpenPasswordDialog(false);
                setPasswordData({
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                  error: '',
                });
              }}
            >
              Cancel
            </StyledDialogButton>
            <StyledDialogButton onClick={handlePasswordChange}>
              Change Password
            </StyledDialogButton>
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default ChangePasswordButton;
