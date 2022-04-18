const express = require('express');
const cors = require('cors');
const compression = require('compression');
const MainRouter = require('./routes');
const { handlerError } = require('./middlewares/handlerError');

const app = express();
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', MainRouter);
app.use(handlerError);

module.exports = app;
