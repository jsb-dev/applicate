import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom';
import LoginPage from './pages/loginPage.js';

const App = () => {
  // set LoginPage as the root route
  // users should come here by default
  return <LoginPage />;
};

export default App;

/*
<BrowserRouter>
      <Route exact path="/" component={LoginPage} />
    </BrowserRouter>
*/
