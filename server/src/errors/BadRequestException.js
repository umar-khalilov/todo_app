const ApplicationException = require('./ApplicationException');

class BadRequestException extends ApplicationException {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

module.exports = BadRequestException;
