import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
