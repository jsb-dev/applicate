import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const StyledButton = styled(Button)({
  // Desktop View
  width: 150,
  background: '#0dc9de',
  color: '#263436',
  fontSize: '0.7rem',
  fontWeight: 'bold',
  borderRadius: 15,
  boxShadow: '0 0 8px 2px rgba(0, 0, 0, .6)',
  width: '100%',
  height: '100%',
  '&:hover': {
    color: '#ffffff',
    boxShadow: '0 0 5px 4px rgba(255, 255, 255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5b61',
    transition: 'all 0.4s ease-in-out',
  },
  // Mobile View
  '@media (max-width: 960px)': {
    background: '#0dc9de',
    color: '#263436',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '10px',
    boxShadow: '0 0 15px 2px rgba(255, 255, 255, .8)',
    width: '80%',
    height: 50,
    margin: '6%',
    maxWidth: '100%',
    '&:hover': {
      color: '#ffffff',
      boxShadow: '0 0 5px 4px rgba(255, 255, 255, .4)',
      transform: 'scale(1.1)',
      background: '#2f5b61',
      transition: 'all 0.4s ease-in-out',
    },
  },
});

export default StyledButton;
