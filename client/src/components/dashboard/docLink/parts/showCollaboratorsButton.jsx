import React, { useState, useEffect } from 'react';
import env from 'react-dotenv';
import { CheckDevice } from '../../../../utils/CheckDevice.jsx';
import StyledButton from '../../../shared/styledButton.jsx';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RemoveCollaboratorButton from './removeCollaboratorButton.jsx';
import UsersIcon from '../../../../assets/icons/users.png';
import StyledDialog from '../../../shared/styledDialog.jsx';

const ShowCollaboratorsButton = ({
  fileName,
  email,
  author,
  collaborators,
  docId,
}) => {
  const [show, setShow] = useState(false);
  const [collaboratorEmails, setCollaboratorEmails] = useState([]);

  const { REACT_APP_API_URL } = env;

  const isMobile = CheckDevice();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}utils/collaborators`, {
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
      <div onClick={handleShow}>
        <StyledButton image={UsersIcon} />
      </div>
      <StyledDialog
        open={show}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Collaborators'}</DialogTitle>
        <DialogContent
          style={{
            overflow: 'hidden',
          }}
        >
          {collaboratorEmails.length === 0 ? (
            <DialogContentText id="alert-dialog-description">
              <p
                style={{
                  color: 'white',
                }}
              >
                Collaborators you add to "{fileName}" will appear here.
              </p>
            </DialogContentText>
          ) : (
            <>
              <DialogContentText id="alert-dialog-description">
                <p
                  style={{
                    color: 'white',
                  }}
                >
                  The current collaborators with access to "{fileName}":
                </p>
              </DialogContentText>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                }}
              >
                <br />
                {collaboratorEmails.map((collaborator) => (
                  <li
                    key={collaborator}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: isMobile ? '8vh' : '6vh',
                    }}
                  >
                    {collaborator.length > 15
                      ? collaborator.substring(0, 15) + '...'
                      : collaborator}
                    {email === author ? (
                      <RemoveCollaboratorButton
                        setCollaboratorEmails={setCollaboratorEmails}
                        email={collaborator}
                        docId={docId}
                      />
                    ) : null}
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
