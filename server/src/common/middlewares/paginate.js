'use strict';
const SortOrders = require('../utils/sortOrders');

const paginate = async (req, res, next) => {
    try {
        let {
            query: { sort = SortOrders.ASC, limit = 10, page = 1 },
        } = req;

        page = Number(!page || page <= 0 ? 1 : page);
        limit = Number(!limit || limit <= 0 || limit > 50 ? 50 : limit);

        const offset = (page - 1) * limit;

        req.pagination = {
            page,
            sort,
            limit,
            offset,
        };
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { paginate };
