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
      return setError(
        'That email is not associated with this account, please enter the correct email'
      );
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

  return (
    <>
      <StyledButton onClick={() => setOpen(true)}>Delete Account</StyledButton>
      <StyledDialog open={open} onClose={() => setOpen(false)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}
        >
          <h2>
            Please enter your username and password to remove your account from
            our database. This will delete any documents that you have authored,
            including documents that others have access to. THIS CANNOT BE
            UNDONE.
          </h2>
          {error && <StyledAlert style={{ color: 'red' }}>{error}</StyledAlert>}
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
            <StyledTextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton type="submit">Submit</StyledButton>
            <StyledButton onClick={() => setOpen(false)}>Cancel</StyledButton>
          </form>
        </div>
      </StyledDialog>
    </>
  );
};

export default DeleteAccountButton;
