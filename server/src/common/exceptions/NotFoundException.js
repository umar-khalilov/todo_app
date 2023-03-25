const { HttpStatusCodes } = require('../utils/httpStatusCodes');
const ApplicationException = require('./ApplicationException');

module.exports = class NotFoundException extends ApplicationException {
    constructor(message = '') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
};
