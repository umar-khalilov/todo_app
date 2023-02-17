'use strict';

const metaComponent = {
    meta: {
        type: 'object',
        properties: {
            page: {
                type: 'integer',
                description: 'The page of resource',
                example: 1,
            },
            limit: {
                type: 'integer',
                description: 'The limit of resource',
                example: 10,
            },
            itemCount: {
                type: 'integer',
                description: 'The amount of items',
                example: 50,
            },
            pageCount: {
                type: 'integer',
                description: 'The amount of pages',
                example: 15,
            },
            hasPreviousPage: {
                type: 'boolean',
                description: 'Previous page',
                example: false,
            },
            hasNextPage: {
                type: 'boolean',
                description: 'Next page',
                example: true,
            },
        },
    },
};

module.exports = { metaComponent };
