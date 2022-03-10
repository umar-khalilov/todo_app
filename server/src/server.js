'use strict';
require('dotenv').config();
const http = require('http'),
    { address } = require('ip'),
    app = require('./app');

const {
    env: { PORT },
} = process;

const server = http.createServer(app);

server.listen(PORT || 3001, () =>
    console.log(`Express App started on http//${address()}:${PORT}`)
);
