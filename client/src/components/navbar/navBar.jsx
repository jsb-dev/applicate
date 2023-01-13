import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #098c9c 30%, #39d0ff 90%)',
  border: 0,
  color: 'white',
  height: '7vh',
  width: '100%',
});

const PageLink = styled(Link)({
  color: '#182021',
  textDecoration: 'none',
  marginRight: '10px',
  '&:hover': {
    color: '#ffffff',
  },
});

const BarTypography = styled(Typography)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-between',
});

const LinksTypography = styled(Typography)({
  flexGrow: 1,
  display: 'flex',
  justifyContent: 'space-around',
});

export default function Navbar() {
  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <BarTypography>
            <PageLink to="/">Home</PageLink>
          </BarTypography>
          <LinksTypography>
            <PageLink to="/about">About</PageLink>
            <PageLink to="/services">Services</PageLink>
            <PageLink to="/contact">Contact</PageLink>
            <PageLink to="/">Login</PageLink>
          </LinksTypography>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}
