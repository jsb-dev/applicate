import React, { useState } from 'react';
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

  const token = localStorage.getItem('authToken');

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const handleSubmit = async () => {
    if (!subject || !description || !userEmail) {
      setError(
        'Please provide an email, subject and description for your query'
      );
      return;
    }

    try {
      const response = await fetch('/contact/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userEmail, subject, description }),
      });

      const res = await response.json();

      if (res.success) {
        console.log(res);
        setError('');
        setSubject('');
        setDescription('');
        setUserEmail('');
        setMessage("Thanks! We'll be in touch soon");
      }
    } catch (error) {
      setMessage('');
      setError(
        'There was a problem sending your message. Please try again later.'
      );
    }
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
          <StyledTextField
            label="Your Email Address"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            autoFocus
          />
          <StyledTextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            autoFocus
          />
          <StyledTextField
            label="Brief Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={8}
            autoFocus
          />
          {error && <StyledAlert style={{ color: 'red' }}>{error}</StyledAlert>}
          {message && (
            <StyledAlert style={{ color: 'green' }}>{message}</StyledAlert>
          )}
        </section>
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
