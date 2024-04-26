const jwt = require('jsonwebtoken');

exports.authorizeToken = (req, res, next)=> {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Bearer token missing or invalid' });
    }
    const bearerToken = token.split(' ')[1]; 
    jwt.verify(bearerToken, 'rohit@1234', (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden: Invalid token' });
      }
      req.user = decoded;
      next();
    });
}