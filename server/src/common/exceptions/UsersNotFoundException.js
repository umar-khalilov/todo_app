const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class UsersNotFoundException extends ApplicationException {
    constructor(message = 'No found users in database!') {
        super(message, HttpStatusCodes.NOT_FOUND);
    }
};
