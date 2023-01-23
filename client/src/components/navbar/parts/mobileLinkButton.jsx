import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const MobileLinkButton = styled(Button)({
  background: '#0dc9de',
  color: '#263436',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  borderRadius: '10px',
  boxShadow: '0 0 15px 2px rgba(255, 255, 255, .8)',
  width: '80%',
  height: 50,
  margin: '10%',
  '&:hover': {
    color: '#ffffff',
    boxShadow: '0 0 5px 4px rgba(255, 255, 255, .4)',
    transform: 'scale(1.1)',
    background: '#2f5b61',
    transition:
      'transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out, background 0.4s ease-in-out, color 0.4s ease-in-out',
  },
});

export default MobileLinkButton;
