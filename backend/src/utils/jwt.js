const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/env');

const generateToken = (payload) =>
  jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = {
  generateToken,
  verifyToken,
};
