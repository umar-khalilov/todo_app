'use strict';
const { HttpStatusCodes } = require('../../../common/utils/httpStatusCodes');
const { tokensComponent } = require('../components/tokensComponent');
const { ListTags } = require('../listTags');

const signOut = {
    post: {
        tags: [ListTags.Auth],
        summary: 'Sign out a user',
        description: 'Sign out a user from application',
        operationId: 'signOutUser',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            refresh: tokensComponent.refresh,
                        },
                    },
                },
            },
        },
        responses: {
            [HttpStatusCodes.OK]: {
                description: 'Info message',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                data: {
                                    type: 'string',
                                    example: 'You are successfully signed out',
                                },
                            },
                        },
                    },
                },
            },
            [HttpStatusCodes.BAD_REQUEST]: {
                description: 'Token exception',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/TokenExpiredException',
                        },
                    },
                },
            },
            [HttpStatusCodes.UNAUTHORIZED]: {
                description: 'Unauthorized exception',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UnauthorizedException',
                        },
                    },
                },
            },
            [HttpStatusCodes.NOT_FOUND]: {
                description: 'Path exception',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/PathNotFoundException',
                        },
                    },
                },
            },
        },
    },
};

module.exports = { signOut };
