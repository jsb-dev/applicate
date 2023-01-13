import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles.css';
import LoginPage from './pages/loginPage.jsx';
import Dashboard from './pages/dashboard.jsx';
import EditorPage from './pages/editorPage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/editor" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
