const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class TokenExpiredException extends ApplicationException {
    constructor(expiredAt) {
        super(`jwt expired: ${expiredAt}`, HttpStatusCodes.FORBIDDEN);
    }
};
