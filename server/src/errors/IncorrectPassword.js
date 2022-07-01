const ApplicationException = require('./ApplicationException');

class IncorrectException extends ApplicationException {
    constructor(message = 'Incorrect password') {
        super(message, 406);
    }
}

module.exports = IncorrectException;
