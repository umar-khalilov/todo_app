'use strict';
const { ListTags } = require('../listTags');
const { HttpStatusCodes } = require('../../../common/utils/httpStatusCodes');

const verificate = {
    get: {
        tags: [ListTags.Auth],
        summary: 'Verificate a user',
        description: 'Verification a user',
        operationId: 'verificateUser',
        parameters: [
            {
                name: 'uuid',
                in: 'path',
                schema: {
                    type: 'string',
                },
                required: true,
                description: 'String Uuid value for user to verification',
            },
        ],
        responses: {
            [HttpStatusCodes.OK]: {
                description: 'Redirect to sign in page',
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

module.exports = { verificate };
