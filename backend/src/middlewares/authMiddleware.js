const { pool } = require('../config/db');
const AppError = require('../utils/appError');
const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('Authentication token is required', 401));
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    const result = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return next(new AppError('User not found', 401));
    }

    req.user = result.rows[0];
    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};

module.exports = authMiddleware;
