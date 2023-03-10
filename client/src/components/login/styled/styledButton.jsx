import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const StyledButton = styled(Button)({
  background: '#0daabd',
  color: '#222c30',
  fontWeight: 'bold',
  borderRadius: 15,
  '&:hover': {
    background: '#098c9c',
    color: '#ffffff',
    transform: 'scale(1.05)',
    transition: 'all 0.1s ease-in-out',
  },
  minHeight: 50,
  width: '100%',
});

export default StyledButton;
