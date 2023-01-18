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
import CardContent from '@mui/material/CardContent';
import styled from '@emotion/styled';
import { Tooltip } from '@mui/material';
import AddIcon from '../../../assets/images/add.png';

const StyledButton = styled(Button)({
  borderRadius: 20,
  height: '100%',
  border: 'solid 2px #2e393b',
  boxShadow: '0px 0px 10px 4px #2e393b',
  '&:hover': {
    boxShadow: '0px 0px 12px 5px #fff',
    border: 'solid 2px #fff',
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
          addDocument({
            documentId: data.documentId,
            fileName: data.fileName,
            author: data.author,
            dateCreated: data.dateCreated,
            dateModified: data.dateModified,
          });
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
      <StyledButton onClick={handleShow}>
        <CardContent
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            height: '70%',
            width: '70%',
            borderRadius: 20,
          }}
        >
          <Tooltip title="Plus icons created by dmitri13 - Flaticon">
            <img
              src={AddIcon}
              alt="Document icon"
              style={{
                display: 'block',
                width: '60%',
              }}
            />
          </Tooltip>
        </CardContent>
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
