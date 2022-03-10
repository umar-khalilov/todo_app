'use strict';
require('dotenv').config();
const http = require('http');
const { address } = require('ip');
const app = require('./app');
const {
    env: { PORT },
} = process;

const server = http.createServer(app);

server.listen(PORT || 3001, () =>
    console.log(`Express App started on http//${address()}:${PORT}`)
);
