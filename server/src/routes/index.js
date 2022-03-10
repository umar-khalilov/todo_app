'use strict';
const router = require('express').Router({ mergeParams: true }),
    authRouter = require('./authRouter');

router.use('/auth', authRouter);

module.exports = router;
