import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import MedicinePage from '../pages/MedicinePage';
import FrontPage from '../pages/FrontPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/dashboard' element={<DashboardPage/>} />
      <Route path='/medicine' element={<MedicinePage/>} />
      <Route path='/' element={<FrontPage/>} />
    </Routes>

  )
}

export default AppRouter