import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUpClick = () => {
    // Send a POST request to the server with the email and password
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        // If the response is successful, log the user in
        if (response.ok) {
          console.log('Sign up successful');
          return response.json();
        }
        // If the response is not successful, throw an error
        throw new Error('Sign up failed');
      })
      .then((data) => {
        console.log(data);
        // Do something with the data (e.g. save the user and token to the state)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <br />
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
};

export default LoginForm;
