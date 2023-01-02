import React from 'react';
import { TextField } from '@mui/material';
import { useFormikContext } from 'formik';

const fieldStyles = {
  width: '100%',
};

const EmailField = () => {
  const { values, handleChange, handleBlur } = useFormikContext();

  return (
    <TextField
      id="email"
      label="Email"
      type="email"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.email}
      variant="outlined"
    />
  );
};

const PasswordField = () => {
  const { values, handleChange, handleBlur } = useFormikContext();

  return (
    <TextField
      id="password"
      label="Password"
      type="password"
      onChange={handleChange}
      onBlur={handleBlur}
      value={values.password}
      variant="outlined"
      inputProps={{ className: fieldStyles }}
    />
  );
};

export { EmailField, PasswordField };
