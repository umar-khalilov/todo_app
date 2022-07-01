const ApplicationException = require('./ApplicationException');

class RightsException extends ApplicationException {
    constructor(message = 'Not enough rights') {
        super(message, 403);
    }
}

module.exports = RightsException;
