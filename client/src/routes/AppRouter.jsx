import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import MedicinePage from '../pages/MedicinePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/dashboard' element={<DashboardPage/>} />
      <Route path='medicine' element={<MedicinePage/>} />
    </Routes>

  )
}

export default AppRouter