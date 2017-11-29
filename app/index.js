// npm
const express = require('express');
const pino = require('express-pino-logger')();
const boom = require('express-boom');
const helmet = require('helmet');
const compression = require('compression');

// mine
const routes = require('./routes');

const app = express();

app.set('etag', 'strong');

app.use(compression());
app.use(helmet());
app.use(pino);
app.use(boom());
app.use('/static', express.static('assets', {}));
app.use(routes());

app.use((req, res) => res.boom.notFound());
app.use((err, req, res, next) => {
  console.log(err);
  res.boom.internal('Unhandled internal server error');
});

module.exports = app;
