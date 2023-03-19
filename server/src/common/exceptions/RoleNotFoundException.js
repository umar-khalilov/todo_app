const { HttpStatusCodes } = require('../utils/httpStatusCodes');
const ApplicationException = require('./ApplicationException');

module.exports = class UserNotFoundException extends ApplicationException {
    constructor(value) {
        super(
            `Role with that value: ${value} not found`,
            HttpStatusCodes.NOT_FOUND,
        );
    }
};
