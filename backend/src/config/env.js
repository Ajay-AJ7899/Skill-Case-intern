const dotenv = require('dotenv');

dotenv.config();

const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
});

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
