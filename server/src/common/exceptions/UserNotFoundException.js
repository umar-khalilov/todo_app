const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class UserNotFoundException extends ApplicationException {
    constructor(id) {
        super(`User with that id: ${id} not found`, HttpStatusCodes.NOT_FOUND);
    }
};
