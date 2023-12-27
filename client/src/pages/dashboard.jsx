import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckOrientation } from '../utils/CheckOrientation.jsx';
import { CheckDevice } from '../utils/CheckDevice.jsx';
import LoginPage from './loginPage.jsx';
import checkAuth from '../utils/checkAuth';
import DocList from '../components/dashboard/docList/docList.jsx';
import NavBar from '../components/global/navBar/navBar.jsx';
import Footer from '../components/global/footer.jsx';
import LoadingSpinner from '../components/global/loadingSpinner.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isVertical = CheckOrientation();
  const isMobile = CheckDevice();

  useEffect(() => {
    const check = async () => {
      await checkAuth().then((auth) => {
        setIsAuthenticated(auth);
        setIsLoading(false);
      });
    };
    check();
    setUserId(searchParams.get('userId'));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!searchParams.get('userId')) {
      try {
        const localStorageUserId = localStorage.getItem('userId');
        if (localStorageUserId) {
          navigate(`/dashboard?userId=${localStorageUserId}`);
        } else {
          navigate('/');
        }
      } catch {
        navigate('/');
      }
    }
    // eslint-disable-next-line
  }, [searchParams]);

  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <div>
          <NavBar />
          <div
            style={{
              marginTop: isVertical
                ? 'max(100px, 15vh)'
                : !isVertical && isMobile
                ? 100
                : '20vh',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DocList userId={userId} />
          </div>
          <Footer />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
};

export default Dashboard;
