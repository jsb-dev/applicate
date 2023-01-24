import React from 'react';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled';

const StyledSpinner = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoadingSpinner = () => {
  return <StyledSpinner />;
};

export default LoadingSpinner;
