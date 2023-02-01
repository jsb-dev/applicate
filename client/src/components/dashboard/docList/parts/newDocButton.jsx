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
import AddIcon from '../../../../assets/icons/add.png';

const StyledButton = styled(Button)({
  borderRadius: 200,
  border: 'solid 2px #2e393b',
  boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
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
            collaborators: data.collaborators,
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Tooltip title="Create a new document">
        <StyledButton
          onClick={handleShow}
          style={{
            backgroundImage: `url(${AddIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 200,
              width: '100%',
              height: '100%',
            }}
          ></div>
        </StyledButton>
      </Tooltip>
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Enter a file name</DialogTitle>
        <DialogContent>
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
          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}
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
