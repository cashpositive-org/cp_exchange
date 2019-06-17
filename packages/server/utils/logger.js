const { createLogger, transports, format } = require('winston');

const { NODE_ENV } = require('./config');

const logger = new createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: `${__dirname}/../logs/error.log`, level: 'error' }),
    new transports.File({ filename: `${__dirname}/../logs/combined.log` }),
  ],
});

if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

module.exports = logger;
