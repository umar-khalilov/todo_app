'use strict';
const { userComponent } = require('./userComponent');
const { omit } = require('../../../common/utils/helpers');

const usersComponent = {
    GetUser: {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {
                    ...omit(userComponent, 'password'),
                },
            },
        },
    },
    GetUserWithToken: {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {
                    tokens: {
                        type: 'object',
                        properties: {
                            accessToken: {
                                type: 'string',
                                example: 'tokenstring',
                                description: 'The token data',
                            },
                        },
                    },
                    ...omit(userComponent, 'password'),
                },
            },
        },
    },
};

module.exports = { usersComponent };
