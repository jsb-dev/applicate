import React from 'react';
import { useFormikContext } from 'formik';
import { CheckOrientation } from '../../../utils/CheckOrientation';
import { CheckDevice } from '../../../utils/CheckDevice';
import StyledTextField from '../../shared/styledTextField.jsx';

const EmailField = () => {
  const { values, handleChange, handleBlur } = useFormikContext();

  const isVertical = CheckOrientation();
  const isMobile = CheckDevice();

  return (
    <StyledTextField
      id="email"
      label="Email"
      type="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      variant="outlined"
      size={isVertical ? 'small' : !isVertical && isMobile ? 'small' : 'medium'}
    />
  );
};

const PasswordField = () => {
  const { values, handleChange, handleBlur } = useFormikContext();

  const isVertical = CheckOrientation();
  const isMobile = CheckDevice();

  return (
    <StyledTextField
      id="password"
      label="Password"
      type="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
      variant="outlined"
      size={isVertical ? 'small' : !isVertical && isMobile ? 'small' : 'medium'}
    />
  );
};

export { EmailField, PasswordField };
