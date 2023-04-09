'use strict';
const { configuration } = require('../../configs');

const servers = {
    servers: [
        {
            url:
                configuration.serverUrl ||
                `http://localhost:${configuration.serverPort}/api`,
            description: 'Server',
        },
    ],
};

module.exports = { servers };
