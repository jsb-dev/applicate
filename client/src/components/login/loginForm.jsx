import React from 'react';
import { Formik } from 'formik';
import { EmailField, PasswordField } from './parts/formFields';
import { Card, CardContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Styled from '@emotion/styled';
import LoginButton from './parts/loginButton.jsx';
import SignupButton from './parts/signupButton.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';
import {
  FormContainer,
  FieldContainer,
  ButtonContainer,
  Button,
} from './styled/form.jsx';

const CardWrapper = Styled(({ className }) => (
  <Card
    className={className}
    sx={{
      transform: useMediaQuery('(max-width:811px)') ? 'scale(1)' : 'scale(1.1)',
    }}
  >
    <img
      style={{ width: '30vh', maxWidth: '230px', marginTop: 'min(10%,5vh)' }}
      src={LogoImg}
      alt="Applicate Logo"
    />
    <CardContent>
      <Form />
    </CardContent>
  </Card>
))`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 1);
  background: #222c30;
  min- height: 650px;
  width: 400px;
  max-width: 40vw;
  @media (max-width: 480px) {
    border-radius: 15px;
    min-width: 90vw;
    min-height: 520px;
    max-height: 90vh;
  }
`;

const Form = ({ className }) => {
  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log('Form submission with values:', values);
      }}
    >
      {({ values }) => (
        <FormContainer
          className={className}
          style={{ width: isMobile ? 'calc(100vw / 2)' : '52.5%' }}
        >
          <FieldContainer>
            <EmailField value={values.email} />
          </FieldContainer>
          <FieldContainer>
            <PasswordField value={values.password} />
          </FieldContainer>
          <ButtonContainer isMobile={isMobile}>
            <Button>
              <SignupButton email={values.email} password={values.password} />
            </Button>
            <Button>
              <LoginButton email={values.email} password={values.password} />
            </Button>
          </ButtonContainer>
        </FormContainer>
      )}
    </Formik>
  );
};

const LoginForm = () => <CardWrapper />;

export default LoginForm;
