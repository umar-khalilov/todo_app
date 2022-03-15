'use strict';
require('dotenv').config();
const http = require('http');
const { address } = require('ip');
const app = require('./app');

const {
    env: { PORT },
} = process;

const startExpressApp = async port => {
    try {
        http.createServer(app).listen(+port || 3001, () =>
            console.info(
                '\x1b[1m',
                '\x1b[32m',
                `Express App started on http//${address()}:${port}`,
            ),
        );
    } catch (err) {
        console.error(err);
        process.exit();
    }
};

void startExpressApp(PORT);
