module.exports.paginate = async (req, res, next) => {
    try {
        let {
            query: { limit = 10, offset = 0, page = 1 },
        } = req;

        req.pagination = {
            limit: !limit || limit <= 0 || limit > 100 ? 100 : limit,
            page: !page || page <= 0 ? 1 : page,
            offset:
                !offset || offset <= 0
                    ? (offset = (page - 1) * limit)
                    : (offset = (page - 1) * limit),
        };
        next();
    } catch (error) {
        next(error);
    }
};
