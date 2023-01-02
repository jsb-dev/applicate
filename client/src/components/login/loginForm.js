import React from 'react';
import { Formik } from 'formik';
import { EmailField, PasswordField } from './formFields';
import { Card, CardContent } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Styled from '@emotion/styled';
import LoginButton from './loginButton.js';
import SignupButton from './signupButton.js';
import LogoImg from '../../assets/images/applicateLogo.png';

const FormContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 16px 0;
`;

const FieldContainer = Styled.div`
  margin: 16px ;
`;

const ButtonContainer = Styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  align-items: center;
  width: 100%;
  button {
    min-width: 120px;
  }
`;

const Button = Styled.div`
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
`;

const CardWrapper = Styled(({ className }) => (
  <Card className={className}>
    <img
      style={{ width: '60%', maxWidth: '200px', marginTop: 'min(10%,30px)' }}
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 16px;
  width: 50vw;
  min-width: 300px;
`;

const Form = ({ className }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log('Form submission with values:', values);
      }}
    >
      {({ values }) => (
        <FormContainer className={className}>
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
