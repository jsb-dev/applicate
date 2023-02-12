import React, { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledTextField from '../shared/styledTextField.jsx';

function ContactCard(props) {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const email = localStorage.getItem('userEmail');
  const token = localStorage.getItem('authToken');

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const TextBox = styled(StyledTextField)({
    '& label': {
      color: '#000',
    },
    '& .MuiInputBase-input': {
      color: '#000',
    },
    '& label.Mui-focused': {
      color: '#000',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#000',
      },
    },
  });

  const handleSubmit = async () => {
    if (!subject || !description) {
      setError('Please provide a subject and description for your query');
      return;
    }

    try {
      const response = await fetch('/account/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, subject, description }),
      });
      if (response.ok) {
        setSubject('');
        setDescription('');
        setMessage("Thanks! We'll be in touch soon");
      }
    } catch (error) {
      console.error(error);
      setError(
        'There was a problem sending your message. Please try again later.'
      );
    }
  };

  return (
    <Card
      style={{
        margin: isMobile ? '30% 0' : isTablet ? 0 : '10%',
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
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            autoFocus
          />
          <StyledTextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={8}
            autoFocus
          />
          {error && <Typography color="error">{error}</Typography>}
          {message && <Typography color="primary">{message}</Typography>}
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
