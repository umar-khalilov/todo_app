'use strict';
const { ListTags } = require('../listTags');
const { tokensComponent } = require('../components/tokensComponent');
const { HttpStatusCodes } = require('../../../common/utils/httpStatusCodes');

const refreshSession = {
    post: {
        tags: [ListTags.Auth],
        summary: 'Refresh session',
        description: 'Refresh session for a user',
        operationId: 'refreshSession',
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
                description: 'A user data',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GetUserWithTokens',
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
                description: 'Not found exception',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/NotFoundException',
                        },
                    },
                },
            },
        },
    },
};

module.exports = { refreshSession };
