'use strict';
const { ListTags } = require('../listTags');
const { HttpStatusCodes } = require('../../../common/utils/httpStatusCodes');

const signUp = {
    post: {
        tags: [ListTags.Auth],
        summary: 'Sign up a user',
        description: 'Sign up a user with some data.',
        operationId: 'signUpUser',
        requestBody: {
            required: true,
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SignUpUser',
                    },
                },
            },
        },
        responses: {
            [HttpStatusCodes.CREATED]: {
                description: 'A created user data',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GetUserWithTokens',
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
            [HttpStatusCodes.CONFLICT]: {
                description: 'Conflict resource exception',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/UserAlreadyExistException',
                        },
                    },
                },
            },
        },
    },
};

module.exports = { signUp };
