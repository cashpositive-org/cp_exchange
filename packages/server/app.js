const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const { ORIGIN } = require('./utils/config');
const routes = require('./controllers');

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
app.use(compression());

app.use('/api', routes);
app.use('/api', (req, res) => {
  res.status(404).json({
    message: 'Resource not found!',
  });
});

module.exports = app;
