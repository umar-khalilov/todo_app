'use strict';
const express = require('express'),
    cors = require('cors'),
    router = require('./routes'),
    { handlerError } = require('./middlewares/handlerError');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(handlerError);

module.exports = app;
