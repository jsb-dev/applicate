import {
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import AddIcon from '../../../../assets/icons/add.png';
import StyledButton from '../../../shared/styledButton.jsx';
import StyledDialog from '../../../shared/styledDialog.jsx';
import StyledDialogButton from '../../../shared/styledDialogButton.jsx';
import StyledAlert from '../../../shared/styledAlert.jsx';

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
      <StyledDialog open={show} onClose={handleClose}>
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
          <StyledDialogButton onClick={handleClose}>Cancel</StyledDialogButton>
          <StyledDialogButton onClick={handleSubmit}>Submit</StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default NewDocButton;
