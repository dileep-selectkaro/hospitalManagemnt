const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
