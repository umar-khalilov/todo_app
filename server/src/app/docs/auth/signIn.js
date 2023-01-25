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
            [HttpStatusCodes.CREATED]: {
                description: 'A user data',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GetUserWithToken',
                        },
                    },
                },
            },
        },
    },
};

module.exports = { signIn };
