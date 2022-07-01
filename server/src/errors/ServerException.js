const ApplicationException = require('./ApplicationException');

class ServerException extends ApplicationException {
    constructor(message = 'Server error') {
        super(message, 500);
    }
}

module.exports = ServerException;
