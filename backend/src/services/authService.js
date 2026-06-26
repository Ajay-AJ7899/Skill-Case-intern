const bcrypt = require('bcrypt');
const { pool } = require('../config/db');
const AppError = require('../utils/appError');
const { generateToken } = require('../utils/jwt');

const register = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError('Name, email, and password are required', 400);
  }

  const existingUser = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new AppError('Email is already registered', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [name, email, passwordHash]
  );

  const user = result.rows[0];

  return {
    user,
    token: generateToken({ userId: user.id }),
  };
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError('Email and password are required', 400);
  }

  const result = await pool.query(
    'SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    throw new AppError('Invalid email or password', 401);
  }

  const user = result.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', 401);
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    token: generateToken({ userId: user.id }),
  };
};

const getCurrentUser = async (userId) => {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [userId]
  );

  if (result.rows.length === 0) {
    throw new AppError('User not found', 404);
  }

  return result.rows[0];
};

module.exports = {
  register,
  login,
  getCurrentUser,
};
