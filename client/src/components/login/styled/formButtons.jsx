import { styled } from '@mui/material/styles';

import { Button } from '@mui/material';

const StyledButton = styled(Button)({
  background: '#0daabd',
  color: '#222c30',
  '&:hover': {
    background: '#098c9c',
    color: '#ffffff',
    transform: 'scale(1.05)',
  },
  fontSize: '1rem',
  fontWeight: 'bold',
});

export default StyledButton;
