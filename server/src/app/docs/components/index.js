'use strict';
const { queryParamsComponent } = require('./queryParamsComponent');
const { authComponent } = require('./authComponent');
const { usersComponent } = require('./usersComponent');
const { errorsComponent } = require('./errorsComponent');

const components = {
    components: {
        schemas: {
            ...authComponent,
            ...usersComponent,
            ...queryParamsComponent,
            ...errorsComponent,
        },
    },
};

module.exports = { components };
