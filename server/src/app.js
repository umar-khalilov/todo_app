'use strict';
const express = require('express'),
    cors = require('cors'),
    compression = require('compression'),
    router = require('./routes'),
    { handlerError } = require('./middlewares/handlerError');

const app = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(handlerError);

module.exports = app;
