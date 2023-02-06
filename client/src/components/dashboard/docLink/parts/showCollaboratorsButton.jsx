import React, { useState } from 'react';
import styled from '@emotion/styled';
import StyledButton from '../../shared/styledButton.jsx';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UsersIcon from '../../../../assets/icons/users.png';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    overflow: 'hidden',
  },
});

const ShowCollaboratorsButton = ({ collaborators, fileName }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <StyledButton
        onClick={handleShow}
        style={{
          backgroundImage: `url(${UsersIcon})`,
        }}
      />
      <StyledDialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Collaborators'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The current collaborators with access to {fileName}:
          </DialogContentText>
          {/*

        Make a fetch request before this to find the emails for each collaborator id

          {collaboratorEmails.map((collaborator) => (
            <DialogContentText key={collaborator}>
              {collaborator}
            </DialogContentText>
          ))}
          */}
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default ShowCollaboratorsButton;
