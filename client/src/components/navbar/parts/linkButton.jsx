import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const LinkButton = styled(Button)({
  width: 150,
  background: '#0dc9de',
  color: '#263436',
  fontSize: '1rem',
  fontWeight: 'bold',
  borderRadius: 15,
  boxShadow: '0 0 8px 2px rgba(0, 0, 0, .6)',
  '&:hover': {
    color: '#ffffff',
    boxShadow: '0 0 5px 4px rgba(255, 255, 255, .4)',
    transform: 'scale(1.2)',
    background: '#2f5b61',
    transition:
      'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, background 0.4s ease-in-out, color 0.4s ease-in-out',
  },
});

export default LinkButton;
