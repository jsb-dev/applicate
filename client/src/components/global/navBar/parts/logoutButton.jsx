import logoutUser from '../../../../utils/logoutUser.js';
import StyledButton from '../styled/styledButton.jsx';
import useMediaQuery from '@mui/material/useMediaQuery';

function LogoutButton() {
  const isTablet = useMediaQuery('(max-width: 960px)');

  // Desktop View
  function DesktopButton() {
    function logout() {
      const token = localStorage.getItem('authToken');

      try {
        fetch('/account/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              logoutUser();
            }
          });
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <>
        <StyledButton variant="contained" onClick={logout}>
          Log out
        </StyledButton>
      </>
    );
  }

  // Mobile View
  function MobileButton() {
    function logout() {
      const token = localStorage.getItem('authToken');

      try {
        fetch('/account/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              localStorage.removeItem('authToken');
              window.location.href = '/';
            }
          });
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <>
        <StyledButton variant="contained" onClick={logout}>
          Log out
        </StyledButton>
      </>
    );
  }

  return <>{isTablet ? <MobileButton /> : <DesktopButton />}</>;
}

export default LogoutButton;
