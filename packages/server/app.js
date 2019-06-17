const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

// const { ORIGIN } = require('./utils/config');
const routes = require('./controllers');

const app = express();

// app.use(
//   cors({
//     ORIGIN,
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes);
app.use('/api', (req, res) => {
  res.status(404).json({
    message: 'Resource not found!',
  });
});

module.exports = app;
