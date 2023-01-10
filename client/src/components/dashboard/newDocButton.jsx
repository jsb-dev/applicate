import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import Styled from '@emotion/styled';

const StyledButton = Styled(Button)({
  background: 'linear-gradient(45deg, #39d0ff 30%, #00aec2 90%)',
  border: 0,
  borderRadius: 6,
  boxShadow: '2px 4px 8px 0px rgba(40, 0, 0, .6)',
  color: '#ffffff',
  fontWeight: 'bold',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: '#00c486',
    color: '#ffffff',
    boxShadow: '2px 4px 8px 0px rgba(40, 0, 0, .6)',
  },
});

function NewDocButton({ addDocument }) {
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
      setError('Please enter a file name');
      return;
    }

    const token = localStorage.getItem('authToken');

    fetch('/document/create', {
      method: 'POST',
      body: JSON.stringify({ value, token }),
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
          addDocument({ documentId: data.documentId, fileName: data.fileName });
        } else {
          throw new Error('Could not create document, please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <StyledButton variant="contained" onClick={handleShow}>
        Create
      </StyledButton>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Enter a file name</DialogTitle>
        <DialogContent>
          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="File Name"
            type="text"
            fullWidth
            value={value}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default NewDocButton;
