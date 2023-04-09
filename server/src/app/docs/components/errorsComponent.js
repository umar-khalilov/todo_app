'use strict';
const { HttpStatusCodes } = require('../../../common/utils/httpStatusCodes');

const errorsComponent = {
    BadRequestException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'Bad request',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.BAD_REQUEST,
            },
        },
    },
    UserAlreadyExistException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'User with that email already exist',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.CONFLICT,
            },
        },
    },
    UnauthorizedException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'Wrong email or password, or User is not authorized',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.UNAUTHORIZED,
            },
        },
    },
    ValidationException: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: 'Error name',
                example: 'ValidationError',
            },
            message: {
                type: 'string',
                description: 'Some error',
                example: 'Something field to small',
            },
        },
    },
    TokenExpiredException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'jwt expired: ***',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.BAD_REQUEST,
            },
        },
    },
    TokenMalformedException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'jwt malforted',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.BAD_REQUEST,
            },
        },
    },
    TokenNotBeforeException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'jwt not active: ***',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.BAD_REQUEST,
            },
        },
    },
    PathNotFoundException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'The requested path: *** not found',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.NOT_FOUND,
            },
        },
    },
    ServerErrorException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'Server error! Please try again!',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.INTERNAL_SERVER_ERROR,
            },
        },
    },
};

module.exports = { errorsComponent };
