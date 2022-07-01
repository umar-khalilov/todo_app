const ApplicationException = require('./ApplicationException');

class UserAlreadyExistException extends ApplicationException {
    constructor(message = 'User with this email already exist') {
        super(message, 406);
    }
}

module.exports = UserAlreadyExistException;
