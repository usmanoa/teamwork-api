const express = require('express');
const { pool } = require('./config/postgres');

const app = express();

app.get('/', (req, res, next) => {
  pool
    .query('SELECT * FROM users')
    .then((data) => {
      res.send(data.rows);
    })
    .catch((err) => next(err));
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.statusCode = 404;
  err.error = 'Not Found';
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  res.json({
    status: 'error',
    error: err.error,
  });
});

module.exports = app;
