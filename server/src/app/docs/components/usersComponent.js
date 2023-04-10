'use strict';
const { userComponent } = require('./userComponent');
const { tokensComponent } = require('./tokensComponent');
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
    GetUserWithTokens: {
        type: 'object',
        properties: {
            data: {
                type: 'object',
                properties: {
                    tokens: {
                        type: 'object',
                        properties: {
                            ...tokensComponent,
                        },
                    },
                    user: {
                        type: 'object',
                        properties: {
                            ...omit(userComponent, 'password'),
                        },
                    },
                },
            },
        },
    },
};

module.exports = { usersComponent };
