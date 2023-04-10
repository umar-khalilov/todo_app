'use strict';
const ApplicationException = require('./ApplicationException');
const BadRequestException = require('./BadRequestException');
const RightsException = require('./RightsException');
const TokenException = require('./TokenException');
const UnauthorizedException = require('./UnauthorizedException');
const UserAlreadyExistException = require('./UserAlreadyExistException');
const NotFoundException = require('./NotFoundException');
const TokenExpiredException = require('./TokenExpiredException');
const TokenMalformedException = require('./TokenMalformedException');
const TokenNotBeforeException = require('./TokenNotBeforeException');

module.exports = {
    ApplicationException,
    BadRequestException,
    RightsException,
    TokenException,
    TokenExpiredException,
    TokenMalformedException,
    TokenNotBeforeException,
    UnauthorizedException,
    UserAlreadyExistException,
    NotFoundException,
};
