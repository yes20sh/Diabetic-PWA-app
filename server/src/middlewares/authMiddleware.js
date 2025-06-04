import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token = null;

  // Try to get token from cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  // Or from Authorization header (Bearer <token>)
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');
    req.user = decoded; // { id, email, username, ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default verifyToken;
