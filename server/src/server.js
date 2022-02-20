require('dotenv').config();
const http = require('http');
const { address } = require('ip');
const app = require('./app');
const {
    env: { PORT },
} = process;

const server = http.createServer(app);

server.listen(PORT, () =>
    console.log(`Express App started on http//${address()}:${PORT}`)
);
