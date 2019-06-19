const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const io = require('socket.io')(); // add { transports: ['websockets'] } if you want to force websockets only

const { ORIGIN } = require('./utils/config');
const routes = require('./controllers');
const logger = require('./utils/logger');
const setupIO = require('./io');

const app = express();

app.use(
  cors({
    origin: ORIGIN,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.use('*', (req, res, next) => {
  logger.info(req.path, {
    body: req.body,
    params: req.params,
    method: req.method,
    cookies: req.cookies,
  });

  next();
});

app.use('/api', routes);
app.use('/api', (req, res) => {
  res.status(404).json({
    message: 'Resource not found!',
  });
});

setupIO(io);

module.exports = {
  app,
  io,
};
