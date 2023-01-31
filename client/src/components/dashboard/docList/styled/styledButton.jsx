import Button from '@mui/material/Button';
import Styled from '@emotion/styled';

const StyledButton = Styled(Button)({
  borderRadius: 200,
  border: 'solid 2px #2e393b',
  boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
  '&:hover': {
    boxShadow: '0px 0px 12px 5px #fff',
    border: 'solid 2px #fff',
    transform: 'scale(1)',
    transition: 'all 0.4s ease-in-out',
  },
});

export default StyledButton;
