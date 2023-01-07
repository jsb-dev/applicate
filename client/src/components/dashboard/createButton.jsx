import { Button, Modal, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import DocLink from './docLink.jsx';

function CreateButton() {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (event) => setValue(event.target.value);
  const handleSubmit = () => {
    // Get the user's token from local storage
    const token = localStorage.getItem('authToken');
    // Send a request to the server to create a new Document
    fetch('/create', {
      method: 'POST',
      body: JSON.stringify({ value, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Document was created successfully, get the documentId and fileName values from the response
          const { documentId, fileName } = data;
          // Create a new DocLink element with the documentId and fileName values
          const docLink = <DocLink docId={documentId} fileName={fileName} />;
          // Append the DocLink to the docList element
          createRoot(document.getElementById('docList')).render(docLink);
          // Close the popup
          setShow(false);
        } else {
          // Document was not created, throw an error
          throw new Error('Document creation failed');
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle the error
      });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        CREATE
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter a value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control type="text" value={value} onChange={handleChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateButton;
