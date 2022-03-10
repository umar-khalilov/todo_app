'use strict';
const express = require('express');
const cors = require('cors');
const router = require('./routes');
const { handlerError } = require('./middlewares/handlerError');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(handlerError);

module.exports = app;
