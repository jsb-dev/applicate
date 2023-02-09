const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userEmail');
  window.location.href = '/';
};

export default logoutUser;
