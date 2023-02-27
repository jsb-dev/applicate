import styled from '@emotion/styled';
import { Card } from '@mui/material';

const StyledCard = styled(Card)({
  background: 'transparent',
  borderRadius: '1rem',
  boxShadow: '0px 0px 10px 4px #2e393b',
  width: '100%',
  '&:hover': {
    boxShadow: '0px 0px 12px 5px #fff',
    transition: 'all 0.3s ease-in-out',
  },
});

export default StyledCard;
