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
    UnauthorizedException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'Wrong email or password',
            },
            status: {
                type: 'integer',
                description: 'Error status code',
                example: HttpStatusCodes.UNAUTHORIZED,
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
    PathNotFoundException: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Error message',
                example: 'The Requested path: *** not found',
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