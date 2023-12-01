import React, { useState } from 'react';
import env from 'react-dotenv';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import StyledCard from '../shared/styledCard.jsx';
import StyledTextField from '../shared/styledTextField.jsx';
import StyledDialog from '../shared/styledDialog.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';
import StyledAlert from '../shared/styledAlert.jsx';

const ResetPasswordCard = ({ auth }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { REACT_APP_API_URL } = env;

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const buttonStyles = {
    width: '40%',
    height: '20%',
    color: 'white',
    border: '2px solid white',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    backgroundColor: 'rgba(0,0,0,0.3)',
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError('Both passwords must match');
      return;
    }

    if (newPassword.length < 7) {
      setError('Password must be at least 7 characters');
      return;
    }

    fetch(`${REACT_APP_API_URL}account/resetPassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDialogOpen(true);
        } else {
          setError(data.message);
        }
      });
  };

  const fieldContainer = {
    margin: '3%',
  };

  return (
    <>
      <StyledCard
        style={{
          marginTop: isMobile ? '30%' : isTablet ? '20%' : '8%',
          width: isTablet ? '80%' : '50%',
          padding: isTablet ? '6%' : '2%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src={LogoImg}
            alt="Applicate logo"
            style={{
              width: isTablet ? '30%' : '15%',
            }}
          />
          <h1 style={{ textAlign: 'right' }}>Reset Password</h1>
        </div>
        <div style={fieldContainer}>
          <StyledTextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div style={fieldContainer}>
          <StyledTextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <StyledAlert style={{ color: 'red' }}>{error}</StyledAlert>
        <div
          style={{
            margin: isMobile ? '12% 0 6% 0' : '10% 0 5% 0',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: '100%',
            width: '100%',
          }}
        >
          <Button style={buttonStyles} onClick={handleSubmit}>
            Submit
          </Button>
          <Button style={buttonStyles}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'white',
              }}
            >
              Cancel
            </Link>
          </Button>
        </div>
      </StyledCard>
      <StyledDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <div
          style={{
            padding: isMobile ? '7%' : '5%',
          }}
        >
          <p
            style={{
              marginBottom: '10%',
            }}
          >
            Password reset successfully, click the button below to be taken back
            to the Login Page
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button style={buttonStyles}>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
              >
                Go to Login Page
              </Link>
            </Button>
          </div>
        </div>
      </StyledDialog>
    </>
  );
};

export default ResetPasswordCard;
