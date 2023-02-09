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
import StyledDialog from '../shared/styledDialog.jsx';
import logoutUser from '../../utils/logoutUser.js';

function ChangePasswordButton() {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    error: '',
  });

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

    const response = await fetch('/account/password', {
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

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenPasswordDialog(true)}
      >
        Change Password
      </Button>
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
          You will be logged out after changing your password, please log in
          afterward with your new password
          <br />
          <br />
          <FormControl>
            <TextField
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
            <TextField
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
            <TextField
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
            {passwordData.error ? (
              <FormHelperText error>{passwordData.error}</FormHelperText>
            ) : null}
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
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
          </Button>
          <Button onClick={handlePasswordChange}>Change Password</Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

export default ChangePasswordButton;
