'use strict';
const { queryParamsComponent } = require('./queryParamsComponent');
const { authComponent } = require('./authComponent');
const { usersComponent } = require('./usersComponent');

const components = {
    components: {
        schemas: {
            ...queryParamsComponent,
            ...authComponent,
            ...usersComponent,
        },
    },
};

module.exports = { components };
