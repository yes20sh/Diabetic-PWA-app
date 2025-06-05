import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import DashboardPage from '../pages/DashboardPage';
import MedicinePage from '../pages/MedicinePage';
import FrontPage from '../pages/FrontPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import RecordPage from '../pages/RecordPage';
import AddMedicinePage from '../pages/AddMedicinePage';
import AddRecordPage from '../pages/AddRecordPage';
import AccountPage from '../pages/AccountPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<FrontPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />

      {/* Protected Routes */}
      <Route
        path='/dashboard'
        element={

            <DashboardPage />

        }
      />
      <Route
        path='/medicine'
        element={
 
            <MedicinePage />
  
        }
      />
      <Route
        path='/record'
        element={
    
            <RecordPage />
      
        }
      />
      <Route
        path='/addmedicine/:id?'
        element={
 
            <AddMedicinePage />
   
        }
      />
      <Route
        path='/addrecord'
        element={
  
            <AddRecordPage />
 
        }
      />
      <Route
        path='/account'
        element={
   
            <AccountPage />
    
        }
      />
    </Routes>
  );
};

export default AppRouter;
