module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT,
  SERVER_NAMESPACE: process.env.SERVER_NAMESPACE || 'express:server',
  ORIGIN: process.env.ORIGIN || 'http://localhost:3000',
  MONGO_URL: process.env.MONGO_URL,
};
