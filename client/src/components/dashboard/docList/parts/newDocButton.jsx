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
import { Tooltip } from '@mui/material';
import AddIcon from '../../../../assets/icons/add.png';
import StyledButton from '../../../shared/styledButton.jsx';

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
    <>
      <Tooltip title="Create a new document">
        <StyledButton
          onClick={handleShow}
          style={{
            backgroundImage: `url(${AddIcon})`,
          }}
        />
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
    </>
  );
}

export default NewDocButton;
