import React, { useState } from 'react';
import env from 'react-dotenv';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledTextField from '../shared/styledTextField.jsx';
import StyledAlert from '../shared/styledAlert.jsx';

function ContactCard() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { REACT_APP_API_URL } = env;

  const token = localStorage.getItem('authToken');

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const validateEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };

  const validateInput = () => {
    if (!userEmail || !validateEmail(userEmail)) {
      return 'Please provide a valid email address.';
    }
    if (!subject) {
      return 'Please provide a subject for your query.';
    }
    if (!description) {
      return 'Please provide a brief description.';
    }
    return '';
  };

  const handleSubmit = async () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch(`${REACT_APP_API_URL}contact/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail, subject, description }),
      });

      const res = await response.json();

      if (res.success) {
        setMessage("Thanks! We'll be in touch soon");
        setSubject('');
        setDescription('');
        setUserEmail('');
      } else {
        setError(res.message || 'An error occurred. Please try again later.');
      }
    } catch (err) {
      setError(
        'There was a problem sending your message. Please try again later.'
      );
    }
  };

  const fieldContainer = {
    margin: isMobile ? '3%' : '1%',
    width: '100%',
  };

  return (
    <Card
      style={{
        margin: isMobile ? '30% 0 15% 0' : isTablet ? '20% 0 10% 0' : '10%',
        padding: '2%',
        backgroundColor: '#222c30',
        color: '#fff',
        borderRadius: 20,
        boxShadow: '0 0 10px 1 #fff',
      }}
    >
      <CardHeader
        title="Contact Us"
        avatar={
          <Avatar>
            <IconButton>
              <Typography>C</Typography>
            </IconButton>
          </Avatar>
        }
      />
      <CardContent
        style={{
          maxWidth: '70vw',
        }}
      >
        <Typography>
          Provide a subject and description of why you're contacting us, and
          we'll get back to you via email ASAP
        </Typography>
        <br />
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={fieldContainer}>
            <StyledTextField
              label="Your Email Address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              autoFocus
            />
          </div>
          <div style={fieldContainer}>
            <StyledTextField
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div style={fieldContainer}>
            <StyledTextField
              label="Brief Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={8}
            />
          </div>
        </section>
        {error ? (
          <StyledAlert style={{ color: 'red' }}>{error}</StyledAlert>
        ) : (
          message && (
            <StyledAlert style={{ color: 'green' }}>{message}</StyledAlert>
          )
        )}
      </CardContent>
      <CardActions>
        <Button
          onClick={handleSubmit}
          style={{
            color: '#39d0ff ',
          }}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
}

export default ContactCard;
