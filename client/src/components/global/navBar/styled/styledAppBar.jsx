import styled from '@emotion/styled';
import { AppBar } from '@mui/material';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #2e393b 30%, #0dc9de 90%)',
  border: 0,
  color: 'white',
  height: '10vh',
  minHeight: 70,
  width: '100%',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  transition: 'transform 0.3s ease-in-out',
  zIndex: '999',
});

export default StyledAppBar;
