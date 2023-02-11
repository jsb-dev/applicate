import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
import LoginPage from './pages/loginPage.jsx';
import Dashboard from './pages/dashboard.jsx';
import EditorPage from './pages/editorPage.jsx';
import AccountPage from './pages/accountPage.jsx';
import AboutPage from './pages/aboutPage.jsx';
import ContactPage from './pages/contactPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/editor" element={<EditorPage />} />
        <Route exact path="/account" element={<AccountPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
