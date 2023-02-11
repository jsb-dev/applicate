import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../components/global/navBar/navBar.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import Footer from '../components/global/footer.jsx';

const AboutPage = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

  const articleBlock = {
    color: 'white',
    letterSpacing: '0.1rem',
    wordSpacing: '0.2rem',
    width: isMobile ? '100%' : '50%',
    padding: isMobile ? '2% 2% 0 2%' : isTablet ? 0 : '2% 2% 0 2%',
  };

  return (
    <>
      <NavBar />
      <section
        style={{
          backgroundImage: `url(${GalaxyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '90vh',
          maxWidth: '100vw',
        }}
      >
        <div
          style={{
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
            backgroundRepeat: 'no-repeat',
            minHeight: '90vh',
          }}
        ></div>
      </section>
      <Footer />
    </>
  );
};

export default AboutPage;
