import React, { useState } from 'react';
import StyledButton from '../../../shared/styledButton.jsx';
import DeleteIcon from '../../../../assets/icons/delete.png';
import StyledAlert from '../../../shared/styledAlert.jsx';

const DeleteDocButton = ({ setCollaboratorEmails, email, docId }) => {
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const res = await fetch('document/unshare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docId: docId,
          email: email,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCollaboratorEmails((prevEmails) =>
          prevEmails.filter((e) => e !== email)
        );
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <StyledButton
        onClick={handleClick}
        style={{
          backgroundImage: `url(${DeleteIcon})`,
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
    </>
  );
};

export default DeleteDocButton;
