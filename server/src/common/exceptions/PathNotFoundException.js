const ApplicationException = require('./ApplicationException');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

module.exports = class PathNotFoundException extends ApplicationException {
    constructor(path) {
        super(
            `The requested path: ${path} not found!`,
            HttpStatusCodes.NOT_FOUND,
        );
    }
};
