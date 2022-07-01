const ApplicationException = require('./ApplicationException');

class UnauthorizedException extends ApplicationException {
    constructor(message = 'Wrong email or password') {
        super(message, 403);
    }
}

module.exports = UnauthorizedException;
