const app = require('./app');
require('dotenv').config();

app.listen(process.env.PORT);

module.exports = app;
