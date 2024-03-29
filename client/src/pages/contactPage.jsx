import React from 'react';
import NavBar from '../components/global/navBar/navBar.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import Footer from '../components/global/footer.jsx';
import ContactCard from '../components/contact/contactCard.jsx';

const AboutPage = () => {
  return (
    <div className="page-container">
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
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '90vh',
            }}
          >
            <ContactCard />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
