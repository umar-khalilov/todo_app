const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class UserAlreadyExistException extends ApplicationException {
    constructor(email) {
        super(
            `User with this email: ${email} already exist`,
            HttpStatusCodes.CONFLICT,
        );
    }
};
