import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token = null;

  // Check cookie or header for token
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, allow request to continue without user info
  if (!token) {
    req.user = null;
    return next(); // Continue without authentication
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded;
  } catch (error) {
    // If token is invalid, treat user as unauthenticated
    req.user = null;
  }

  next(); // Always proceed
};

export default verifyToken;
