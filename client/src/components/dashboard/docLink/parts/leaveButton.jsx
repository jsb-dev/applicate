import React, { useState } from 'react';
import StyledButton from '../../../shared/styledButton.jsx';
import ExitIcon from '../../../../assets/icons/exit.png';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledDialog from '../../../shared/styledDialog.jsx';
import StyledDialogButton from '../../../shared/styledDialogButton.jsx';
import StyledAlert from '../../../shared/styledAlert.jsx';

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
          <StyledDialogButton onClick={handleCancel}>No</StyledDialogButton>
          <StyledDialogButton onClick={handleConfirm} autoFocus>
            Yes
          </StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default LeaveButton;
