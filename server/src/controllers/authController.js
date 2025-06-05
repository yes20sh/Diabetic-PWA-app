import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

// REGISTER FUNCTION
export const register = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const missingFields = [];
  if (!fullname) missingFields.push("fullname");
  if (!username) missingFields.push("username");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: "All fields are required.",
      missingFields,
    });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or username already in use",
        field: existingUser.email === email ? 'email' : 'username',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN FUNCTION
export const login = async (req, res) => {
  const { email, password } = req.body;

  const missing = [];
  if (!email) missing.push("email");
  if (!password) missing.push("password");

  if (missing.length > 0) {
    return res.status(400).json({
      message: 'Email and password are required.',
      missing,
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" }
    );

    // Set cookie with consistent options
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// AUTH CHECK FUNCTION
export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');

    const user = await User.findById(decoded.id).select('email username');

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'Authenticated',
      user: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error('Auth check failed:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// LOGOUT FUNCTION (with consistent cookie options)
export const logout = (req, res) => {
  try {
res.cookie("token", token, {
  httpOnly: true,
  secure: true,         // Required for SameSite: 'None' on HTTPS
  sameSite: 'None',     // Enables cross-site cookie sharing
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: "Logout failed" });
  }
};
