import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import DeleteIcon from '../../../assets/icons/delete.png';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteDocButton = ({ docId, fileName, author, setDocuments }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const StyledButton = styled(Button)({
    backgroundColor: '#ff0000',
    backgroundImage: `url(${DeleteIcon})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 10,
    boxShadow: '0px 0px 4px 2px #171717',
    color: '#182021',
    minWidth: 40,
    minHeight: 40,
    '&:hover': {
      transform: 'scale(1.1)',
      backgroundColor: '#ff6969',
      boxShadow: '0px 0px 4px 2px rgba(#171717, 0.2)',
    },
    transition: 'all 0.3s ease',
  });

  const StyledDialog = styled(Dialog)({
    '& .MuiDialog-paper': {
      borderRadius: 20,
      overflow: 'hidden',
    },
  });

  const handleClick = () => {
    setConfirmOpen(true);
    console.log(docId, fileName, author);
  };

  const handleConfirm = async () => {
    setConfirmOpen(false);
    try {
      const response = await fetch('/document/delete', {
        method: 'POST',
        body: JSON.stringify({ docId, author }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc.id !== docId)
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
        <DialogTitle id="alert-dialog-title">{'Delete Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete "{fileName}"?
          </DialogContentText>
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
