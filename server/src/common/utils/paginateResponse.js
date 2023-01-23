'use strict';

const paginateResponse = async (data = [], page, limit) => {
    const [itemCount, result] = data;
    const pageCount = Math.ceil(itemCount / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;
    return {
        data: [...result],
        meta: {
            page,
            limit,
            itemCount,
            pageCount,
            hasPreviousPage,
            hasNextPage,
        },
    };
};

module.exports = { paginateResponse };
