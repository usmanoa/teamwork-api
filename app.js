const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Home');
});

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
