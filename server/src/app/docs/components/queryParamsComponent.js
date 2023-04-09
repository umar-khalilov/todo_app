'use strict';
const { SortOrders } = require('../../../common/utils/sortOrders');

const queryParamsComponent = {
    sort: {
        type: 'string',
        enum: [SortOrders.ASC, SortOrders.DESC],
        default: SortOrders.ASC,
        example: SortOrders.ASC,
        required: false,
        description: 'Sort order',
    },
    page: {
        type: 'integer',
        format: 'int32',
        required: false,
        default: 1,
        minimum: 1,
        example: 1,
        description: 'A number of page',
    },
    limit: {
        type: 'integer',
        format: 'int32',
        required: false,
        default: 10,
        minimum: 1,
        maximum: 50,
        examples: {
            min: {
                value: 1,
                summary: 'A sample limit value',
            },
            max: {
                value: 50,
                summary: 'A sample limit value',
            },
        },
        description: 'The numbers of items to return',
    },
};

module.exports = { queryParamsComponent };
