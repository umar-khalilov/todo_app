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
                                example:
                                    'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoidG9tQGhhbmtzLmNvbSIsInJvbGVzIjpbImFkbWluIiwidXNlciJdLCJpYXQiOjE2NzkyMzUwNTUsImV4cCI6MTY3OTQwNzg1NX0.13fylSc60k1LHfsWH3ZfgfLUEBOpVobAVePi_JwOmc2OR6IusvGvKxTi_NmgPPtu',
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
