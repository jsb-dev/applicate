import React from 'react';
import { useFormikContext } from 'formik';
import StyledTextField from '../styled/formFields';
import { useMediaQuery } from '@mui/material';

const EmailField = () => {
  let isMobile = useMediaQuery('(max-width:480px)');
  let isTablet = useMediaQuery('(max-width:960px)');

  const { values, handleChange, handleBlur } = useFormikContext();

  return (
    <StyledTextField
      id="email"
      label="Email"
      type="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      variant="outlined"
      size={isMobile ? 'small' : 'medium'}
      sx={{ width: isMobile ? '120%' : isTablet ? '130%' : '150%' }}
    />
  );
};

const PasswordField = () => {
  let isMobile = useMediaQuery('(max-width:480px)');
  let isTablet = useMediaQuery('(max-width:960px)');
  const { values, handleChange, handleBlur } = useFormikContext();

  return (
    <StyledTextField
      id="password"
      label="Password"
      type="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
      variant="outlined"
      size={isMobile ? 'small' : 'medium'}
      sx={{ width: isMobile ? '120%' : isTablet ? '130%' : '150%' }}
    />
  );
};

export { EmailField, PasswordField };
