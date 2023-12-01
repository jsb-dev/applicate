import React, { useState } from 'react';
import env from 'react-dotenv';
import { DialogActions, DialogContent } from '@mui/material';
import { CheckOrientation } from '../../utils/CheckOrientation.jsx';
import { CheckDevice } from '../../utils/CheckDevice.jsx';
import StyledButton from './styled/styledButton.jsx';
import StyledDialog from '../shared/styledDialog.jsx';
import StyledTextField from '../shared/styledTextField.jsx';
import logoutUser from '../../utils/logoutUser.js';
import StyledAlert from '../shared/styledAlert.jsx';

const DeleteAccountButton = ({ userId, userEmail }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { REACT_APP_API_URL } = env;

  const isVertical = CheckOrientation();
  const isMobile = CheckDevice();

  const handleSubmit = async () => {
    if (email !== userEmail) {
      return setError('Incorrect email');
    }

    try {
      const response = await fetch(`${REACT_APP_API_URL}account/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });
      const data = await response.json();
      if (!data.success) {
        return setError(data.message);
      }
      logoutUser();
    } catch (error) {
      setError(error.message);
    }
  };

  const fieldContainer = {
    margin: '3%',
    width: '100%',
  };

  const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    margin: '3%',
    width: '100%',
  };

  return (
    <>
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        style={{ margin: 0 }}
      >
        Delete Account
      </StyledButton>
      <StyledDialog
        open={open}
        onClose={() => {
          setError('');
          setOpen(false);
        }}
      >
        <DialogContent
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '3%',
          }}
        >
          <article
            style={{ paddingTop: !isVertical && isMobile ? '160px' : '' }}
          >
            <p>
              Please enter your username and password to remove your account
              from our database. This will delete any documents that you have
              authored, including documents that others have access to.{' '}
              <b
                style={{
                  color: 'red',
                }}
              >
                THIS CANNOT BE UNDONE.
              </b>
            </p>
          </article>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
            }}
          >
            <div style={fieldContainer}>
              <StyledTextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={fieldContainer}>
              <StyledTextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <StyledAlert style={{ color: 'red' }}>{error}</StyledAlert>
            )}
            <DialogActions
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width: '100%',
              }}
            >
              <div style={buttonContainer}>
                <StyledButton
                  type="submit"
                  style={{
                    height: '100%',
                  }}
                >
                  Submit
                </StyledButton>
              </div>
              <div style={buttonContainer}>
                <StyledButton
                  onClick={() => setOpen(false)}
                  style={{
                    height: '100%',
                  }}
                >
                  Cancel
                </StyledButton>
              </div>
            </DialogActions>
          </form>
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default DeleteAccountButton;
