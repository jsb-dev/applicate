async function checkAuth() {
  console.log('Using the checkAuth function');
  try {
    console.log('Sending a GET request to the server');
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:5000/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await response.json();
    if (response.ok) {
      // If the server responds with an HTTP 200 status, return true
      return true;
    } else {
      // If the server responds with an HTTP error status, return false
      console.log('Received a bad response from the server');
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

export default checkAuth;
