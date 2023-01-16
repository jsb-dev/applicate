import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileNavbar from '../../components/navbar/mobileNavbar.jsx';
import FullNavbar from '../../components/navbar/fullNavbar.jsx';
import LoginForm from '../../components/login/loginForm.jsx';
import GalaxyBg from '../../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import LaptopBg from '../../assets/images/WebDev_ProductCard_AlesNesetril.jpg';
import SiteFooter from '../../components/global/footer.jsx';

const LoginPage = () => {
  let isMobile = useMediaQuery('(max-width: 820px)');

  return (
    <div style={{ maxWidth: '100vw' }}>
      {isMobile ? <MobileNavbar /> : <FullNavbar />}
      <section
        style={{
          backgroundImage: `url(${GalaxyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: isMobile ? '3% 0 15% 0' : '3% 0 6% 0',
          }}
        >
          <div
            style={{
              color: 'white',
              width: isMobile ? '90vw' : '40vw',
              margin: '3%',
              fontSize: isMobile ? '1rem' : '1.5rem',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '2rem' : '5rem',
              }}
            >
              Welcome to Applicate
            </h1>
            <p
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '1.2rem' : '2rem',
              }}
            >
              Applicate is the cloud-based, collaborative rich text editor
              that's designed to make it easy for you to share ideas and create
              something beyond the standard of expectation. Engage in seamless
              rich text manipulation while embracing the importance of working
              closely with your team. Featuring real-time collaborative editing
              and automatic saving features, you can work with confidence using
              our streamlined workflow - we'll take care of the heavy lifting.
              Take hold of the possibilities through engaging with your peers on
              your most valued projects, all in one place, at any time. Take the
              first step towards effortless, syncronised collaboration. Sign up
              for an account today and embrace the true potential of your next
              project.
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3%',
              marginBottom: isMobile ? '8%' : '0',
            }}
          >
            <LoginForm />
          </div>
        </div>
      </section>
      <section style={{ height: 540 }}>
        <div
          style={{
            backgroundImage: `url(${LaptopBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: 500,
            boxShadow: '0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        ></div>
      </section>
      <section
        style={{
          padding: '6% 0 1% 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          backgroundColor: '#182021',
          color: 'white',
        }}
      >
        <div
          style={{
            borderRadius: 30,
            boxShadow: '0 0 20px 10px rgba(0, 171, 191, 1)',
            maxWidth: isMobile ? '90vw' : '40%',
            display: 'flex',
            background: 'rgba(0, 171, 191, 0.5)',
            flexDirection: 'column',
            alignItems: isMobile ? '' : 'center',
            justifyContent: 'center',
            margin: isMobile ? '8%' : '3%',
            padding: isMobile ? '5%' : '1%',
            letterSpacing: '0.1rem',
            wordSpacing: '0.2rem',
            textAlign: 'center',
            minHeight: isMobile ? 'auto' : 920,
          }}
        >
          <h2
            style={{
              textAlign: isMobile ? 'left' : 'center',
              fontSize: '2rem',
            }}
          >
            Why Applicate?
          </h2>
          <p
            style={{
              padding: isMobile ? '0 1% ' : '0 5%',
              textAlign: isMobile ? 'left' : 'center',
              fontSize: isMobile ? '1.2rem' : '1.8rem',
            }}
          >
            Our platform offers a variety of features that make it easy for you
            to work with your team. We've designed Applicate to be intuitive and
            easy to use, so you can focus on what matters most - your project.
            It's also designed to be accessible from any device, so you can work
            from whereever suits you. Applicate is securely designed to priotise
            your privacy and data integrity, so you can work with confidence
            knowing that your work environment is in good hands. Some key
            features you'll find include:
          </p>
          <ul
            style={{
              textAlign: 'left',
              fontSize: isMobile ? '1.2rem' : '1.8rem',
            }}
          >
            <li>Rich text editing</li>
            <li>A variety of format options</li>
            <li>Real-time collaborative editing</li>
            <li>Accessibility from any device</li>
            <li>Automatic saving</li>
          </ul>
        </div>
        <div
          style={{
            borderRadius: 30,
            boxShadow: '0 0 20px 10px rgba(73, 90, 92, 1)',
            maxWidth: isMobile ? '90vw' : '40%',
            background: 'rgba(73, 90, 92, 0.5)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? '' : 'center',
            justifyContent: 'center',
            margin: isMobile ? '8%' : '3%',
            padding: isMobile ? '5%' : '1%',
            letterSpacing: '0.1rem',
            wordSpacing: '0.2rem',
            textAlign: 'center',
            minHeight: isMobile ? 'auto' : 920,
          }}
        >
          <h2
            style={{
              textAlign: isMobile ? 'left' : 'center',
              fontSize: '2rem',
            }}
          >
            How Applicate works
          </h2>
          <p
            style={{
              padding: isMobile ? '0 1% ' : '0 5%',
              textAlign: isMobile ? 'left' : 'center',
              fontSize: isMobile ? '1.2rem' : '1.8rem',
            }}
          >
            Applicate is designed to be intuitive and easy to use. Once you've
            signed up for an account, you'll be able to create a new document
            and invite your team members to collaborate with you. You'll be able
            to work on your project in real-time, and your team members will be
            able to see your changes as you make them. You'll also be able to
            see your team members' changes as they make them.
            <br />
            <br />
            Your data is stored on our server, so there's no need to worry about
            losing your work. We've included autosave functionality, in addition
            to a traditional save button - You can never be too sure. You can
            also download your document as a PDF, so you can share it with your
            team members or anyone else.
          </p>
        </div>
      </section>
      <section
        style={{
          height: 100,
        }}
      >
        <SiteFooter />
      </section>
    </div>
  );
};

export default LoginPage;
