import { Card, CardContent } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)({
  boxShadow: '0 0 20px 10px rgba(255, 255, 255, 1)',
  background: '#222c30',
  borderRadius: 15,
  width: '100%',
});

const StyledCardContent = styled(CardContent)({
  padding: '5%',
});

export { StyledCard, StyledCardContent };
