import React from 'react';
import { Formik } from 'formik';
import { EmailField, PasswordField } from './parts/formFields';
import { StyledCard, StyledCardContent } from './styled/styledCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginButton from './parts/loginButton.jsx';
import SignupButton from './parts/signupButton.jsx';
import './parts/forgotPasswordLink.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';
import ForgotPasswordLink from './parts/forgotPasswordLink.jsx';

const LoginForm = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const container = {
    margin: '5% 0',
    width: '100%',
  };

  return (
    <StyledCard
      style={{
        width: isMobile ? '75vw' : isTablet ? '60vw' : '30vw',
        transform: isMobile ? '' : isTablet ? 'scale(0.7)' : 'scale(0.9)',
        transform: isMobile ? '' : 'scale(0.7)',
      }}
    >
      <StyledCardContent>
        <img
          src={LogoImg}
          alt="Applicate Logo"
          style={{
            width: '70%',
            margin: '2% 0 5% 0 ',
          }}
        />
        <Formik initialValues={{ email: '', password: '' }}>
          {({ values }) => (
            <div
              style={{
                width: '100%',
              }}
            >
              <section
                style={{
                  marginTop: '15%',
                }}
              >
                <div style={container}>
                  <EmailField value={values.email} />
                </div>
                <div style={container}>
                  <PasswordField value={values.password} />
                </div>
              </section>
              <section
                style={{
                  marginTop: '15%',
                }}
              >
                <div style={container}>
                  <SignupButton
                    email={values.email}
                    password={values.password}
                  />
                </div>
                <div style={container}>
                  <LoginButton
                    email={values.email}
                    password={values.password}
                  />
                </div>
              </section>
            </div>
          )}
        </Formik>
        <div
          style={{
            margin: '10% 0 5% 0',
          }}
        >
          <ForgotPasswordLink />
        </div>
      </StyledCardContent>
    </StyledCard>
  );
};

export default LoginForm;
