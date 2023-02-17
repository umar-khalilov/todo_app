'use strict';
const { configuration } = require('../../configs');

const basicInfo = {
    openapi: '3.0.3',
    info: {
        version: '1.0.0',
        title: 'Todo application REST API',
        description: 'This documentation API about Todo routes',
        termsOfService: '',
        contact: {
            name: 'Umar Khalilov',
            email: 'ERMASTER100@gmail.com',
            url: '',
        },
        basePath: '/',
        host:
            configuration.deployHost ||
            `http://localhost:${configuration.serverPort}/api`,
        schemes: ['http', 'https'],
    },
};

module.exports = { basicInfo };
