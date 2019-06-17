const mongoose = require('mongoose');

const { MONGO_URL } = require('./config');
const logger = require('./logger');

mongoose.Promise = global.Promise;

async function connectDB() {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true });
}

function handleConnectionFailure(err) {
  if (err) {
    logger.error('Failed to connect to MongoDB', {
      MONGO_URL,
      err,
    });

    // Since the DB was not connected, what use do we have by starting up a server.
    // After checking if any issues are present with MongoDB and fixing them, try running
    // the app again.
    process.exit(1);
  }
}

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('error', error => {
  logger.error('MongoDB connection error', { error });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB connection disconnected');
});

module.exports = {
  connectDB,
  handleConnectionFailure,
};
