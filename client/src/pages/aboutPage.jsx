import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import NavBar from '../components/global/navBar/navBar.jsx';
import GalaxyBg from '../assets/images/Focus_ProductCard_DavidMonje_Aqua.jpg';
import Footer from '../components/global/footer.jsx';
import StyledCard from '../components/shared/styledCard.jsx';
import MelbourneBg from '../assets/images/Melbourne_Background_Alexis.jpg';

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
    <div className="page-container">
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
                  challenges and learning opportunities - I needed to learn how
                  to design and implement the front and back end functionality,
                  UI/UX, and database models, all with strict time constraints
                  allocated only within my spare time.
                </p>
                {isTablet ? null : (
                  <>
                    <p
                      style={{
                        textAlign: 'left',
                        fontSize: isTablet ? '12pt' : '15pt',
                        width: '95%',
                      }}
                    >
                      This project equipped me with the learning experiences
                      necessary to:
                    </p>
                    <ul
                      style={{
                        textAlign: 'left',
                        fontSize: isTablet ? '12pt' : '15pt',
                        width: '95%',
                        paddingLeft: '6%',
                      }}
                    >
                      {isTablet ? null : (
                        <li>
                          Understand the core elements and tech behind the MERN
                          stack development cycle
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </div>
              <div
                style={{
                  color: 'white',
                  letterSpacing: '0.1rem',
                  wordSpacing: '0.2rem',
                  width: isMobile ? '100%' : '50%',
                  padding: isMobile ? '2% 2% 0 2%' : isTablet ? 0 : '0 2% 0 2%',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                >
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
                  </p>
                  <ul
                    style={{
                      textAlign: 'left',
                      fontSize: isTablet ? '12pt' : '15pt',
                      width: '90%',
                      paddingLeft: '6%',
                    }}
                  >
                    {isTablet ? (
                      <li>
                        Understand the core elements and tech behind the MERN
                        stack development cycle
                      </li>
                    ) : null}
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
                      Learn how to authenticate and authorize users, to allow or
                      disallow access to specific site pages and resources via
                      JWT by enforcing my own authentication strategy
                    </li>
                    <br />
                    <li>
                      Design and develop database models with industry
                      best-practise in mind by hashing passwords using bcrypt
                    </li>
                    <br />
                    <li>
                      Develop the frontend with MUI, requiring additional
                      research to configure them to project requirements
                    </li>
                    <br />
                    <li>
                      Build a robust understanding of React and its conventions
                      (such as Hooks, Context, Router, State Variables) to build
                      a scalable and more maintainable application
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            backgroundImage: `url(${MelbourneBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxShadow: 'inset 0 0 20px 10px rgb(0, 0, 0)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5%',
            }}
          >
            <StyledCard
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                padding: '3%',
                boxShadow: '0 0 20px 0 rgba(255, 255, 255, 0.5)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  padding: '5%',
                }}
              >
                <h2
                  style={{
                    fontSize: isTablet ? '12pt' : '15pt',
                    color: 'white',
                    letterSpacing: '0.1rem',
                    wordSpacing: '0.2rem',
                    margin: 0,
                    padding: '1%',
                    textAlign: 'center',
                  }}
                >
                  This project was made possible by the efforts and resources of
                  the following artists:
                </h2>
                <div>
                  <ul
                    style={{
                      padding: '1%',
                      textAlign: 'left',
                      fontSize: isTablet ? '10pt' : '12pt',
                    }}
                  >
                    <li>
                      <h3>Freepik</h3>
                      <ul
                        style={{
                          padding: '0 10%',
                          fontSize: isTablet ? '10pt' : '12pt',
                        }}
                      >
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/document"
                            title="document icons"
                          >
                            Document icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/user"
                            title="user icons"
                          >
                            User icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/bold"
                            title="bold icons"
                          >
                            Bold icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/list"
                            title="list icons"
                          >
                            List icons created by Smartline - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/italic"
                            title="italic icons"
                          >
                            Italic icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/strikethrough"
                            title="strikethrough icons"
                          >
                            Strikethrough icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/code"
                            title="code icons"
                          >
                            Code icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/clear-filter"
                            title="clear filter icons"
                          >
                            Clear filter icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/number"
                            title="number icons"
                          >
                            Number icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/trash"
                            title="trash icons"
                          >
                            Trash icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/editing"
                            title="editing icons"
                          >
                            Editing icons created by Freepik - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/info"
                            title="info icons"
                          >
                            Info icons created by Freepik - Flaticon
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3>dmitri13</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/plus"
                        title="plus icons"
                      >
                        Plus icons created by dmitri13 - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>Chanut</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/list"
                        title="list icons"
                      >
                        List icons created by Chanut - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>riajulislam</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/ui"
                        title="ui icons"
                      >
                        Ui icons created by riajulislam - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>Debi Alpa Nugraha</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/remove"
                        title="remove icons"
                      >
                        Remove icons created by Debi Alpa Nugraha - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>Balraj Chana</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/minus"
                        title="minus icons"
                      >
                        Minus icons created by Balraj Chana - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>Kharisma</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/multiple-arrows"
                        title="multiple arrows icons"
                      >
                        Multiple arrows icons created by Kharisma - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>sonnycandra</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/try"
                        title="try icons"
                      >
                        Try icons created by sonnycandra - Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>exomoon design studio</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/heading"
                        title="heading icons"
                      >
                        Heading icons created by exomoon design studio -
                        Flaticon
                      </a>
                    </li>

                    <li>
                      <h3>Pixel perfect</h3>
                      <ul>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/logout"
                            title="logout icons"
                          >
                            Logout icons created by Pixel perfect - Flaticon
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.flaticon.com/free-icons/share"
                            title="share icons"
                          >
                            Share icons created by Pixel perfect - Flaticon
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <h3>Smashicons</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/search"
                        title="search icons"
                      >
                        Search icons created by Smashicons - Flaticon
                      </a>
                    </li>
                    <li>
                      <h3>Ilham Fitrotul Hayat</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/calendar"
                        title="calendar icons"
                      >
                        Calendar icons created by Ilham Fitrotul Hayat -
                        Flaticon
                      </a>
                    </li>
                    <li>
                      <h3>Freepik</h3>
                      <a
                        href="https://www.flaticon.com/free-icons/filter"
                        title="filter icons"
                      >
                        Filter icons created by Rahul Kaklotar - Flaticon
                      </a>
                    </li>
                  </ul>
                  <h2
                    style={{
                      marginTop: '10vh',
                      fontSize: isTablet ? '12pt' : '14pt',
                    }}
                  >
                    Unsplash Images by:
                  </h2>
                  <ul
                    style={{
                      padding: '1%',
                      textAlign: 'left',
                      fontSize: isTablet ? '10pt' : '12pt',
                      lisStyle: 'none',
                    }}
                  >
                    <li>
                      <a
                        href="https://unsplash.com/@davidmonje"
                        title="David Monje"
                      >
                        David Monje
                      </a>
                    </li>
                    <br />
                    <li>
                      <a
                        href="https://unsplash.com/@sunday_digital"
                        title="Natsuh Abootalebi"
                      >
                        Natsuh Abootalebi
                      </a>
                    </li>
                    <br />
                    <li>
                      <a
                        href="https://unsplash.com/de/@alesnesetril
                      "
                        title="Ales Nesetril"
                      >
                        Ales Nesetril
                      </a>
                    </li>
                    <br />
                    <li>
                      <a href="https://unsplash.com/@alepuoc" title="Alexis">
                        Alexis
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </StyledCard>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
