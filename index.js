/* eslint-disable linebreak-style */
const http = require('http');
const express = require('express');

const app = express();

app.set('port', 4000);

app.get('/', (req, res) => {
  res.send('Hello from teamwork');
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Server running on port: 4000');
});
