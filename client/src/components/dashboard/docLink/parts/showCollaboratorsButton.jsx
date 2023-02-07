import React, { useState, useEffect } from 'react';
import StyledButton from '../../../shared/styledButton.jsx';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCollaboratorButton from './removeCollaboratorButton.jsx';
import UsersIcon from '../../../../assets/icons/users.png';
import StyledDialog from '../../../shared/styledDialog.jsx';

const ShowCollaboratorsButton = ({ fileName, collaborators, docId }) => {
  const [show, setShow] = useState(false);
  const [collaboratorEmails, setCollaboratorEmails] = useState([]);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetch('api/collaborators', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collaborators: collaborators,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        try {
          setCollaboratorEmails(res.collaborators);
        } catch (error) {
          console.error(error);
        }
      });
  }, [collaborators]);

  return (
    <>
      <StyledButton
        onClick={handleShow}
        style={{
          backgroundImage: `url(${UsersIcon})`,
          backgroundSize: 'max(3.5vw, 4.5vh)',
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
          <br />
          {collaboratorEmails.length === 0 ? (
            <DialogContentText id="alert-dialog-description">
              Collaborators you add to {fileName} will appear here.
            </DialogContentText>
          ) : (
            <>
              <DialogContentText id="alert-dialog-description">
                The current collaborators with access to {fileName}:
              </DialogContentText>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                }}
              >
                {collaboratorEmails.map((collaborator) => (
                  <li key={collaborator}>
                    {collaborator}
                    <RemoveCollaboratorButton
                      setCollaboratorEmails={setCollaboratorEmails}
                      email={collaborator}
                      docId={docId}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </StyledDialog>
    </>
  );
};

export default ShowCollaboratorsButton;
