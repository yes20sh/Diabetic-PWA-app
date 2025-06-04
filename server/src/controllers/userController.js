import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    console.log('Update request body:', req.body); // Debug log

    const { fullname, username, email } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found for ID:', req.user.id); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    // Username uniqueness check
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('Username already taken:', username); // Debug log
        return res.status(400).json({ message: 'Username already taken' });
      }
      user.username = username;
      console.log('Username updated to:', username); // Debug log
    }

    if (fullname) {
      user.fullname = fullname;
      console.log('Fullname updated to:', fullname); // Debug log
    }
    if (email) {
      user.email = email;
      console.log('Email updated to:', email); // Debug log
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      fullname: updatedUser.fullname,
      username: updatedUser.username,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error('Error updating user profile:', error); // Debug log
    // Handle MongoDB duplicate key error specifically
    if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    res.status(500).json({ message: 'Server error', error });
  }
};

// Change user password
export const changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Logout user (JWT stateless)
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};
