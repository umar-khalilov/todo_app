'use strict';
const { ListTags } = require('../listTags');
const { HttpStatusCodes } = require('../../../common/utils/httpStatusCodes');

const signIn = {
    post: {
        tags: [ListTags.Auth],
        summary: 'Sign in a user',
        description: 'Sign in a user with some data.',
        operationId: 'signInUser',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SignInUser',
                    },
                },
            },
        },
        responses: {
            [HttpStatusCodes.OK]: {
                description: 'A user data',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GetUserWithToken',
                        },
                    },
                },
            },
            [HttpStatusCodes.BAD_REQUEST]: {
                description: 'Validation exception',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ValidationException',
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
                description: 'The Requested path not found exception',
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

module.exports = { signIn };
