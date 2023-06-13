import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

const CheckToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') ? navigate('/') : navigate('/login');
  }, [navigate]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <CheckToken />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
