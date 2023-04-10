'use strict';

const asyncWrapper = handler => (req, res, next) =>
    Promise.resolve(handler(req, res, next))
        .then(response => res.status(response.status).send(response.data))
        .catch(err => next(err));

const paginateResponse = async (data = [], page = 1, limit = 10) => {
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

const omit = (obj, ...keys) =>
    Object.fromEntries(
        Object.entries(obj).filter(([key]) => !keys.includes(key)),
    );

const pick = (obj, ...keys) =>
    Object.fromEntries(
        keys.filter(key => key in obj).map(key => [key, obj[key]]),
    );

module.exports = {
    asyncWrapper,
    paginateResponse,
    omit,
    pick,
};
