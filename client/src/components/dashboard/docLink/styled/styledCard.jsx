import styled from '@emotion/styled';
import { Card } from '@mui/material';

const StyledCard = styled(Card)({
  background: 'transparent',
  borderRadius: 20,
  border: 'solid 2px #2e393b',
  boxShadow: '0px 0px 10px 4px #2e393b',
  width: '100%',
  '&:hover': {
    boxShadow: '0px 0px 12px 5px #fff',
    border: 'solid 2px #fff',
    transition: 'all 0.4s ease-in-out',
  },
});

export default StyledCard;
