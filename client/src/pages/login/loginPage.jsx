import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../../components/navbar/navBar.jsx';
import LoginForm from '../../components/login/loginForm.jsx';
import GalaxyBg from '../../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';

const LoginPage = () => {
  let isMobile = useMediaQuery('(max-width: 820px)');

  return (
    <div style={{ maxWidth: '100vw' }}>
      <Navbar />
      <section
        style={{
          backgroundImage: `url(${GalaxyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <content
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            paddingBottom: '3%',
          }}
        >
          <p
            style={{
              color: 'white',
              width: isMobile ? '90vw' : '40vw',
              padding: '3%',
              margin: '3%',
              fontSize: isMobile ? '1rem' : '1.5rem',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              textAlign: 'center',
            }}
          >
            Welcome to Applicate, the cloud-based, collaborative rich text
            editor. Our platform is designed to make it easy for you to share
            ideas, edit documents, and create something truly great together, no
            matter where you are. Engage in seamless collaboration and embrace
            the importance of working closely with your team. With real-time
            collaboration and automatic saving features, you can work with
            confidence using our streamlined workflow - we'll take care of the
            heavy lifting. Grasp the possibilities of engaging with your peers
            on your most valued documents, notes, and scripts, all in one place,
            at any time! Take your first step towards effortless collaboration.
            Sign up for an account today and embrace the true potential of your
            next project.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
            }}
          >
            <LoginForm />
          </div>
        </content>
      </section>
    </div>
  );
};

export default LoginPage;
