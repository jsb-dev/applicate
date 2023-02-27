import React, { useState } from 'react';
import StyledButton from '../../../shared/styledButton.jsx';
import DeleteIcon from '../../../../assets/icons/delete.png';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StyledDialog from '../../../shared/styledDialog.jsx';
import StyledDialogButton from '../../../shared/styledDialogButton.jsx';
import StyledAlert from '../../../shared/styledAlert.jsx';

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
      <div onClick={handleClick}>
        <StyledButton image={DeleteIcon} />
      </div>
      <StyledDialog
        open={confirmOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p
              style={{
                color: 'white',
              }}
            >
              Are you sure you want to delete {fileName}?
            </p>
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

export default DeleteDocButton;
