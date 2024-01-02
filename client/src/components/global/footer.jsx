import React from 'react';
import { Container, Grid, Link, Typography } from '@mui/material';
import { CheckDevice } from '../../utils/CheckDevice';

const footerCntnrStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  padding: '3rem 1rem',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  minWidth: '99vw',
  width: 'auto',
  maxWidth: '100vw',
};

const divCntnr = {
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  margin: 0,
  width: '100%',
};

const h6 = {
  color: '#fff',
  fontSize: '10pt',
  fontWeight: 600,
  marginBottom: '1rem',
};

const a = {
  color: '#46AB98',
  fontSize: '8pt',
};

const Footer = () => {
  const isMobile = CheckDevice();
  const gridSize = isMobile ? 6 : 3;

  return (
    <Container component="footer" sx={footerCntnrStyles}>
      <Grid container spacing={3}>
        <Grid item xs={gridSize}>
          <Container component="div" sx={divCntnr}>
            <Typography variant="h6" sx={h6}>
              Contact
            </Typography>
            <Link href="/contact" target="_blank" sx={a}>
              Help
            </Link>
            <Link href="https://github.com/jsb-dev" target="_blank" sx={a}>
              Developer
            </Link>
          </Container>
        </Grid>
        <Grid item xs={gridSize}>
          <Container component="div" sx={divCntnr}>
            <Typography variant="h6" sx={h6}>
              Connect
            </Typography>
            <Link href="mailto:jsb-dev@outlook.com" target="_blank" sx={a}>
              jsb-dev@outlook.com
            </Link>
            <Link
              href="https://github.com/jsb-dev/applicate"
              target="_blank"
              sx={a}
            >
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/jacob-booth-1a9390233/"
              target="_blank"
              sx={a}
            >
              LinkedIn
            </Link>
          </Container>
        </Grid>
        <Grid item xs={gridSize}>
          <Container component="div" sx={divCntnr}>
            <Typography variant="h6" sx={h6}>
              Portfolio Project
            </Typography>
            <Typography variant="body2" sx={a}>
              {new Date().getFullYear()} Applicate
            </Typography>
          </Container>
        </Grid>
        <Grid item xs={gridSize}>
          <Container component="div" sx={divCntnr}>
            <Typography variant="h6" sx={h6}>
              Terms & Conditions
            </Typography>
            <Link
              href="https://www.gdprprivacynotice.com/live.php?token=JL5LtXje7rnXKVj4ayg3UlXBugtzYnRY"
              target="_blank"
              sx={a}
            >
              Privacy Policy
            </Link>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
