import { Button } from '@mui/material';
import Styled from '@emotion/styled';

const StyledButton = Styled(Button)({
  background: 'linear-gradient(45deg, #39d0ff 30%, #00aec2 90%)',
  border: 0,
  borderRadius: 6,
  boxShadow: '2px 4px 8px 0px rgba(40, 0, 0, .6)',
  color: '#ffffff',
  fontWeight: 'bold',
  height: 48,
  padding: '0 30px',
  '&:hover': {
    background: '#00c486',
    color: '#ffffff',
    boxShadow: '2px 4px 8px 0px rgba(40, 0, 0, .6)',
  },
});

function LogoutButton() {
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

export default LogoutButton;
