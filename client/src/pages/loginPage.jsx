import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../components/global/navBar/navBar.jsx';
import LoginForm from '../components/login/loginForm.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import LaptopBg from '../assets/images/WebDev_ProductCard_AlesNesetril.jpg';
import OfficeBg from '../assets/images/OfficePic_Bg_NastuhAbootalebi.jpg';
import Footer from '../components/global/footer.jsx';

const LoginPage = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 960px)');

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
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: isTablet ? 'space-evenly' : 'center',
              justifyContent: isTablet ? 'center' : '',
              flexDirection: isTablet ? 'column' : 'row',
              padding: isTablet ? '10vh 5vw 5vh 5vw' : '5vh 0 6vh 0',
            }}
          >
            <div
              style={{
                color: 'white',
                letterSpacing: '0.1rem',
                wordSpacing: '0.2rem',
                width: '100%',
                paddingLeft: isTablet ? '' : '5vw',
                paddingTop: isTablet ? '' : '15vh',
                marginBottom: isTablet ? '4vh' : '',
              }}
            >
              <h1
                style={{
                  textAlign: 'left',
                  fontSize: isTablet ? '18pt' : '20pt',
                }}
              >
                Welcome to Applicate
              </h1>
              <p
                style={{
                  textAlign: 'left',
                  fontSize: isTablet ? '12pt' : '15pt',
                  width: '100%',
                }}
              >
                Applicate is the cloud-based, collaborative note-taking and
                documenting platform that's designed to make it easy for you to
                share ideas and create something beyond the standard of
                expectation. Engage in seamless, simplified documenting while
                embracing the importance of working closely with your team
                through the most vital stage of your project; planning.
                Applicate features real-time collaborative editing and automatic
                saving features. You can work with confidence using our
                streamlined workflow while we take care of preserving your
                ideas. Take hold of the possibilities through engaging with your
                peers to bring life to your most valued projects, all in one
                place. Applicate will adjust the document view to your device so
                that it's always a painless task to update your document from a
                mobile device. Take the first step towards effortless,
                syncronised collaboration. Sign up for an account today and
                embrace the true potential of your next project.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                marginTop: isTablet ? '' : '15vh',
              }}
            >
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            backgroundImage: `url(${LaptopBg})`,
            backgroundSize: '90%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'rgb(0, 0, 0)',
            height: isMobile ? '80vh' : isTablet ? '50vh' : '80vh',
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <p
              style={{
                position: 'absolute',
                left: '5%',
                fontStyle: 'italic',
                fontSize: isTablet ? '12pt' : '15pt',
                color: 'white',
                width: isMobile ? '90%' : isTablet ? '60%' : '',
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
                fontSize: isTablet ? '12pt' : '15pt',
                color: 'white',
                width: isMobile ? '90%' : isTablet ? '60%' : '',
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
            padding: '7% 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexDirection: isTablet ? 'column' : 'row',
            color: 'white',
            width: '100%',
            height: isTablet ? '100%' : '90vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          }}
        >
          <div
            style={{
              borderRadius: 5,
              boxShadow: '0 0 5px 3px rgba(0, 171, 191, 0.8)',
              maxWidth: '90vw',
              display: 'flex',
              flexDirection: 'column',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              padding: '3%',
              margin: '2%',
              height: '100%',
            }}
          >
            <h2
              style={{
                textAlign: 'left',
                fontSize: isTablet ? '16pt' : '18pt',
              }}
            >
              Why Applicate?
            </h2>
            <p
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '10pt' : isTablet ? '12pt' : '15pt',
                minWidth: isTablet ? '80vw' : '40vw',
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
                fontSize: isTablet ? '12pt' : '15pt',
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
              borderRadius: 5,
              boxShadow: '0 0 5px 3px rgba(0, 171, 191, 0.8)',
              maxWidth: '90vw',
              display: 'flex',
              flexDirection: 'column',
              letterSpacing: '0.1rem',
              wordSpacing: '0.2rem',
              padding: '3%',
              margin: '2%',
              height: '100%',
            }}
          >
            <h2
              style={{
                textAlign: 'left',
                fontSize: isTablet ? '16pt' : '18pt',
              }}
            >
              How Applicate works
            </h2>
            <p
              style={{
                textAlign: 'left',
                fontSize: isMobile ? '10pt' : isTablet ? '12pt' : '15pt',
                minWidth: isTablet ? '80vw' : '40vw',
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
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
