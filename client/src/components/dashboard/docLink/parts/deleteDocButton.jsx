import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import StyledButton from '../../../shared/styledButton.jsx';
import DeleteIcon from '../../../../assets/icons/delete.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    overflow: 'hidden',
  },
});

const DeleteDocButton = ({ docId, fileName, setDocuments }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch('/document/delete', {
        method: 'POST',
        body: JSON.stringify({ docId, userId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      if (res.success === true) {
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== docId)
        );
        setConfirmOpen(false);
      }
      if (res.success === false) {
        setError(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setError(null);
  };

  return (
    <>
      <StyledButton
        onClick={handleClick}
        style={{
          backgroundImage: `url(${DeleteIcon})`,
          backgroundSize: 'max(2.5vw, 3.5vh)',
        }}
      />
      <StyledDialog
        open={confirmOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{fileName}"?
          </DialogContentText>
          {error && (
            <DialogContentText color="error">{error}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default DeleteDocButton;
