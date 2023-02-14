const { HttpStatusCodes } = require('./httpStatusCodes');

class SuccessResponse {
    constructor(data = {}, status = HttpStatusCodes.OK) {
        this.data = data;
        this.status = status;
    }
}

module.exports = { SuccessResponse };
