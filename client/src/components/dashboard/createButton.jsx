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
    const token = localStorage.getItem('authToken');

    fetch('/document/create', {
      method: 'POST',
      body: JSON.stringify({ value, token }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const { documentId, fileName } = data;
          const docLink = <DocLink docId={documentId} fileName={fileName} />;
          createRoot(document.getElementById('docList')).render(docLink);
          setShow(false);
        } else {
          throw new Error('Could not create document, please try again.');
        }
      })
      .catch((error) => {
        console.error(error);
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
