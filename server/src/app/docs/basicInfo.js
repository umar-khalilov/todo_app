'use strict';
const { configuration } = require('../../configs');

const basicInfo = {
    openapi: '3.0.3',
    info: {
        title: 'Todo application REST API',
        version: '1.0.0',
        description: 'Todo application for everyone!',
        contact: {
            name: 'Umar Khalilov',
            email: 'ERMASTER100@gmail.com',
            url: 'https://umar-khalilov.github.io',
        },
        basePath: '/',
        host:
            configuration.deployHost ||
            `http://localhost:${configuration.serverPort}/api`,
        schemes: ['http', 'https'],
    },
};

module.exports = { basicInfo };
