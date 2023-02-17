'use strict';
const ApplicationException = require('./ApplicationException');
const BadRequestException = require('./BadRequestException');
const IncorrectPasswordException = require('./IncorrectPasswordException');
const RightsException = require('./RightsException');
const TaskNotFoundException = require('./TaskNotFoundException');
const TasksNotFoundException = require('./TasksNotFoundException');
const TokenException = require('./TokenException');
const UnauthorizedException = require('./UnauthorizedException');
const UserAlreadyExistException = require('./UserAlreadyExistException');
const UserNotFoundException = require('./UserNotFoundException');
const UsersNotFoundException = require('./UsersNotFoundException');
const UserTasksNotFoundException = require('./UserTasksNotFoundException');
const PathNotFoundException = require('./PathNotFoundException');
const ServerException = require('./ServerException');
const TokenExpiredException = require('./TokenExpiredException');
const TokenMalformedException = require('./TokenMalformedException');

module.exports = {
    ApplicationException,
    BadRequestException,
    IncorrectPasswordException,
    RightsException,
    TaskNotFoundException,
    TasksNotFoundException,
    TokenException,
    TokenExpiredException,
    TokenMalformedException,
    UnauthorizedException,
    UserAlreadyExistException,
    UserNotFoundException,
    UsersNotFoundException,
    UserTasksNotFoundException,
    PathNotFoundException,
    ServerException,
};
