const Pino = require('pino');

const pinoInstance = Pino({
    prettyPrint: process.env.NODE_ENV !== 'production'
});

module.exports = pinoInstance;
