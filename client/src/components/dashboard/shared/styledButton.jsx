import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)({
  borderRadius: 200,
  boxShadow: '0px 0px 10px 4px rgba(255, 255, 255, 0.8)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundColor: 'white',
  backgroundSize: 'max(3vw, 3vh)',
  color: 'black',
  height: 'max(4vw, 4vh)',
  width: 'max(4vw, 4vh)',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: 'white',
    boxShadow: '0px 0px 12px 5px #fff',
    transition: 'all 0.2s ease-in-out',
  },
});

export default StyledButton;
