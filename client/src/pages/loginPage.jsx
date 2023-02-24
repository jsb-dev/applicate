import React from 'react';
import { CheckOrientation } from '../utils/CheckOrientation';
import { CheckDevice } from '../utils/CheckDevice';
import NavBar from '../components/global/navBar/navBar.jsx';
import LoginForm from '../components/login/loginForm.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import LaptopBg from '../assets/images/WebDev_ProductCard_AlesNesetril.jpg';
import OfficeBg from '../assets/images/OfficePic_Bg_NastuhAbootalebi.jpg';
import Footer from '../components/global/footer.jsx';

const LoginPage = () => {
  const isVertical = CheckOrientation();
  const isMobile = CheckDevice();

  const articleBlock = {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    letterSpacing: '0.1rem',
    wordSpacing: '0.2rem',
    padding: '0 0.1rem',
    width: isMobile ? '100%' : '46.5%',
  };

  return (
    <div>
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
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingTop: isVertical
                ? '10vh'
                : !isVertical && isMobile
                ? '20vh'
                : '10vh',
              paddingBottom: isVertical
                ? '10vh'
                : !isVertical && isMobile
                ? '20vh'
                : '5vh',
            }}
          >
            <div
              style={{
                color: 'white',
                letterSpacing: '0.1rem',
                wordSpacing: '0.2rem',
                width: isVertical ? '' : !isVertical && isMobile ? '' : '50%',
                padding: isVertical
                  ? '0 5%'
                  : !isVertical && isMobile
                  ? '0 5%'
                  : '0 3%',
              }}
            >
              <h1
                style={{
                  textAlign: 'left',
                  fontSize: isMobile ? '1.5rem' : '1.8rem',
                }}
              >
                Welcome to Applicate
              </h1>
              <p
                style={{
                  textAlign: 'left',
                  fontSize: '1rem',
                }}
              >
                Applicate is the cloud-based, collaborative note-taking and
                documenting platform that's designed to make it easy for you to
                engage in seamless, simplified documenting, while embracing the
                importance of working closely with your team through the most
                vital stage of your project; planning. Applicate features
                real-time collaborative editing and automatic saving features.
                You can work with confidence using our streamlined workflow
                while we take care of preserving your ideas. Take hold of the
                possibilities through engaging with your peers to bring life to
                your most valued projects, all in one place. Applicate will
                adjust the document view to your device so that it's always a
                painless task to update your document from a mobile device. Take
                the first step towards effortless, syncronised collaboration.
                Sign up for an account today and embrace the true potential of
                your next project.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isVertical
                  ? '90%'
                  : !isVertical && isMobile
                  ? '90%'
                  : '50%',
                padding: '5%',
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
            height: '80vh',
            minHeight: 500,
            boxShadow: 'inset 0 0 40px 3px rgba(0, 0, 0, 1)',
          }}
        >
          <div style={{ position: 'relative', fontSize: '1rem' }}>
            <p
              style={{
                position: 'absolute',
                left: '5%',
                fontStyle: 'italic',
                color: 'white',
                width: isMobile ? '90%' : !isVertical && isMobile ? '60%' : '',
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
                color: 'white',
                width: isMobile ? '90%' : !isVertical && isMobile ? '60%' : '',
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
            padding: '10% 3%',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: isMobile ? 'column' : 'row',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
          }}
        >
          <article style={articleBlock}>
            <h2
              style={{
                textAlign: 'left',
                fontSize: '1.3rem',
                margin: 0,
              }}
            >
              Why Applicate?
            </h2>
            <p
              style={{
                textAlign: 'left',
                fontSize: '1rem',
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
                fontSize: '1rem',
              }}
            >
              <li>Rich text editing</li>
              <li>Essential format options</li>
              <li>Real-time collaboration</li>
              <li>Accessibility from any device</li>
              <li>Automatic saving</li>
            </ul>
          </article>
          <article style={articleBlock}>
            <h2
              style={{
                textAlign: 'left',
                fontSize: '1.3rem',
                marginTop: isMobile ? '5%' : '0',
                marginBottom: 0,
              }}
            >
              How Applicate works
            </h2>
            <div
              style={{
                textAlign: 'left',
                fontSize: '1rem',
              }}
            >
              <p>
                Applicate is a MERN stack (MongoDB, Express, React, Node)
                application. It harnesses the Tiptapjs library to deliver a
                simplified alternative to most commercial text editors, while
                still maintaining the core functionality users will expect. Your
                data is stored in our database hosted on MongoDB Atlas, so
                there's no need to worry about losing your work. This allows you
                to adopt a set-and-forget approach to your project planning and
                documentation.
              </p>
              <p>
                Forget about digging around on your desktop or cloud drive for
                your planning and documentation files. Save those environments
                for your professional work. Applicate is designed to be a
                simple, intuitive tool that you can use to plan and document
                your project, and then forget about it until you need it again.
              </p>
            </div>
          </article>
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
