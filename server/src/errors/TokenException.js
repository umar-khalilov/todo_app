const ApplicationException = require('./ApplicationException');

class TokenException extends ApplicationException {
    constructor(message = 'Token error') {
        super(message, 419);
    }
}

module.exports = TokenException;
