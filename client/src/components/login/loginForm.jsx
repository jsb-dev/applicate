import React from 'react';
import { Formik } from 'formik';
import { EmailField, PasswordField } from './parts/formFields';
import { StyledCard, StyledCardContent } from './styled/styledCard';
import useMediaQuery from '@mui/material/useMediaQuery';
import LoginButton from './parts/loginButton.jsx';
import SignupButton from './parts/signupButton.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';

const LoginForm = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  return (
    <>
      <StyledCard
        style={{
          width: isMobile ? '80%' : isTablet ? '60%' : '50%',
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
              <div>
                <section>
                  <EmailField value={values.email} />
                  <PasswordField value={values.password} />
                </section>
                <section>
                  <br />
                  <SignupButton
                    email={values.email}
                    password={values.password}
                  />
                  <br />
                  <LoginButton
                    email={values.email}
                    password={values.password}
                  />
                </section>

                <br />
              </div>
            )}
          </Formik>
        </StyledCardContent>
      </StyledCard>
    </>
  );
};

export default LoginForm;
