const ApplicationException = require('./ApplicationException');

class UserNotFoundException extends ApplicationException {
    constructor(message = 'User not found') {
        super(message, 404);
    }
}

module.exports = UserNotFoundException;
