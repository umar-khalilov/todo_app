'use strict';
const { userComponent } = require('./userComponent');
const { omit, pick } = require('../../../common/utils/helpers');

const authComponent = {
    SignUpUser: {
        type: 'object',
        properties: {
            ...omit(userComponent, 'id', 'avatar', 'createdAt', 'updatedAt'),
        },
        required: ['name', 'surname', 'email', 'password'],
    },
    SignInUser: {
        type: 'object',
        properties: {
            ...pick(userComponent, 'email', 'password'),
        },
        required: ['email', 'password'],
    },
};

module.exports = { authComponent };
