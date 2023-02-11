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
    <div>
      <NavBar />
      <section
        style={{
          backgroundImage: `url(${GalaxyBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '90vh',
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
              justifyContent: 'space-evenly',
              padding: isTablet ? '10vh 5vw 5vh 5vw' : '5vh 0 6vh 0',
            }}
          >
            <h1
              style={{
                padding: isTablet ? '3% 0 0 0' : '3% 0 0 2%',
                marginTop: isMobile ? '10%' : '3%',
                marginBottom: isTablet ? '' : 0,
                fontSize: isMobile ? '14pt' : isTablet ? '18pt' : '20pt',
                color: 'white',
                letterSpacing: '0.1rem',
                wordSpacing: '0.2rem',
              }}
            >
              A little about the development process...
            </h1>
            <article
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-evenly',
              }}
            >
              <div style={articleBlock}>
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: isTablet ? '12pt' : '14pt',
                    width: '95%',
                  }}
                >
                  Applicate is a full-stack web application built with the MERN
                  Stack. The text editor is built using the Tiptapjs library
                  with websockets implementation using socket.io for
                  collaborative editing. It makes use of the onUpdate
                  functionality built into Tiptapjs, so that the file content is
                  always updated to the last entry, and broadcast to all
                  collaborators on a continuous basis.
                  <br />
                  <br />
                  Being a MERN project, the frontend is built with React, and
                  takes advantage of MUI components to provide a modern,
                  responsive UI. The backend is built with Node.js, Express, and
                  MongoDB. The API is built to allow the user to create, read,
                  update, and delete files and account information. It makes use
                  of JWT for authentication and authorization, and bcrypt for
                  password hashing.
                  <br />
                  <br />
                  Applicate is the first project that I've built outside of
                  academic context, and my first time creating a website
                  back-end. I assigned myself a deadline of 2 months to finish
                  the project. This obviously came with its own set of
                  challenges and learning opportunities - I had to learn how to
                  design and implement the front and back end functionality,
                  UI/UX and database models, all with strict time constraints
                  allocated only within my spare time.
                </p>
                {isTablet ? null : (
                  <p
                    style={{
                      textAlign: 'left',
                      fontSize: isTablet ? '12pt' : '15pt',
                      width: '95%',
                    }}
                  >
                    This project equipped me with the learning experiences
                    necessary to:
                    <ul
                      style={{
                        paddingLeft: '6%',
                      }}
                    >
                      <li>
                        Understand the core elements and tech behind the MERN
                        stack
                      </li>
                    </ul>
                  </p>
                )}
              </div>
              <div style={articleBlock}>
                <p
                  style={{
                    textAlign: 'left',
                    fontSize: isTablet ? '12pt' : '15pt',
                    width: '95%',
                  }}
                >
                  {isTablet
                    ? 'This project equipped me with the learning experiences necessary to:'
                    : null}
                  <ul
                    style={{
                      paddingLeft: '6%',
                    }}
                  >
                    <li>
                      Understand the core elements and tech behind the MERN
                      stack
                    </li>
                    <br />
                    <li>
                      Plan, build and deploy a MERN stack application
                      independantly
                    </li>
                    <br />
                    <li>
                      Develop a project using a library tailored to a specific
                      type of implementation (Tiptapjs)
                    </li>
                    <br />
                    <li>
                      Understand how websockets works and implement real-time
                      bi-directional communication
                    </li>
                    <br />
                    <li>
                      Learn how to authenticate and authorize users to allow or
                      disallow access to specific site pages and resources using
                      JWT
                    </li>
                    <br />
                    <li>
                      Design and develop database models with industry
                      best-practise in mind by hashing passwords using bcrypt{' '}
                    </li>
                    <br />
                    <li>
                      Develop the frontend with a specific library of components
                      (MUI), requiring additional research to configure them to
                      project requirements
                    </li>
                    <br />
                    <li>
                      Build a more robust understanding of React and how its
                      traits (such as Hooks, Context, Router) can be used to
                      build a more scalable and maintainable application
                    </li>
                  </ul>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
