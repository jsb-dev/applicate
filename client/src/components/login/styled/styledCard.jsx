import { Card, CardContent } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)({
  boxShadow: 'inset 0 0 2rem 0.5rem rgba(255,255,255, 0.2)',
  background: 'rgb(0, 0, 0, 0.5)',
  borderRadius: 15,
  width: '100%',
});

const StyledCardContent = styled(CardContent)({
  padding: '10%',
});

export { StyledCard, StyledCardContent };
