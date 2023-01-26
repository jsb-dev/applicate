async function checkAuth() {
  const token = localStorage.getItem('authToken');
  if (!token) {
    return false;
  }
  const response = await fetch('http://localhost:5000/auth', {
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
