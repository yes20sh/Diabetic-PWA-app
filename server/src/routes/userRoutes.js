import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  logoutUser,
} from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get logged-in user's profile
router.get('/profile', verifyToken, getUserProfile);

// Update user profile
router.put('/profile', verifyToken, updateUserProfile);

// Change password
router.post('/change-password', verifyToken, changeUserPassword);

// Logout
router.post('/logout', verifyToken, logoutUser);

export default router;
