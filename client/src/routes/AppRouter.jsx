import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import MedicinePage from '../pages/MedicinePage';
import FrontPage from '../pages/FrontPage';
import ProtectedRoute from '../components/auth/ProtectedRoute'

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<FrontPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />

      {/* Protected routes */}
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/medicine'
        element={
          <ProtectedRoute>
            <MedicinePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
