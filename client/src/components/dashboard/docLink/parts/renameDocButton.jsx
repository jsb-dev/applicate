import React, { useState } from 'react';
import StyledButton from '../../../shared/styledButton.jsx';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import RenameIcon from '../../../../assets/icons/rename.png';
import StyledDialog from '../../../shared/styledDialog.jsx';
import StyledDialogButton from '../../../shared/styledDialogButton.jsx';
import StyledAlert from '../../../shared/styledAlert.jsx';

const RenameDocButton = ({ docId, author, fileName, setDocuments }) => {
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

    fetch('/document/rename', {
      method: 'POST',
      body: JSON.stringify({ docId, author, value }),
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
          setDocuments((prevDocuments) =>
            prevDocuments.map((document) =>
              document.id === docId || document.documentId === docId
                ? { ...document, fileName: value }
                : document
            )
          );
        } else {
          setError('Could not rename document, please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <StyledButton
        onClick={handleShow}
        style={{
          backgroundImage: `url(${RenameIcon})`,
        }}
      />
      <StyledDialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Rename Document'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please enter a new name for "{fileName}"
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="file-name"
            label="New File Name"
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
          <StyledDialogButton onClick={handleSubmit} autoFocus>
            Submit
          </StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
};

export default RenameDocButton;
