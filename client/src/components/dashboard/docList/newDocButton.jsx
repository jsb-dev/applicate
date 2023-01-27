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
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import AddIcon from '../../../assets/icons/add.png';

const StyledButton = styled(Button)({
  borderRadius: 200,
  border: 'solid 2px #2e393b',
  boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
  width: 70,
  height: 70,
  maxHeight: '70vw',
  '&:hover': {
    boxShadow: '0px 0px 12px 5px #fff',
    border: 'solid 2px #fff',
    transform: 'scale(1)',
    transition: 'all 0.4s ease-in-out',
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
      body: JSON.stringify({ value }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setShow(false);
          setError(null);
          setValue('');
          addDocument({
            author: data.author,
            dateCreated: data.dateCreated,
            dateModified: data.dateModified,
            fileName: data.fileName,
            documentId: data.documentId,
          });
        } else {
          setError('Could not create document, please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      style={{
        height: '100%',
        maxHeight: 'min(50vh, 50vw)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledButton onClick={handleShow}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            width: '70%',
            borderRadius: 200,
            height: '70%',
          }}
        >
          <Tooltip title="Create a new document">
            <img
              src={AddIcon}
              alt="Document icon"
              style={{
                display: 'block',
                width: '60%',
              }}
            />
          </Tooltip>
        </div>
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
    </div>
  );
}

export default NewDocButton;
