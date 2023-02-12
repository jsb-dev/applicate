import button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(button)({
  height: '8vh',
  minWidth: '80%',
  background: '#0dc9de',
  color: '#263436',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: 15,
  boxShadow: '0 0 8px 2px rgba(0, 0, 0, .6)',
  maxWidth: '12vw',
  '&:hover': {
    color: '#ffffff',
    boxShadow: '0 0 5px 4px rgba(255, 255, 255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5b61',
    transition: 'all 0.4s ease-in-out',
  },
  '@media (max-width: 600px)': {
    height: '10vh',
  },
});

export default StyledButton;
