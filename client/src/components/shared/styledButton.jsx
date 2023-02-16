import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)({
  borderRadius: 200,
  boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: 'white',
  backgroundSize: '50%',
  '@media (min-width: 961px)': {
    backgroundSize: '30%',
  },
  color: 'black',
  '&:hover': {
    transform: 'scale(1)',
    backgroundColor: 'white',
    boxShadow: '0px 0px 12px 5px #fff',
    transition: 'all 0.2s ease-in-out',
  },
  width: '25%',
  height: '100%',
});

export default StyledButton;
