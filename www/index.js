require('dotenv').config({ silent: true });
const app = require('../app');
const logger = require('./../app/logger');

async function startup() {
    const server = await app();
    await server.start();
}

process.on('unhandledRejection', err => {
    logger.error(err);
    process.exit(1);
});

startup()
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });
