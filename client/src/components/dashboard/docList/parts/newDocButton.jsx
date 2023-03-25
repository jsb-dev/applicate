import React, { useState } from 'react';
import env from 'react-dotenv';
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Tooltip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddIcon from '../../../../assets/icons/add.png';
import StyledButton from '../../../shared/styledButton.jsx';
import StyledDialog from '../../../shared/styledDialog.jsx';
import StyledDialogButton from '../../../shared/styledDialogButton.jsx';
import StyledAlert from '../../../shared/styledAlert.jsx';
import StyledTextField from '../../../shared/styledTextField.jsx';

function NewDocButton({ addDocument }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const { REACT_APP_API_URL } = env;

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

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

    fetch(`${REACT_APP_API_URL}document/create`, {
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
        <div onClick={handleShow}>
          <StyledButton image={AddIcon} />
        </div>
      </Tooltip>
      <StyledDialog open={show} onClose={handleClose}>
        <DialogTitle>Enter a file name</DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            id="name"
            label="File Name"
            type="text"
            fullWidth
            value={value}
            onChange={handleChange}
            style={{
              minWidth: isMobile ? '' : isTablet ? '50vw' : '30vw',
            }}
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
          <StyledDialogButton
            onClick={handleClose}
            style={{
              marginRight: '10%',
            }}
          >
            Cancel
          </StyledDialogButton>
          <StyledDialogButton onClick={handleSubmit}>Submit</StyledDialogButton>
        </DialogActions>
      </StyledDialog>
    </>
  );
}

export default NewDocButton;
