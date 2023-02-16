import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import StyledCard from '../shared/styledCard.jsx';
import StyledTextField from '../shared/styledTextField.jsx';
import StyledButton from '../shared/styledButton.jsx';
import StyledDialog from '../shared/styledDialog.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';
import StyledAlert from '../shared/styledAlert.jsx';

const ResetPasswordCard = ({ auth }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const buttonStyles = {
    width: '40%',
    height: '20%',
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

    fetch('/account/resetPass', {
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
          <StyledButton style={buttonStyles} onClick={handleSubmit}>
            Submit
          </StyledButton>
          <StyledButton style={buttonStyles}>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
              }}
            >
              Cancel
            </Link>
          </StyledButton>
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
            <StyledButton
              style={{
                width: isMobile ? '80%' : '60%',
                height: '20%',
                padding: isMobile ? '5%' : '2%',
              }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                }}
              >
                Go to Login Page
              </Link>
            </StyledButton>
          </div>
        </div>
      </StyledDialog>
    </>
  );
};

export default ResetPasswordCard;
