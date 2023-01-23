import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinkButton from './parts/linkButton.jsx';
import LogoImg from '../../assets/images/applicateLogo.png';

const StyledAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #2e393b 30%, #0dc9de 90%)',
  border: 0,
  color: 'white',
  height: '10vh',
  width: '100%',
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
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
  flexGrow: 0.5,
  display: 'flex',
  justifyContent: 'space-between',
});

function FullNavbar() {
  return (
    <div>
      <StyledAppBar
        position="static"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Toolbar>
          <BarTypography>
            <img
              src={LogoImg}
              alt="The applicate Logo"
              style={{
                height: 'calc(100vh / 11)',
              }}
            />
          </BarTypography>
          <LinksTypography>
            <PageLink to="/">
              <LinkButton>Home</LinkButton>
            </PageLink>
            <PageLink to="/about">
              <LinkButton>About</LinkButton>
            </PageLink>
            <PageLink to="/contact">
              <LinkButton>Contact</LinkButton>
            </PageLink>
            <PageLink to="/">
              <LinkButton>Login / Signup</LinkButton>
            </PageLink>
          </LinksTypography>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
}

export default FullNavbar;
