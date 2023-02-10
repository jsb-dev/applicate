import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../components/global/navBar/navBar.jsx';
import LoginForm from '../components/login/loginForm.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import LaptopBg from '../assets/images/WebDev_ProductCard_AlesNesetril.jpg';
import OfficeBg from '../assets/images/OfficePic_Bg_NastuhAbootalebi.jpg';
import SiteFooter from '../components/global/footer.jsx';

const LoginPage = () => {
  let isMobile = useMediaQuery('(max-width: 960px)');

  return (
    <div style={{ maxWidth: '100vw' }}>
      <NavBar />
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
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        >
          <div
            style={{
              color: 'white',
              width: isMobile ? '90vw' : '40vw',
              marginTop: isMobile ? '9vh' : '',
              marginRight: isMobile ? '' : '10%',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '18pt' : '20pt',
              }}
            >
              Welcome to Applicate
            </h1>
            <p
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '12pt' : '15pt',
              }}
            >
              Applicate is the cloud-based, collaborative note-taking and
              documenting platform that's designed to make it easy for you to
              share ideas and create something beyond the standard of
              expectation. Engage in seamless, simplified documenting while
              embracing the importance of working closely with your team through
              the most vital stage of your project; planning. Applicate features
              real-time collaborative editing and automatic saving features. You
              can work with confidence using our streamlined workflow while we
              take care of preserving your ideas. Take hold of the possibilities
              through engaging with your peers to bring life to your most valued
              projects, all in one place. Applicate will adjust the document
              view to your device so that it's always a painless task to update
              your document from a mobile device. Take the first step towards
              effortless, syncronised collaboration. Sign up for an account
              today and embrace the true potential of your next project.
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
      <section>
        <div
          style={{
            backgroundImage: `url(${LaptopBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: 500,
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <p
              style={{
                position: 'absolute',
                left: '5%',
                fontStyle: 'italic',
                fontSize: isMobile ? '12pt' : '15pt',
                color: 'white',
                width: isMobile ? '60%' : '',
              }}
            >
              Applicate embraces simplicity in the process of developing your
              project
            </p>
          </div>
          <div style={{ position: 'relative', height: '100%' }}>
            <p
              style={{
                position: 'absolute',
                bottom: '5%',
                right: '5%',
                fontStyle: 'italic',
                fontSize: isMobile ? '12pt' : '15pt',
                color: 'white',
                width: isMobile ? '60%' : '',
                textAlign: 'right',
              }}
            >
              Discover the benefits of distinguishing your planning and
              professional document environments
            </p>
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundImage: `url(${OfficeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#182021',
          boxShadow: 'inset 0 0 20px 10px rgba(0, 0, 0, 1) ',
        }}
      >
        <div
          style={{
            padding: '1% 0 1% 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: isMobile ? 'column' : 'row',
            color: 'white',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <div
            style={{
              borderRadius: 30,
              boxShadow: '0 0 20px 10px rgba(0, 171, 191, 1)',
              background: 'rgba(0, 171, 191, 0.9)',
              maxWidth: '90vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: isMobile ? '8%' : '3% 1.5% 3% 3%',
              padding: isMobile ? '5%' : '2.8%',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              minHeight: isMobile ? '' : 600,
            }}
          >
            <h2
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '16pt' : '18pt',
              }}
            >
              Why Applicate?
            </h2>
            <p
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '12pt' : '15pt',
                minWidth: isMobile ? '80vw' : '40vw',
              }}
            >
              At the core of Applicate's design is the fundamental concept of
              seperating the work environment from planning and documenting. Our
              platform offers a core arsenal of formatting and styling options
              that are essential for these tasks. We've packaged the most
              recognisable options to be available in a minimal, intuitive
              interface. Applicate is designed to be easy to use and accessible
              from any device, so you can focus on what matters most, your
              project. Some key features you'll find include:
            </p>
            <ul
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '12pt' : '15pt',
              }}
            >
              <li>Rich text editing</li>
              <li>Essential format options</li>
              <li>Real-time collaboration</li>
              <li>Accessibility from any device</li>
              <li>Automatic saving</li>
            </ul>
          </div>
          <div
            style={{
              borderRadius: 30,
              boxShadow: '0 0 20px 10px rgba(73, 90, 92, 1)',
              background: 'rgba(73, 90, 92, 0.9)',
              maxWidth: '90vw',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: isMobile ? '8%' : '3% 3% 3% 1.5%',
              padding: isMobile ? '5%' : '2.8%',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              minHeight: isMobile ? '' : 600,
            }}
          >
            <h2
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '16pt' : '18pt',
              }}
            >
              How Applicate works
            </h2>
            <p
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '12pt' : '15pt',
                minWidth: isMobile ? '80vw' : '40vw',
              }}
            >
              Applicate is a MERN stack (MongoDB, Express, React, Node)
              application. It harnesses the Tiptapjs library to deliver a
              simplified alternative to most commercial text editors, while
              still maintaining the core functionality users will expect. Your
              data is stored in our database hosted on MongoDB Atlas, so there's
              no need to worry about losing your work. This allows you to adopt
              a set-and-forget approach to your project planning and
              documentation. Forget about digging around on your desktop or
              cloud drive for your planning and documentation files. Save those
              environments for your professional work. Applicate is designed to
              be a simple, intuitive tool that you can use to plan and document
              your project, and then forget about it until you need it again.
            </p>
          </div>
        </div>
      </section>
      <section
        style={{
          height: 100,
        }}
      >
        <div>
          <SiteFooter />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
