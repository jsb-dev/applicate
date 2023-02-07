import React, { useState } from 'react';
import { Button } from '@mui/material';
import StyledButton from '../../../shared/styledButton.jsx';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ShareIcon from '../../../../assets/icons/share.png';
import StyledDialog from '../../../shared/styledDialog.jsx';

const CollabButton = ({ docId, fileName }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

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

    const user = localStorage.getItem('userId');
    fetch('/document/share', {
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
      <StyledButton
        onClick={handleShow}
        style={{
          backgroundImage: `url(${ShareIcon})`,
          backgroundSize: 'max(2.5vw, 3.5vh)',
        }}
      />
      <StyledDialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Share Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter an email address for someone to collaborate with you on
            "{fileName}"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={value}
            onChange={handleChange}
          />
          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default CollabButton;
