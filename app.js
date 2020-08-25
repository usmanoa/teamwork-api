const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const route = require('./routes');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', route);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  err.error = 'Resource not found';
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  console.log(err);
  res.json({
    status: 'error',
    error: err.error,
  });
});

module.exports = app;
