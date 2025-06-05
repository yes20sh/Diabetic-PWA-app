import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token from cookies or Authorization header.
 * Attaches decoded user info to req.user if valid.
 */
const verifyToken = (req, res, next) => {
  let token = null;

  // Prefer token from cookie (for browser auth flows)
  if (req.cookies?.token) {
    token = req.cookies.token;
  }
  // Fallback to Authorization header (for API clients/mobile)
  else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Use environment secret, fallback only if absolutely necessary
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not set in environment variables.');
      return res.status(500).json({ message: 'Server configuration error.' });
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyToken;
