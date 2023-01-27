import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const RenameDocButton = ({ docId, author, fileName, setDocuments }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const StyledButton = styled(Button)({
    backgroundColor: '#0767de',
    borderRadius: 10,
    boxShadow: '0px 0px 4px 2px #171717',
    color: '#182021',
    minWidth: 40,
    minHeight: 40,
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#4089e6',
      boxShadow: '0px 0px 4px 2px rgba(#171717, 0.2)',
      transition: 'all 0.3s ease',
    },
  });

  const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
      borderRadius: 20,
      overflow: 'hidden',
    },
  });

  const handleClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    setConfirmOpen(false);

    const value = document.getElementById('file-name').value;

    try {
      const response = await fetch('/document/rename', {
        method: 'POST',
        body: JSON.stringify({ docId, author, value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setDocuments((prevDocuments) =>
          prevDocuments.map((document) =>
            document._id === docId ? { ...document, fileName: value } : document
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <StyledButton onClick={handleClick} />
      <StyledDialog
        open={confirmOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Rename Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter a new name for "{fileName}"
          </DialogContentText>
          <TextField
            id="file-name"
            label="New File Name"
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Rename
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default RenameDocButton;
