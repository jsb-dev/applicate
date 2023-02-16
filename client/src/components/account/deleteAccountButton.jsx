import React, { useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== userEmail) {
      return setError('Incorrect email');
    }

    try {
      const response = await fetch('/account/delete', {
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
        onClick={() => setOpen(true)}
        style={{
          margin: 0,
        }}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            padding: '3%',
          }}
        >
          <p>
            Please enter your username and password to remove your account from
            our database. This will delete any documents that you have authored,
            including documents that others have access to.{' '}
            <b
              style={{
                color: 'red',
              }}
            >
              THIS CANNOT BE UNDONE.
            </b>
          </p>
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
            <section
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
            </section>
          </form>
        </div>
      </StyledDialog>
    </>
  );
};

export default DeleteAccountButton;
