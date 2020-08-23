/* eslint-disable linebreak-style */
const express = require('express');
const { pool } = require('./config/postgres');

const app = express();

app.set('port', 4000);

app.get('/', (req, res) => {
  pool
    .query('SELECT * FROM users')
    .then((data) => {
      console.log('user:', data.rows);
      res.send(data.rows);
    })
    .catch((err) => console.log(err));
});

app.listen(app.get('port'), () => {
  console.log('Server running on port: 4000');
});
