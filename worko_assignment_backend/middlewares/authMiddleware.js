const dotenv = require('dotenv');
dotenv.config();

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send('Access denied. No credentials sent.');

  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('ascii');
  const [username, password] = decodedCredentials.split(':');

  if (username === process.env.AUTH_USER && password === process.env.AUTH_PASS) {
    next();
  } else {
    res.status(401).send('Access denied. Invalid credentials.');
  }
}

module.exports = authMiddleware;