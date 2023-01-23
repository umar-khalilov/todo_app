const { HttpStatusCodes } = require('./httpStatusCodes');

module.exports = class SuccessResponse {
    constructor(data = {}, status = HttpStatusCodes.OK) {
        this.data = data;
        this.status = status;
    }
};
