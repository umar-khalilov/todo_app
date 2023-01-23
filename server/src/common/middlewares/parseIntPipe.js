'use strict';

const parseIntPipe =
    (...paramToInt) =>
    async (req, res, next) => {
        for await (const param of paramToInt) {
            req.params[param] = parseInt(req.params[param], 10);
        }
        next();
    };

module.exports = { parseIntPipe };
