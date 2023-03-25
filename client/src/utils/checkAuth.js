import env from 'react-dotenv';

async function checkAuth() {
  const { REACT_APP_API_URL } = env;

  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }
  const response = await fetch(`${REACT_APP_API_URL}auth`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  await response.json();
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export default checkAuth;
