import React, { useState } from 'react';
import env from 'react-dotenv';
import StyledButton from '../../../shared/styledButton.jsx';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ShareIcon from '../../../../assets/icons/share.png';
import StyledDialog from '../../../shared/styledDialog.jsx';
import StyledDialogButton from '../../../shared/styledDialogButton.jsx';
import StyledTextField from '../../../shared/styledTextField.jsx';
import StyledAlert from '../../../shared/styledAlert.jsx';

const CollabButton = ({ docId, fileName, email }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const { REACT_APP_API_URL } = env;

  const user = localStorage.getItem('userId');

  const handleShow = () => setShow(true);
  const handleChange = (event) => setValue(event.target.value);

  const handleClose = () => {
    setShow(false);
    setValue('');
    setError(null);
  };

  const handleSubmit = () => {
    if (!value) {
      setError('Please enter an email address');
      return;
    }

    if (value === email) {
      setError('You cannot add yourself as a collaborator');
      return;
    }

    fetch(`${REACT_APP_API_URL}document/share`, {
      method: 'POST',
      body: JSON.stringify({ docId, user, value }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShow(false);
          setError(null);
          setValue('');
        } else if (!data.success) {
          setError(data.message);
        } else {
          setError('Could not add collaborator, please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div onClick={handleShow}>
        <StyledButton image={ShareIcon} />
      </div>
      <StyledDialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Share Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p
              style={{
                color: 'white',
              }}
            >
              Please enter an email address for someone to collaborate with you
              on "{fileName}". It will appear in their documents list the next
              time they load their dashboard.
            </p>
          </DialogContentText>
          <StyledTextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={value}
            onChange={handleChange}
          />
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 5%',
            }}
          >
            <div onClick={handleClose}>
              <StyledDialogButton>Cancel</StyledDialogButton>
            </div>
            <div onClick={handleSubmit}>
              <StyledDialogButton>Submit</StyledDialogButton>
            </div>
          </div>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default CollabButton;
