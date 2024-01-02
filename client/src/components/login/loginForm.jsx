import React from 'react';
import { Formik } from 'formik';
import useMediaQuery from '@mui/material/useMediaQuery';
import { EmailField, PasswordField } from './parts/formFields';
import { StyledCard, StyledCardContent } from './styled/styledCard';
import LoginButton from './parts/loginButton.jsx';
import SignupButton from './parts/signupButton.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';
import ForgotPasswordLink from './parts/forgotPasswordLink.jsx';

const LoginForm = () => {
  const isNarrow = useMediaQuery('(max-width: 800px)');

  const container = {
    marginTop: '5%',
  };

  return (
    <StyledCard>
      <StyledCardContent>
        <form>
          <div
            style={{
              display: 'flex',
              flexDirection: isNarrow ? 'column' : 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: isNarrow ? '100%' : '80%',
                marginRight: isNarrow ? '' : '5%',
              }}
            >
              <img
                src={LogoImg}
                alt="Applicate Logo"
                style={{
                  width: isNarrow ? '80%' : '100%',
                  padding: isNarrow ? '5% 0' : '',
                }}
              />
            </div>
            <Formik initialValues={{ email: '', password: '' }}>
              {({ values }) => (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}
                >
                  <section>
                    <div
                      style={{
                        marginTop: isNarrow ? '5%' : '',
                      }}
                    >
                      <EmailField value={values.email} />
                    </div>
                    <div style={container}>
                      <PasswordField value={values.password} />
                    </div>
                  </section>
                  <section
                    style={{
                      marginTop: isNarrow ? '10%' : '',
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
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              textAlign: 'center',
              marginTop: '10%',
            }}
          >
            <div>
              <ForgotPasswordLink />
            </div>
            <p
              style={{
                fontSize: '1rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Use of this website is subject to our{' '}
              <a
                href="https://www.gdprprivacynotice.com/live.php?token=JL5LtXje7rnXKVj4ayg3UlXBugtzYnRY"
                style={{
                  color: 'white',
                  textDecoration: 'underline',
                }}
              >
                privacy policy
              </a>
            </p>
          </div>
        </form>
      </StyledCardContent>
    </StyledCard>
  );
};

export default LoginForm;
