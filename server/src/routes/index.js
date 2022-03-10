'use strict';
const router = require('express').Router({ mergeParams: true }),
    authRouter = require('./authRouter'),
    userRouter = require('./userRouter');

router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;
