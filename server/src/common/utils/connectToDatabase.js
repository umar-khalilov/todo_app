'use strict';
const Logger = require('./Logger');

const connectToDatabase = async db => {
    const logger = new Logger(connectToDatabase.name);
    try {
        await db.sequelize.authenticate();
        logger.log('Connection to database has been established successfully!');
    } catch (error) {
        logger.error(`Unable to connect to the database: ${error}`);
    }
};

module.exports = { connectToDatabase };
