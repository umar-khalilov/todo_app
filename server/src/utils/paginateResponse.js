'use strict';

module.exports.paginateResponse = ([total, result], page, limit) => {
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
        statusCode: 'success',
        data: [...result],
        count: total,
        currentPage: page,
        nextPage,
        prevPage,
        lastPage,
    };
};
