'use strict';

const parseIntPipe =
    (...paramToInt) =>
    async (req, res, next) => {
        paramToInt.forEach(async param => {
            req.params[param] = parseInt(req.params[param], 10);
        });

        next();
    };

module.exports = { parseIntPipe };
