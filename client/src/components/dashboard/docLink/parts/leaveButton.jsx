import React, { useState } from 'react';
import { Button } from '@mui/material';
import StyledButton from '../../../shared/styledButton.jsx';
import ExitIcon from '../../../../assets/icons/exit.png';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledDialog from '../../../shared/styledDialog.jsx';

const LeaveButton = ({ docId, fileName, email, setDocuments }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch('document/unshare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docId: docId,
          email: email,
        }),
      });
      const res = await response.json();
      if (res.success) {
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
          backgroundImage: `url(${ExitIcon})`,
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
            Would you like to remove yourself as a collaborator from "{fileName}
            "?
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

export default LeaveButton;
