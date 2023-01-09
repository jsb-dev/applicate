async function checkAuth() {
  try {
    const token = localStorage.getItem('authToken');
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
  } catch (error) {
    console.error(error);
  }
}

export default checkAuth;
